const fs = require('fs');
const path = require('path');

const userUploadedDir = 'C:\\Users\\adars\\.gemini\\antigravity-ide\\brain\\a3829390-e1f1-4574-b6e5-d2ceecc2c40c\\.user_uploaded';

if (fs.existsSync(userUploadedDir)) {
  const files = fs.readdirSync(userUploadedDir).map(f => {
    const p = path.join(userUploadedDir, f);
    const stat = fs.statSync(p);
    return { name: f, path: p, time: stat.mtimeMs, date: stat.mtime.toISOString(), size: stat.size };
  });
  console.log('FILES IN .user_uploaded:');
  console.log(JSON.stringify(files, null, 2));
} else {
  console.log('.user_uploaded does not exist');
}
