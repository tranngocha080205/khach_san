import fs from "fs";
import path from "path";

const srcDir = path.resolve("./src"); // build toàn bộ src
const distDir = path.resolve("./dist");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildFiles(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    ensureDir(dest);
    fs.readdirSync(src).forEach((file) => {
      buildFiles(path.join(src, file), path.join(dest, file));
    });
  } else if (stats.isFile()) {
    ensureDir(path.dirname(dest));
    let content = fs.readFileSync(src);

    if (path.extname(src) === ".html") {
      content = content
        .toString()
        .replace(/<!--\s*@include\s+(.+?)\s*-->/g, (match, includePath) => {
          const includeFile = path.resolve(path.dirname(src), includePath);
          if (fs.existsSync(includeFile)) {
            return fs.readFileSync(includeFile, "utf-8");
          } else {
            console.warn("Include file not found:", includeFile);
            return "";
          }
        });
    }

    fs.writeFileSync(dest, content);
    console.log("Built:", dest);
  }
}

ensureDir(distDir);
buildFiles(srcDir, distDir);
console.log("✅ Build all files completed!");
