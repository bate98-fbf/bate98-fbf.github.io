const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3001;
const mime = { html:'text/html', css:'text/css', js:'application/javascript', json:'application/json', png:'image/png', jpg:'image/jpeg', ico:'image/x-icon' };
http.createServer((req, res) => {
  const file = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).slice(1)] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log(`http://localhost:${port}`));
