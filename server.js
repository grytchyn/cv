const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

const distPath = path.join(__dirname, 'docs');

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
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ CV portfolio running on port ${PORT}`);
});
