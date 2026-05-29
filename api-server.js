const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // 3 POST per hour per IP

// --- Rate limiter (in-memory sliding window) ---
const ipCounters = new Map();

function rateLimiter(req, res, next) {
  if (req.method !== 'POST') return next();
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const entry = ipCounters.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipCounters.set(ip, { windowStart: now, count: 1 });
    return next();
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}

// --- Validator ---
function validator(req, res, next) {
  if (req.method !== 'POST') return next();

  const errors = {};
  const { name, email, subject, message } = req.body || {};

  // name: required, 1-100, strip HTML
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'Name is required (1-100 characters)';
  } else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer';
  }

  // email: required, valid format
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Invalid email format';
  }

  // subject: optional, 1-200
  if (subject !== undefined && subject !== null && subject !== '') {
    if (typeof subject !== 'string' || subject.length > 200) {
      errors.subject = 'Subject must be 200 characters or fewer';
    }
  }

  // message: required, 1-2000
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.message = 'Message is required (1-2000 characters)';
  } else if (message.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', fields: errors });
  }

  // HTML stripping
  req.sanitized = {
    name: stripHtml(name.trim()),
    email: email.trim().toLowerCase(),
    subject: subject && subject.trim() ? stripHtml(subject.trim()) : 'Portfolio Contact',
    message: stripHtml(message.trim()),
  };
  next();
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '');
}

// --- App setup ---
const app = express();

app.use(cors({ origin: 'https://grytchyn.github.io' }));
app.use(express.json({ limit: '4kb' }));
app.use('/api/contact', validator);
app.use(rateLimiter);

// --- Routes ---

// GET /health
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    version: '1.0.0',
  });
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.sanitized;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // In-memory MVP storage (console.log as placeholder)
  console.log(`[CONTACT] id=${id} name="${name}" email="${email}" subject="${subject}" message_len=${message.length}`);

  res.status(201).json({ ok: true, message: 'Vielen Dank! Ihre Nachricht wurde gesendet.', id });
});

// GET /api/contact — admin placeholder (future)
app.get('/api/contact', (_req, res) => {
  res.status(401).json({ error: 'Unauthorized — admin access not yet implemented' });
});

// --- Error handler ---
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Start ---
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Contact API running on http://localhost:${PORT}`);
    console.log(`   POST /api/contact   GET /health`);
  });
}

module.exports = app;
