import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const outDir = path.join(root, "src", "generated");
const outFile = path.join(outDir, "search-index.json");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function main() {
  if (!fs.existsSync(postsDir)) {
    console.warn("[build-search] No posts dir found:", postsDir);
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".json"));
  const docs = files.map((f) => {
    const p = readJson(path.join(postsDir, f));
    return {
      id: p.id,
      title: p.title,
      summary: p.summary,
      date: p.date,
      tags: p.tags ?? [],
    };
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify({ docs }, null, 2) + "\n", "utf8");
  console.log(`[build-search] Wrote ${docs.length} docs -> ${path.relative(root, outFile)}`);
}

main();
