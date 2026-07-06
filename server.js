/* ============================================================
   AURUM — Zero-dependency static file server (Node.js)
   Run:  node server.js
   Then open: http://localhost:8000
   ============================================================ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  // Parse URL, prevent path traversal
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, urlPath);

  // Serve directory → index.html
  if (urlPath === '/' || urlPath.endsWith('/')) {
    filePath = path.join(ROOT, 'index.html');
  } else if (!path.extname(filePath)) {
    // Bare path like /products → try .html
    const candidate = filePath + '.html';
    if (fs.existsSync(candidate)) filePath = candidate;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 — Not Found</h1><p><a href="/">Home</a></p>');
      console.log('404', urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('=================================================');
  console.log('  AURUM server running');
  console.log('  Open in browser: http://localhost:' + PORT);
  console.log('  Press Ctrl+C to stop');
  console.log('=================================================');
});
