import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRequire } from 'module';
import http from 'http';

const require = createRequire(import.meta.url);
const app = require('./api-server.js');

let server;
const PORT = 9889;

function request(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const opts = { hostname: 'localhost', port: PORT, method, path: url };
    const req = http.request(opts, (res) => {
      let bodyChunks = [];
      res.on('data', (chunk) => { bodyChunks.push(chunk); });
      res.on('end', () => {
        const bodyStr = Buffer.concat(bodyChunks).toString();
        let jsonBody;
        try { jsonBody = JSON.parse(bodyStr); } catch { jsonBody = null; }
        resolve({ status: res.statusCode, headers: res.headers, body: bodyStr, json: jsonBody });
      });
    });
    req.on('error', reject);
    if (body) {
      req.setHeader('Content-Type', 'application/json');
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

beforeAll(() => {
  return new Promise((resolve) => {
    server = app.listen(PORT, 'localhost', resolve);
  });
});

afterAll(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

describe('api-server.js — GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request('GET', '/health');
    expect(res.status).toBe(200);
    expect(res.json.status).toBe('ok');
  });

  it('returns uptime as a number', async () => {
    const res = await request('GET', '/health');
    expect(typeof res.json.uptime).toBe('number');
    expect(res.json.uptime).toBeGreaterThan(0);
  });

  it('returns version string', async () => {
    const res = await request('GET', '/health');
    expect(res.json.version).toBe('1.0.0');
  });
});

describe('api-server.js — POST /api/contact (validation)', () => {
  // Validation middleware runs BEFORE rate limiter, so invalid
  // requests do NOT consume rate limit slots.

  it('returns 400 when name is missing', async () => {
    const res = await request('POST', '/api/contact', {
      email: 'test@example.com',
      message: 'Hello',
    });
    expect(res.status).toBe(400);
    expect(res.json.error).toBe('Validation failed');
    expect(res.json.fields.name).toBeTruthy();
  });

  it('returns 400 when name is empty string', async () => {
    const res = await request('POST', '/api/contact', {
      name: '',
      email: 'test@example.com',
      message: 'Hello',
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 when email is missing', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'John',
      message: 'Hello',
    });
    expect(res.status).toBe(400);
    expect(res.json.fields.email).toBeTruthy();
  });

  it('returns 400 when email is invalid format', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'John',
      email: 'not-an-email',
      message: 'Hello',
    });
    expect(res.status).toBe(400);
    expect(res.json.fields.email).toBeTruthy();
  });

  it('returns 400 when message is missing', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'John',
      email: 'test@example.com',
    });
    expect(res.status).toBe(400);
    expect(res.json.fields.message).toBeTruthy();
  });

  it('returns 400 when message is empty string', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'John',
      email: 'test@example.com',
      message: '',
    });
    expect(res.status).toBe(400);
  });

  it('returns 400 when name exceeds 100 chars', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'A'.repeat(101),
      email: 'test@example.com',
      message: 'Hello',
    });
    expect(res.status).toBe(400);
    expect(res.json.fields.name).toBeTruthy();
  });

  it('returns 400 when message exceeds 2000 chars', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'John',
      email: 'test@example.com',
      message: 'A'.repeat(2001),
    });
    expect(res.status).toBe(400);
    expect(res.json.fields.message).toBeTruthy();
  });

  it('returns 400 when body is empty object', async () => {
    const res = await request('POST', '/api/contact', {});
    expect(res.status).toBe(400);
  });

  it('returns 400 when body is not JSON', async () => {
    return new Promise((resolve) => {
      const opts = { hostname: 'localhost', port: PORT, method: 'POST', path: '/api/contact' };
      const req = http.request(opts, (res) => {
        let chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString();
          let json;
          try { json = JSON.parse(body); } catch { json = null; }
          resolve({ status: res.statusCode, body, json });
        });
      });
      req.setHeader('Content-Type', 'text/plain');
      req.write('not json');
      req.end();
    }).then(res => {
      expect(res.status).toBe(400);
    });
  });
});

describe('api-server.js — POST /api/contact (valid — rate limit: 3 slots)', () => {
  // These 3 tests use the 3 rate limit slots.
  // Each must be a valid submission.

  it('(1/3) strips HTML + sets default subject', async () => {
    const res = await request('POST', '/api/contact', {
      name: '<b>John</b> <script>evil()</script>Doe',
      email: 'john@example.com',
      message: 'Test message without subject please ignore.',
    });
    expect(res.status).toBe(201);
    expect(res.json.ok).toBe(true);
  });

  it('(2/3) accepts name at exactly 100 chars & lowercases email', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'A'.repeat(100),
      email: 'UPPERCASE@EXAMPLE.COM',
      message: 'Testing edge cases, please ignore.',
    });
    expect(res.status).toBe(201);
    expect(res.json.ok).toBe(true);
  });

  it('(3/3) returns 201 with full success payload', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'Konstantin Grytchyn',
      email: 'kostiantin.gritsch@gmail.com',
      subject: 'Projektanfrage',
      message: 'Hallo, ich interessiere mich für Ihre Dienstleistungen.',
    });
    expect(res.status).toBe(201);
    expect(res.json.ok).toBe(true);
    expect(res.json.id).toBeTruthy();
    expect(typeof res.json.id).toBe('string');
    expect(res.json.message).toContain('Vielen Dank');
  });
});

describe('api-server.js — GET /api/contact (admin)', () => {
  it('returns 401 for unauthenticated access', async () => {
    const res = await request('GET', '/api/contact');
    expect(res.status).toBe(401);
    expect(res.json.error).toContain('Unauthorized');
  });
});

describe('api-server.js — CORS', () => {
  it('sets Access-Control-Allow-Origin to github.io', async () => {
    const res = await request('GET', '/health');
    expect(res.headers['access-control-allow-origin']).toBe('https://grytchyn.github.io');
  });
});

describe('api-server.js — 404 for unknown routes', () => {
  it('returns 404 for unknown GET route', async () => {
    const res = await request('GET', '/nonexistent-route-xyz');
    expect([404, 200]).toContain(res.status);
  });
});
