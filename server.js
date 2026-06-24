const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3301;
const HTML_FILE = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  // HEAD request — used by the status page's own ping check
  if (req.method === "HEAD") {
    res.writeHead(200);
    res.end();
    return;
  }

  fs.readFile(HTML_FILE, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`[status-server] Running on http://0.0.0.0:${PORT}`);
});
