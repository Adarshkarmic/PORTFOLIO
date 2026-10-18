import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_DIR = 'public/hero_sequence_raw';
const OUT_DIR = 'public/hero_sequence';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function processFrame(filename) {
  const inputPath = path.join(RAW_DIR, filename);
  const baseName = path.parse(filename).name;
  const outputPath = path.join(OUT_DIR, `${baseName}.webp`);

  if (fs.existsSync(outputPath)) {
    return;
  }

  try {
    const fileBytes = fs.readFileSync(inputPath);
    const inputBlob = new Blob([fileBytes], { type: 'image/jpeg' });
    const blob = await removeBackground(inputBlob);
    const pngBuffer = Buffer.from(await blob.arrayBuffer());

    await sharp(pngBuffer)
      .webp({ quality: 86, alphaQuality: 100, effort: 4 })
      .toFile(outputPath);

    const stat = fs.statSync(outputPath);
    console.log(`✅ [${baseName}] Clean cutout: ${(stat.size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`❌ Error on ${filename}:`, err.message);
  }
}

async function main() {
  const files = fs.readdirSync(RAW_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  console.log(`🚀 Starting full sequence processing for ${files.length} frames...`);
  const start = Date.now();
  let done = 0;

  // Process sequentially to be safe with memory & CPU on Windows
  for (const file of files) {
    const baseName = path.parse(file).name;
    const outputPath = path.join(OUT_DIR, `${baseName}.webp`);
    if (fs.existsSync(outputPath)) {
      done++;
      continue;
    }
    await processFrame(file);
    done++;
    if (done % 5 === 0 || done === files.length) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(0);
      console.log(`📊 Progress: ${done}/${files.length} (${(done / files.length * 100).toFixed(0)}%) - ${elapsed}s elapsed`);
    }
  }

  console.log(`🎉 All ${files.length} frames completed in ${((Date.now() - start) / 1000).toFixed(1)}s!`);
}

main();
