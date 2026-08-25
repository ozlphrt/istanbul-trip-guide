const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const missingEvents = [
  { id: 'ist26-0922-4', query: 'Sirkeci station Istanbul night' },
  { id: 'ist26-0923-7', query: 'Eminönü square New Mosque Istanbul' },
  { id: 'ist26-0924-1', query: 'Turkish breakfast spread Istanbul' },
  { id: 'ist26-0924-7', query: 'Zeyrek Mosque Pantokrator Monastery Istanbul' },
  { id: 'ist26-0924-8', query: 'Kuru fasulye pilav Turkish cuisine' },
  { id: 'ist26-0924-9', query: 'Gülhane Park Istanbul gate' },
  { id: 'ist26-0924-10', query: 'Balat Fatih colorful houses Istanbul' },
  { id: 'ist26-0924-13', query: 'Galata Bridge Istanbul fishing dusk' },
  { id: 'ist26-0924-14', query: 'Asmalı Mescit Beyoğlu street Istanbul' },
  { id: 'ist26-0924-16', query: 'Cicek Pasaji Istanbul Flower Passage' },
  { id: 'ist26-0925-1', query: 'Su boregi Turkish pastry' },
  { id: 'ist26-0925-2', query: 'Galata street Istanbul tower' },
  { id: 'ist26-0925-3', query: 'Galata Mevlevihanesi semahane Istanbul' },
  { id: 'ist26-0925-5', query: 'Pera Palace Hotel Istanbul facade' },
  { id: 'ist26-0925-7', query: 'Ortakoy Mosque Bosphorus Bridge Istanbul' },
  { id: 'ist26-0925-8', query: 'Nisantasi Abdi Ipekci Istanbul' },
  { id: 'ist26-0925-9', query: 'Bomonti beer factory Istanbul' },
  { id: 'ist26-0925-10', query: 'Doner kebab spit Istanbul' },
  { id: 'ist26-0925-11', query: 'Bomontiada courtyard Istanbul' },
  { id: 'ist26-0925-12', query: 'Babylon Bomontiada concert Istanbul' },
  { id: 'ist26-0925-13', query: 'Kokorec Istanbul street food' },
  { id: 'ist26-0926-2', query: 'Eminönü pier Istanbul seagulls' },
  { id: 'ist26-0926-4', query: 'Turkish coffee cup Istanbul' },
  { id: 'ist26-0926-5', query: 'Sirkeci hotel Istanbul boutique' },
  { id: 'ist26-0926-6', query: 'Istanbul Airport terminal departure' },
  { id: 'ist26-0926-7', query: 'Turkish Airlines aircraft Istanbul' }
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
  for (const item of missingEvents) {
    const destPath = path.join(destDir, `${item.id}.jpg`);
    const directUrl = await searchCommons(item.query);
    if (directUrl) {
      const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@istanbulguide.com)" -o "${destPath}" "${directUrl}"`;
      try {
        execSync(cmd);
        const stats = fs.statSync(destPath);
        console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB for "${item.query}"`);
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
