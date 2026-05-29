import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRequire } from 'module';
import http from 'http';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const server = require('./server.js');

const PORT = 9876;

function request(method, url) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: 'localhost', port: PORT, method, path: url };
    const req = http.request(opts, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

beforeAll(() => {
  return new Promise((resolve) => {
    server.listen(PORT, 'localhost', resolve);
  });
});

afterAll(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

describe('server.js — static file serving', () => {
  it('serves index.html at / with 200 + html content type', async () => {
    const res = await request('GET', '/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.body).toContain('<!doctype html>');
  });

  it('serves index.html at /nonexistent-route (SPA fallback)', async () => {
    const res = await request('GET', '/some-random-page-that-does-not-exist');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.body).toContain('<!doctype html>');
  });
});

describe('server.js — security headers', () => {
  const requiredHeaders = [
    'strict-transport-security',
    'x-content-type-options',
    'x-frame-options',
    'referrer-policy',
    'permissions-policy',
  ];

  it('all responses have security headers present', async () => {
    const res = await request('GET', '/');
    for (const h of requiredHeaders) {
      expect(res.headers[h], `Missing security header: ${h}`).toBeTruthy();
    }
  });

  it('X-Frame-Options is DENY', async () => {
    const res = await request('GET', '/');
    expect(res.headers['x-frame-options']).toBe('DENY');
  });

  it('X-Content-Type-Options is nosniff', async () => {
    const res = await request('GET', '/');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });
});

describe('server.js — directory traversal protection', () => {
  it('blocks path traversal attempts with 403', async () => {
    const res = await request('GET', '/../../../etc/passwd');
    expect(res.status).toBe(403);
  });

  it('blocks encoded traversal attempts with 403', async () => {
    const res = await request('GET', '/..%2f..%2f..%2fetc%2fpasswd');
    expect(res.status).toBe(403);
  });
});

describe('server.js — static assets', () => {
  it('serves static .css with correct MIME type', async () => {
    const docsAssets = path.join(import.meta.dirname, 'docs', 'assets');
    if (!fs.existsSync(docsAssets)) return;
    const cssFile = fs.readdirSync(docsAssets).find(f => f.endsWith('.css'));
    if (!cssFile) return;
    const res = await request('GET', `/assets/${cssFile}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/css');
  });

  it('serves favicon.svg', async () => {
    const faviconPath = path.join(import.meta.dirname, 'docs', 'favicon.svg');
    if (!fs.existsSync(faviconPath)) return;
    const res = await request('GET', '/favicon.svg');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/svg+xml');
  });
});

describe('server.js — error handling', () => {
  it('returns 200 (SPA fallback) rather than 500 for unknown routes', async () => {
    const res = await request('GET', '/nonexistent');
    expect(res.status).not.toBe(500);
    expect(res.status).toBe(200);
  });
});
