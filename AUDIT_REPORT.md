# Security & Code Quality Audit — portfolio-cv

**Date:** 2026-05-28  
**Scope:** Full stack audit (src/, server.js, configs, dependencies)

---

## 1. Hardcoded Secrets ✅ NOT FOUND

- No API keys, tokens, passwords, SSH keys, or private keys.
- Contact email (`konstantin.gritsch@gmail.com`) and phone are public portfolio data, not secrets.
- `.gitignore` is adequate (excludes node_modules, dist, logs, editor files, `*.local`).

---

## 2. XSS Vectors ✅ NONE DETECTED

- `dangerouslySetInnerHTML` — **not used anywhere**.
- `innerHTML` / `document.write` — **not used**.
- All `href` values are static (`mailto:`, `https://github.com/...`).
- No `javascript:` URI schemes, no `onclick`/`onload`/`onerror` handlers.
- All external links (`target="_blank"`) include `rel="noopener noreferrer"`.
- React JSX auto-escapes string interpolation.

---

## 3. Inline Styles Instead of Classes ⚠️ 5 occurrences

| File | Line | Style | Recommendation |
|------|------|-------|---------------|
| `About.tsx` | 7 | `opacity: 0` | Move to CSS class `.sr-hidden` |
| `Skills.tsx` | 18 | `opacity: 0` | Move to CSS class |
| `Skills.tsx` | 32 | `cursor: default` | Replace with Tailwind `cursor-default` |
| `Project.tsx` | 7 | `opacity: 0` | Move to CSS class |
| `Contact.tsx` | 28 | `borderColor` static | Move to CSS class |

Dynamic inline styles in `Timeline.tsx` (lines 61, 65-68) and `Languages.tsx` (lines 49, 56-61) depend on props (`item.gold`, `lang.gold`) — these are acceptable.

---

## 4. Security Headers ❌ MISSING in server.js

| Header | Status | Risk |
|--------|--------|------|
| `Content-Security-Policy` | ❌ | XSS, data injection |
| `Strict-Transport-Security` | ❌ | MITM downgrade attack |
| `X-Frame-Options` | ❌ | Clickjacking |
| `X-Content-Type-Options: nosniff` | ❌ | MIME sniffing |
| `Referrer-Policy` | ❌ | Referrer leakage |

**Present:** `Cache-Control` (correctly configured), `Content-Type` (correctly set).

---

## 5. Dependency Vulnerabilities ✅ CLEAN

`npm audit --json` result:
```
vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 }
```

All key dependencies are recent versions with no known CVEs:
- React 19.2.6, Vite 8.0.12, tailwindcss 4.3.0
- Express **not used** (vanilla Node `http` module — one less attack surface)

---

## 6. Path Traversal in server.js ⚠️ PARTIALLY PROTECTED

**Current protection:** `!filePath.startsWith(DOCS_DIR)` — standard approach.

**Test results:**

| Attack vector | Result |
|--------------|--------|
| `/../../../etc/passwd` | ❌ **BLOCKED** — path resolves outside DOCS_DIR |
| `//..//..//..//etc/passwd` | ❌ **BLOCKED** |
| `/..%2f..%2f..%2fetc/passwd` | ✅ **SAFE** — `path.join` keeps encoded chars literal |
| `/foo/../../../../etc/passwd` | ❌ **BLOCKED** |

**Finding:** `req.url` from Node's `http.createServer` is **NOT URL-decoded** automatically. `path.join` treats `%2e%2e%2f` as literal filename, not traversal. This is safe for the pure-http case.

**However**, if deployed behind a reverse proxy that pre-decodes the URL (e.g., Nginx `proxy_pass` with `$uri`), an encoded traversal could bypass the check.

**Recommendation:** Add `decodeURIComponent(req.url)` and `path.resolve()` before the startsWith check for defense-in-depth.

---

## 7. Readability Score 📊 8/10 — GOOD

| Metric | Assessment |
|--------|-----------|
| Component size | All < 60 lines, well-separated |
| Naming | Consistent: PascalCase components, camelCase hooks, kebab-case CSS |
| Comments | Minimal but sufficient |
| TypeScript | Strong — all props typed (interfaces `TimelineItem`, `Lang`, `AnimationType`) |
| File structure | `components/` + `hooks/` separation — good |
| Improvement | Timeline: Education/Career JSX is nearly identical — could deduplicate |

---

## 8. Event Handlers ✅ SAFE

- No raw DOM event handlers (`onclick`, `onload`, etc.)
- All interactions through standard React/HTML attributes
- No user input processed as code anywhere
- `IntersectionObserver` properly disconnected via `unobserve()` + `disconnect()`

---

## 9. render.yaml ⚠️ MINOR

| Check | Status |
|-------|--------|
| Health check path (`/`) | ✅ Correct |
| Cache-Control (HTML vs assets) | ✅ Correctly differentiated |
| CSP / HSTS / X-Frame-Options | ❌ Not set |
| Build command | ✅ `npm install && npm run build` |
| Start command | ✅ `node server.js` |
| Port binding | ✅ `0.0.0.0:${PORT}` |

---

## 10. base path in vite.config.ts ✅ SAFE

```ts
base: process.env.RENDER ? '/' : '/cv/',
```

- Environment variable `RENDER` is set by Render.com platform — not user-controllable
- No injection vector: value is hardcoded string, not concatenated with user input
- `outDir: 'docs'` — correct for GitHub Pages deployment

---

## FINAL SCORE: 85/100 🟢

| Severity | Count | Details |
|----------|-------|---------|
| 🔴 Critical | 0 | — |
| 🟠 High | 0 | — |
| 🟡 Medium | 1 | Missing security headers (CSP, HSTS) |
| 🔵 Low | 4 | Inline styles, minor path traversal hardening |
| ✅ Pass | 6 | Secrets, XSS, CVEs, event handlers, base path, render config |

### Recommended Action Items

1. **CRITICAL** — Add security headers in `server.js`:
   - `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`

2. **MEDIUM** — Harden path traversal check in `server.js`:
   ```js
   let filePath = path.resolve(path.join(DOCS_DIR, decodeURIComponent(req.url === '/' ? 'index.html' : req.url)));
   if (!filePath.startsWith(DOCS_DIR)) { ... }
   ```

3. **LOW** — Move `opacity: 0` into a CSS class `.sr-hidden` (reused in 3 components)

4. **LOW** — Replace `style={{ cursor: 'default' }}` with Tailwind utility `cursor-default`
