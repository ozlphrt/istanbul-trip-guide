const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const final9 = [
  { id: 'ist26-0923-1', query: 'Turkish tea Istanbul glass' },
  { id: 'ist26-0923-11', query: 'Meze Istanbul restaurant table' },
  { id: 'ist26-0924-4', query: 'Süleymaniye Mosque Istanbul courtyard' },
  { id: 'ist26-0924-5', query: 'Şehzade Mosque Istanbul courtyard' },
  { id: 'ist26-0924-6', query: 'Boza Istanbul drink' },
  { id: 'ist26-0925-11', query: 'Bomonti Istanbul beer factory' },
  { id: 'ist26-0925-12', query: 'Concert stage Istanbul lights' },
  { id: 'ist26-0926-2', query: 'Eminönü square Istanbul' },
  { id: 'ist26-0926-5', query: 'Sirkeci station Istanbul facade' },
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

async function searchCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideBot/1.0 (contact@istanbulguide.com)' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query?.pages || {})[0];
          resolve(p?.imageinfo?.[0]?.url || null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  for (const item of final9) {
    const destPath = path.join(destDir, `${item.id}.jpg`);
    const directUrl = await searchCommons(item.query);
    if (directUrl) {
      const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@istanbulguide.com)" -o "${destPath}" "${directUrl}"`;
      try {
        execSync(cmd);
        const stats = fs.statSync(destPath);
        console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — "${item.query}"`);
      } catch (e) {
        console.error(`Error on ${item.id}:`, e.message);
      }
    } else {
      console.log(`✗ No search result for "${item.query}"`);
    }
    await delay(150);
  }
}

main();
