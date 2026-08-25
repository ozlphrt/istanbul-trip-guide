const https = require('https');
const fs = require('fs');
const path = require('path');

const fixes = [
  { id: 'ist26-0924-10', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80' },
  { id: 'ist26-0924-12', url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80' }
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          resolve(stats.size);
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const f of fixes) {
    const dest = path.join(destDir, `${f.id}.jpg`);
    const size = await download(f.url, dest);
    console.log(`✓ [${f.id}] (${(size / 1024).toFixed(1)} KB)`);
  }
}
run();
