import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_DIR = 'temp_raw_frames_png';
const OUT_DIR = 'public/hero_gaze_frames';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const START_ORIG = 21;
const END_ORIG = 120;
const TOTAL_FRAMES = END_ORIG - START_ORIG + 1; // 100

async function processSingleFrame(origNum, targetNum) {
  const inName = `frame_${String(origNum).padStart(4, '0')}.png`;
  const inPath = path.join(RAW_DIR, inName);
  const outName = `frame_${String(targetNum).padStart(3, '0')}.webp`;
  const outPath = path.join(OUT_DIR, outName);

  if (!fs.existsSync(inPath)) {
    console.error(`Missing input file: ${inPath}`);
    return;
  }

  try {
    const fileBytes = fs.readFileSync(inPath);
    const inputBlob = new Blob([fileBytes], { type: 'image/png' });
    const blob = await removeBackground(inputBlob);
    const pngBuffer = Buffer.from(await blob.arrayBuffer());

    // Save with 95% studio WebP quality and 100% alpha precision
    await sharp(pngBuffer)
      .webp({ quality: 95, alphaQuality: 100, effort: 4 })
      .toFile(outPath);
  } catch (err) {
    console.error(`Error on frame ${targetNum}:`, err.message);
  }
}

async function main() {
  console.log(`🚀 Starting Neural Studio Matting for all ${TOTAL_FRAMES} frames...`);
  const startTime = Date.now();

  const tasks = [];
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    tasks.push({
      origNum: START_ORIG + i,
      targetNum: i + 1
    });
  }

  const concurrency = 4;
  let currentIndex = 0;

  async function worker(workerId) {
    while (currentIndex < tasks.length) {
      const task = tasks[currentIndex++];
      await processSingleFrame(task.origNum, task.targetNum);
      if (task.targetNum % 10 === 0 || task.targetNum === TOTAL_FRAMES) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        console.log(`[Worker ${workerId}] Finished ${task.targetNum}/${TOTAL_FRAMES} frames (${task.targetNum}%) - ${elapsed}s elapsed`);
      }
    }
  }

  const workers = Array(concurrency).fill(0).map((_, idx) => worker(idx + 1));
  await Promise.all(workers);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`🎉 All ${TOTAL_FRAMES} frames processed with AI Neural matting in ${duration}s!`);
}

main();
