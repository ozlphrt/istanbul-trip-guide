const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  { file: 'hagia-sophia.jpg', wiki: 'Hagia_Sophia' },
  { file: 'topkapi.jpg', wiki: 'Topkapi_Palace' },
  { file: 'basilica-cistern.jpg', wiki: 'Basilica_Cistern' },
  { file: 'galata-tower.jpg', wiki: 'Galata_Tower' },
  { file: 'suleymaniye.jpg', wiki: 'S%C3%BCleymaniye_Mosque' },
  { file: 'grand-bazaar.jpg', wiki: 'Grand_Bazaar,_Istanbul' },
  { file: 'spice-bazaar.jpg', wiki: 'Spice_Bazaar' },
  { file: 'bosphorus-ferry.jpg', wiki: '%C5%9Eehir_Hatlari' },
  { file: 'balat.jpg', wiki: 'Balat,_Istanbul' },
  { file: 'istiklal-tram.jpg', wiki: '%C4%B0stiklal_Avenue' },
  { file: 'city-walls.jpg', wiki: 'Walls_of_Constantinople' },
  { file: 'chora.jpg', wiki: 'Chora_Church' },
  { file: 'baklava.jpg', wiki: 'Baklava' },
  { file: 'kebab.jpg', wiki: 'Ca%C4%9F_kebab%C4%B1' },
  { file: 'tea.jpg', wiki: 'Turkish_tea' },
  { file: 'meze.jpg', wiki: 'Meze' },
  { file: 'pera-palace.jpg', wiki: 'Pera_Palace_Hotel' },
  { file: 'rustem-pasha.jpg', wiki: 'R%C3%BCstem_Pasha_Mosque' },
  { file: 'kuzguncuk.jpg', wiki: 'Kuzguncuk' },
  { file: 'airport.jpg', wiki: 'Istanbul_Airport' }
];

const destDir = path.join(__dirname, 'public', 'images', 'places');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuide/1.0 (education project)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuide/1.0 (education project)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const t of targets) {
    try {
      console.log(`Fetching info for ${t.wiki}...`);
      const info = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${t.wiki}`);
      const imgUrl = info.originalimage?.source || info.thumbnail?.source;
      if (imgUrl) {
        console.log(`Downloading ${t.file} from ${imgUrl}...`);
        await downloadFile(imgUrl, path.join(destDir, t.file));
        console.log(`✓ Saved ${t.file}`);
      } else {
        console.log(`✗ No image found for ${t.wiki}`);
      }
    } catch (e) {
      console.error(`Error with ${t.wiki}:`, e.message);
    }
  }
}

main();
