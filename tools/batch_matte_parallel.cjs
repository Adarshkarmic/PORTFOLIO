const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'temp_raw_frames_png';
const outputDir = path.join('public', 'hero_gaze_frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process 100 frames: orig 21 to orig 120
const START_ORIG = 21;
const END_ORIG = 120;
const TOTAL_FRAMES = END_ORIG - START_ORIG + 1; // 100

async function processSingleFrame(origNum, targetNum) {
  const inName = `frame_${String(origNum).padStart(4, '0')}.png`;
  const inPath = path.join(inputDir, inName);
  const outName = `frame_${String(targetNum).padStart(3, '0')}.webp`;
  const outPath = path.join(outputDir, outName);

  if (!fs.existsSync(inPath)) {
    console.error(`Missing input file: ${inPath}`);
    return;
  }

  // Keep full 1920x1080 native resolution for maximum sharpness
  const { data, info } = await sharp(inPath)
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const { width, height, channels } = info;

  // Blue chroma criteria: Cleanly flood fills all studio backdrop down to hairline
  // while preserving 100% of hair, forehead, eyes, face, and clothes
  const isHardBg = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const diff = b - Math.max(r, g);
    return (diff > 10 && b > 80) || (diff > 5 && b > 120);
  };

  // Boundary BFS flood fill strictly from outer canvas borders
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0, qTail = 0;

  for (let x = 0; x < width; x++) {
    const idxTop = x * channels;
    if (isHardBg(idxTop)) { visited[x] = 1; queue[qTail++] = x; }
    const pBot = (height - 1) * width + x;
    const idxBot = pBot * channels;
    if (isHardBg(idxBot)) { visited[pBot] = 1; queue[qTail++] = pBot; }
  }
  for (let y = 0; y < height; y++) {
    const pLeft = y * width;
    const idxLeft = pLeft * channels;
    if (isHardBg(idxLeft)) { visited[pLeft] = 1; queue[qTail++] = pLeft; }
    const pRight = y * width + (width - 1);
    const idxRight = pRight * channels;
    if (isHardBg(idxRight)) { visited[pRight] = 1; queue[qTail++] = pRight; }
  }

  while (qHead < qTail) {
    const p = queue[qHead++];
    const px = p % width;
    const py = (p / width) | 0;

    const n1 = px > 0 ? p - 1 : -1;
    const n2 = px < width - 1 ? p + 1 : -1;
    const n3 = py > 0 ? p - width : -1;
    const n4 = py < height - 1 ? p + width : -1;

    for (const np of [n1, n2, n3, n4]) {
      if (np >= 0 && visited[np] === 0) {
        visited[np] = 1;
        if (isHardBg(np * channels)) {
          queue[qTail++] = np;
        }
      }
    }
  }

  // Raw binary alpha mask from exterior flood fill
  const rawAlpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    rawAlpha[i] = visited[i] ? 0 : 255;
  }

  // 1.5px Gaussian anti-aliasing blur on alpha mask:
  // Converts hard jagged pixel steps into silky-smooth continuous sub-pixel gradients
  const smoothAlphaBuf = await sharp(rawAlpha, {
    raw: { width, height, channels: 1 }
  })
  .blur(1.5)
  .extractChannel(0)
  .raw()
  .toBuffer();

  // Assemble RGBA with blue despill
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const idx = p * channels;
      let r = data[idx], g = data[idx + 1], b = data[idx + 2];
      let a = smoothAlphaBuf[p];

      // On boundary / transition pixels, neutralize any blue spill
      if (a < 252) {
        const maxRG = Math.max(r, g);
        if (b > maxRG) {
          b = maxRG;
        }
      }

      rgba[p * 4] = r;
      rgba[p * 4 + 1] = g;
      rgba[p * 4 + 2] = b;
      rgba[p * 4 + 3] = a;
    }
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 95, alphaQuality: 100, effort: 4 })
    .toFile(outPath);
}

async function main() {
  console.log(`Starting 1920x1080 studio anti-aliased batch matte for 100 frames...`);
  const startTime = Date.now();

  const taskList = [];
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    taskList.push({
      origNum: START_ORIG + i,
      targetNum: i + 1
    });
  }

  const concurrency = 8;
  let taskIndex = 0;

  async function worker() {
    while (taskIndex < taskList.length) {
      const task = taskList[taskIndex++];
      await processSingleFrame(task.origNum, task.targetNum);
      if (task.targetNum % 10 === 0 || task.targetNum === TOTAL_FRAMES) {
        console.log(`Processed ${task.targetNum}/${TOTAL_FRAMES} frames (${task.targetNum}%)`);
      }
    }
  }

  const workers = Array(concurrency).fill(0).map(() => worker());
  await Promise.all(workers);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`All 100 full-HD anti-aliased frames saved to public/hero_gaze_frames/ in ${duration}s!`);
}

main().catch(err => {
  console.error('Fatal error during batch matte:', err);
  process.exit(1);
});
