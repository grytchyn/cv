const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

// Try multiple possible paths for docs/
const possiblePaths = [
  path.join(__dirname, 'docs'),
  path.join(process.cwd(), 'docs'),
  '/opt/render/project/src/docs',
];

let distPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
    distPath = p;
    break;
  }
}

console.log('__dirname:', __dirname);
console.log('cwd:', process.cwd());
console.log('possiblePaths checked:', possiblePaths);
console.log('distPath resolved:', distPath);

if (!distPath) {
  console.error('CRITICAL: Could not find docs/ with index.html');
  // Emergency: list what's in the working directory
  try {
    const entries = fs.readdirSync(process.cwd());
    console.log('cwd contents:', entries);
  } catch(e) {
    console.error('Cannot list cwd:', e.message);
  }
  
  // Try to find index.html anywhere
  try {
    const findCmd = require('child_process').execSync('find /opt -name "index.html" 2>/dev/null | head -10').toString();
    console.log('Found index.html files:', findCmd);
  } catch(e) {}
  
  process.exit(1);
}

console.log('Serving from:', distPath);

// Static files
app.use(express.static(distPath, {
  maxAge: '1y',
  immutable: true,
  setHeaders: function(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// SPA fallback
app.use(function(req, res) {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', function() {
  console.log('CV portfolio running on port ' + PORT);
  console.log('Ready: http://0.0.0.0:' + PORT);
});
