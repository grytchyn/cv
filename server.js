const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

// Ensure docs/ exists
const distPath = path.join(__dirname, 'docs');
if (!fs.existsSync(distPath)) {
  console.error('❌ distPath does not exist:', distPath);
  process.exit(1);
}

console.log('✅ Serving from:', distPath);
console.log('  index.html:', fs.existsSync(path.join(distPath, 'index.html')));

// Serve static files - assets cache long, HTML never
app.use(express.static(distPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// SPA fallback - all routes serve index.html
// Express v5: use app.use() instead of app.get('*')
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).type('text').send('Not Found: index.html not in distPath');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ CV portfolio running on port ${PORT}`);
  console.log(`  URL: http://localhost:${PORT}`);
});
