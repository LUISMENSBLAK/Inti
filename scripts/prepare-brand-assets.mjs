import sharp from "sharp";

const assets = [
  ["public/brand/logo-primary.jpg", "solee-konn-monogram"],
  ["public/brand/symbol-secondary.jpg", "solee-konn-signature"],
];

const colors = {
  terracotta: [178, 78, 52],
  ivory: [244, 237, 226],
  ink: [22, 18, 17],
};

async function isolateMark(input, output, rgb, size = 1200) {
  const { data, info } = await sharp(input)
    .resize(size, size, { fit: "contain" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let source = 0, target = 0; source < data.length; source += 3, target += 4) {
    const signal = Math.max(data[source], data[source + 1], data[source + 2]);
    const alpha = Math.max(0, Math.min(255, Math.round((signal - 12) * 3.5)));
    rgba[target] = rgb[0];
    rgba[target + 1] = rgb[1];
    rgba[target + 2] = rgb[2];
    rgba[target + 3] = alpha;
  }

  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(output);
}

for (const [input, name] of assets) {
  for (const [variant, rgb] of Object.entries(colors)) {
    await isolateMark(input, `public/brand/${name}-${variant}.png`, rgb);
  }
}

await isolateMark("public/brand/logo-primary.jpg", "public/favicon.png", colors.terracotta, 256);
await isolateMark("public/brand/logo-primary.jpg", "public/apple-touch-icon.png", colors.terracotta, 512);
