const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'events');
const files = fs.readdirSync(dir);

const smallFiles = [];
for (const f of files) {
  const full = path.join(dir, f);
  const stats = fs.statSync(full);
  if (stats.size < 10000) {
    smallFiles.push({ file: f, size: stats.size });
  }
}

console.log('Total files in public/images/events:', files.length);
console.log('Small/Unverified files:', smallFiles.length);
console.log(smallFiles);
