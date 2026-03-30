import { spawn } from "child_process";
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";

const port = 4173;
const distFolder = "dist";

// MIME types for common file extensions
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".webp": "image/webp",
  ".map": "application/json",
};

const server = createServer((req, res) => {
  let url = req.url || "/";

  // Remove query string if present
  url = url.split("?")[0];

  // Check if the requested file exists
  let filePath = join(distFolder, url === "/" ? "index.html" : url);

  // If file doesn't exist or is a directory, serve index.html for SPA routing
  if (
    !existsSync(filePath) ||
    (existsSync(filePath) && require("fs").statSync(filePath).isDirectory())
  ) {
    filePath = join(distFolder, "index.html");
  }

  // If index.html doesn't exist, try the default Vite preview location
  if (!existsSync(filePath)) {
    filePath = join("dist", "index.html");
  }

  // Read and serve the file
  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    // If all else fails, try to serve index.html directly
    try {
      const indexPath = join(distFolder, "index.html");
      const content = readFileSync(indexPath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    } catch (e) {
      res.writeHead(404);
      res.end("Not found");
    }
  }
});

server.listen(port, () => {
  console.log(`\n  ➜  SPA Preview Server: http://localhost:${port}`);
  console.log(
    `  ➜  All routes will be served from index.html for SPA routing\n`,
  );
});
