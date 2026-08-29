const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeDirectory(dirPath, maxWidth = 800, quality = 80) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  let totalBefore = 0;
  let totalAfter = 0;

  console.log(`Optimizing ${files.length} images in ${dirPath}...`);

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png|webp|svg)$/i) || file.endsWith('.svg')) continue;
    const fullPath = path.join(dirPath, file);

    const statBefore = fs.statSync(fullPath);
    totalBefore += statBefore.size;

    try {
      const inputBuffer = fs.readFileSync(fullPath);
      const outputBuffer = await sharp(inputBuffer)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(fullPath, outputBuffer);
      const statAfter = fs.statSync(fullPath);
      totalAfter += statAfter.size;

      console.log(`✓ ${file}: ${(statBefore.size/1024).toFixed(0)}KB -> ${(statAfter.size/1024).toFixed(0)}KB`);
    } catch (err) {
      console.error(`✗ Error optimizing ${file}:`, err.message);
    }
  }

  console.log(`\nDone ${dirPath}: ${(totalBefore/(1024*1024)).toFixed(2)} MB -> ${(totalAfter/(1024*1024)).toFixed(2)} MB\n`);
}

async function main() {
  await optimizeDirectory(path.join(__dirname, 'public', 'images', 'events'), 800, 80);
  await optimizeDirectory(path.join(__dirname, 'public', 'images', 'places'), 800, 80);
}

main();
