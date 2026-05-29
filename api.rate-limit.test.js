import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRequire } from 'module';
import http from 'http';

const require = createRequire(import.meta.url);
const app = require('./api-server.js');

let server;
const PORT = 9888;

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

describe('api-server.js — rate limiting (fresh server)', () => {
  it('allows exactly 3 POST requests from same IP', async () => {
    for (let i = 0; i < 3; i++) {
      const res = await request('POST', '/api/contact', {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Rate limit test, please ignore.',
      });
      expect(res.status, `Request ${i + 1} should be 201`).toBe(201);
    }
  });

  it('blocks 4th POST request with 429', async () => {
    const res = await request('POST', '/api/contact', {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This should be rate limited.',
    });
    expect(res.status).toBe(429);
    expect(res.json.error).toBe('Too many requests');
  });

  it('does NOT rate-limit GET requests', async () => {
    const res = await request('GET', '/health');
    expect(res.status).toBe(200);
  });
});
