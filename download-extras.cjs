const https = require('https');
const fs = require('fs');
const path = require('path');

const custom = [
  { file: 'galata-tower.jpg', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80' },
  { file: 'bosphorus-ferry.jpg', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80' },
  { file: 'hamdi.jpg', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80' },
  { file: 'concert.jpg', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80' },
  { file: 'doner.jpg', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80' },
  { file: 'hippodrome.jpg', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80' }
];

const destDir = path.join(__dirname, 'public', 'images', 'places');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const c of custom) {
    console.log('Downloading', c.file);
    await download(c.url, path.join(destDir, c.file));
    console.log('✓', c.file);
  }
}
run();
