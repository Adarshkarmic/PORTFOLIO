const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processFrameToTransparent(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  // Alpha array initialized to 255 (opaque)
  const alpha = new Uint8Array(width * height);
  alpha.fill(255);

  // Background detection: brightness > 220 and low saturation (neutral studio white)
  const isBgColor = (idx) => {
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r > 218 && g > 218 && b > 218 && Math.abs(r - g) < 22 && Math.abs(r - b) < 22 && Math.abs(g - b) < 22;
  };

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0, qTail = 0;

  // Seed borders (Top, Bottom, Left, Right)
  for (let x = 0; x < width; x++) {
    const idxTop = (0 * width + x) * channels;
    if (isBgColor(idxTop)) { visited[x] = 1; queue[qTail++] = x; }
    const pBot = (height - 1) * width + x;
    const idxBot = pBot * channels;
    if (isBgColor(idxBot)) { visited[pBot] = 1; queue[qTail++] = pBot; }
  }
  for (let y = 0; y < height; y++) {
    const pLeft = y * width;
    const idxLeft = pLeft * channels;
    if (isBgColor(idxLeft)) { visited[pLeft] = 1; queue[qTail++] = pLeft; }
    const pRight = y * width + (width - 1);
    const idxRight = pRight * channels;
    if (isBgColor(idxRight)) { visited[pRight] = 1; queue[qTail++] = pRight; }
  }

  // BFS Flood Fill from exterior borders only
  while (qHead < qTail) {
    const p = queue[qHead++];
    alpha[p] = 0; // Outer background
    const px = p % width;
    const py = (p / width) | 0;

    const n1 = px > 0 ? p - 1 : -1;
    const n2 = px < width - 1 ? p + 1 : -1;
    const n3 = py > 0 ? p - width : -1;
    const n4 = py < height - 1 ? p + width : -1;

    const neighbors = [n1, n2, n3, n4];
    for (let i = 0; i < 4; i++) {
      const np = neighbors[i];
      if (np >= 0 && visited[np] === 0) {
        visited[np] = 1;
        const nIdx = np * channels;
        if (isBgColor(nIdx)) {
          queue[qTail++] = np;
        }
      }
    }
  }

  // Soft Edge Feathering (Anti-Aliasing):
  // Find border boundary pixels where alpha transitions from 0 to 255
  // Calculate soft alpha based on color brightness of boundary pixels
  const softAlpha = new Uint8Array(alpha);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x;
      if (alpha[p] === 255) {
        // Check if adjacent to background
        if (alpha[p - 1] === 0 || alpha[p + 1] === 0 || alpha[p - width] === 0 || alpha[p + width] === 0) {
          const idx = p * channels;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const brightness = (r + g + b) / 3;
          // Smoothly ramp alpha near white edge
          if (brightness > 200) {
            softAlpha[p] = Math.max(0, Math.min(255, Math.round((255 - brightness) * 4.5)));
          }
        }
      }
    }
  }

  // Build 4-channel RGBA Buffer
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * channels];
    rgba[i * 4 + 1] = data[i * channels + 1];
    rgba[i * 4 + 2] = data[i * channels + 2];
    rgba[i * 4 + 3] = softAlpha[i];
  }

  // Optional: Trim excess empty canvas around the bust portrait to maximize quality and minimize file size
  // Character bounding box in 1920x1080 is roughly centered horizontally and covers y from ~20 to 1080
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .webp({ quality: 92, alphaQuality: 100, effort: 4 })
    .toFile(outputPath);
}

module.exports = { processFrameToTransparent };

if (require.main === module) {
  (async () => {
    console.log('Processing 5 test directions...');
    const keys = ['front', 'left', 'up', 'right', 'down'];
    for (const k of keys) {
      const inPath = path.join('temp_gaze_test', `${k}.jpg`);
      const outPath = path.join('temp_gaze_test', `${k}_trans.webp`);
      await processFrameToTransparent(inPath, outPath);
      console.log(`Saved ${k}_trans.webp`);
    }
    console.log('All 5 test frames done!');
  })();
}
