import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🚀 Starting AI background removal on public/hero_original.jpg...');
  const startTime = Date.now();
  
  const fileBytes = fs.readFileSync('public/hero_original.jpg');
  const inputBlob = new Blob([fileBytes], { type: 'image/jpeg' });
  const outputPath = path.resolve('public/hero_clean.png');

  try {
    const blob = await removeBackground(inputBlob, {
      progress: (key, current, total) => {
        if (total) {
          console.log(`[${key}] ${(current / total * 100).toFixed(0)}%`);
        } else {
          console.log(`[${key}] ${current}`);
        }
      }
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Success! Saved clean cutout to ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB) in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  } catch (err) {
    console.error('❌ Background removal failed:', err);
  }
}

main();
