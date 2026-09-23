import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = './public';
const quality = 85; // 85% quality — bhot accha balance hai size vs quality ka

const files = readdirSync(publicDir);

console.log('\n🚀 WebP Conversion Start...\n');

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const inputPath = join(publicDir, file);
  const outputName = basename(file, ext) + '.webp';
  const outputPath = join(publicDir, outputName);

  const inputSize = statSync(inputPath).size;

  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    const outputSize = statSync(outputPath).size;
    const saved = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

    console.log(`✅ ${file}`);
    console.log(`   ${(inputSize / 1024 / 1024).toFixed(2)} MB → ${(outputSize / 1024 / 1024).toFixed(2)} MB  (${saved}% saved)\n`);
  } catch (err) {
    console.error(`❌ Error converting ${file}:`, err.message);
  }
}

console.log('✅ Done! Ab Next.js code mein .webp extensions use karo.');
