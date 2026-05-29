const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 10000;

// Resolve docs directory
function findDocsDir() {
  const candidates = [
    path.join(__dirname, 'docs'),
    path.join(process.cwd(), 'docs'),
    '/opt/render/project/src/docs',
  ];
  for (const dir of candidates) {
    const indexPath = path.join(dir, 'index.html');
    if (fs.existsSync(indexPath)) {
      console.log('📁 Found docs at:', dir);
      return dir;
    }
  }
  return null;
}

const DOCS_DIR = findDocsDir();

if (!DOCS_DIR) {
  console.error('❌ CRITICAL: docs/ directory not found!');
  try {
    const cwd = process.cwd();
    console.log('cwd:', cwd);
    console.log('cwd contents:', fs.readdirSync(cwd));
  } catch (e) {
    console.error('Cannot list cwd:', e.message);
  }
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function addSecurityHeaders(headers) {
  return { ...SECURITY_HEADERS, ...headers };
}

const server = http.createServer((req, res) => {
  // Decode URI to prevent encoded traversal attacks, strip query string
  const decodedUrl = decodeURIComponent(req.url).split('?')[0];
  let filePath = path.resolve(path.join(DOCS_DIR, decodedUrl === '/' ? 'index.html' : decodedUrl));

  // Security: prevent directory traversal (must be inside DOCS_DIR)
  if (!filePath.startsWith(DOCS_DIR)) {
    res.writeHead(403, addSecurityHeaders({ 'Content-Type': 'text/plain' }));
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback: serve index.html for any unmatched route
      fs.readFile(path.join(DOCS_DIR, 'index.html'), (err2, indexData) => {
        if (err2) {
          res.writeHead(404, addSecurityHeaders({ 'Content-Type': 'text/plain' }));
          res.end('Not Found');
          return;
        }
        res.writeHead(200, addSecurityHeaders({
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }));
        res.end(indexData);
      });
      return;
    }

    // Cache control: HTML no-cache, assets cache long
    const cacheControl = ext === '.html'
      ? 'no-cache, no-store, must-revalidate'
      : 'public, max-age=31536000, immutable';

    res.writeHead(200, addSecurityHeaders({
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': cacheControl,
    }));
    res.end(data);
  });
});

// Only listen when run directly (not imported for testing)
if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ CV portfolio running on http://0.0.0.0:${PORT}`);
    console.log(`   Serving from: ${DOCS_DIR}`);
  });
}

module.exports = server;
