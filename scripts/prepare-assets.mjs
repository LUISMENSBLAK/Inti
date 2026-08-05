import { readdir } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? walk(path) : path;
      }),
    )
  ).flat();
}

const files = (await walk(new URL("../public", import.meta.url).pathname)).filter(
  (file) => /\.(jpe?g)$/i.test(file),
);

for (const file of files) {
  const { dir, name } = parse(file);
  await sharp(file)
    .resize({ width: 1512, height: 1512, fit: "inside", withoutEnlargement: true })
    .avif({ quality: 68, effort: 6 })
    .toFile(join(dir, `${name}.avif`));
}

console.log(`Optimized ${files.length} images.`);
