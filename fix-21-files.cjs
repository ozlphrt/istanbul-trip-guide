const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const missing = [
  { id: 'ist26-0922-1', query: 'Istanbul Airport terminal building' },
  { id: 'ist26-0922-2', query: 'Sirkeci railway station Istanbul' },
  { id: 'ist26-0923-1', query: 'Simit seller Istanbul tea' },
  { id: 'ist26-0923-10', query: 'Kuzguncuk street wooden houses' },
  { id: 'ist26-0923-11', query: 'Meze raki dining table Turkey' },
  { id: 'ist26-0923-12', query: 'Maidens Tower Istanbul Bosphorus' },
  { id: 'ist26-0923-2', query: 'Topkapi Palace gate of salutation' },
  { id: 'ist26-0923-4', query: 'Obelisk of Theodosius Istanbul' },
  { id: 'ist26-0923-5', query: 'Basilica Cistern Istanbul columns' },
  { id: 'ist26-0923-6', query: 'Grand Bazaar Istanbul interior' },
  { id: 'ist26-0923-8', query: 'Spice Bazaar Istanbul interior' },
  { id: 'ist26-0923-9', query: 'Bosphorus ferry Istanbul passenger' },
  { id: 'ist26-0924-13', query: 'Galata Bridge Istanbul' },
  { id: 'ist26-0924-3', query: 'Buyuk Valide Han Istanbul' },
  { id: 'ist26-0924-4', query: 'Suleymaniye Mosque Istanbul view' },
  { id: 'ist26-0924-5', query: 'Sehzade Mosque Istanbul' },
  { id: 'ist26-0924-6', query: 'Vefa Bozacisi Istanbul' },
  { id: 'ist26-0925-11', query: 'Bomonti brewery Istanbul' },
  { id: 'ist26-0925-12', query: 'Live music concert stage Istanbul' },
  { id: 'ist26-0926-2', query: 'Eminonu square Istanbul New Mosque' },
  { id: 'ist26-0926-5', query: 'Sirkeci station Istanbul facade' },
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

async function searchCommons(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideApp/1.0 (contact@istanbulguide.com)' } }, (res) => {
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
  for (const item of missing) {
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
