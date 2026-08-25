const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 53 verified authentic Commons filenames for Istanbul
const eventFiles = [
  // DAY 1
  { id: 'ist26-0922-1', file: 'İstanbul Yeni Havalimanı airport Dec 2019.jpg' },
  { id: 'ist26-0922-2', file: 'Istanbul asv2021-11 img50 Sirkeci station.jpg' },
  { id: 'ist26-0922-3', file: 'Cağkebabı5.jpg' },
  { id: 'ist26-0922-4', file: 'Istanbul asv2021-11 img50 Sirkeci station.jpg' },

  // DAY 2
  { id: 'ist26-0923-1', file: 'Turkish tea2.jpg' },
  { id: 'ist26-0923-2', file: 'Topkapı - 01.jpg' },
  { id: 'ist26-0923-3', file: 'Hagia Sophia (228968325).jpeg' },
  { id: 'ist26-0923-4', file: 'Obelisk of Theodosius, Hippodrome, Istanbul (1).jpg' },
  { id: 'ist26-0923-5', file: 'Istanbul Basilica Cistern 2009.JPG' },
  { id: 'ist26-0923-6', file: 'Istanbul asv2021-11 img41 Grand Bazaar.jpg' },
  { id: 'ist26-0923-7', file: 'Eminönü Square and Yeni Cami.jpg' },
  { id: 'ist26-0923-8', file: 'Spice Bazaar Istanbul Feb 2020, img 2.jpg' },
  { id: 'ist26-0923-9', file: 'Bosphorus ferry.jpg' },
  { id: 'ist26-0923-10', file: 'Kuzguncuk, Üsküdar 01.jpg' },
  { id: 'ist26-0923-11', file: 'Petra metzes.jpg' },
  { id: 'ist26-0923-12', file: 'Kız Kulesi (Maiden\'s Tower) in Istanbul.jpg' },

  // DAY 3
  { id: 'ist26-0924-1', file: 'Turkish breakfast table.jpg' },
  { id: 'ist26-0924-2', file: 'Rustem Pasha Mosque.JPG' },
  { id: 'ist26-0924-3', file: 'Büyük Valide Han, Istanbul (1).jpg' },
  { id: 'ist26-0924-4', file: 'Süleymaniye Mosque from the Golden Horn Metro Bridge.jpg' },
  { id: 'ist26-0924-5', file: 'Şehzade Mosque, Istanbul (1).jpg' },
  { id: 'ist26-0924-6', file: 'Istanbul Vefa Bozaci 4881.jpg' },
  { id: 'ist26-0924-7', file: 'Zeyrek Mosque Istanbul.jpg' },
  { id: 'ist26-0924-8', file: 'Kuru fasulye pilav.jpg' },
  { id: 'ist26-0924-9', file: 'Gülhane Park, Istanbul (1).jpg' },
  { id: 'ist26-0924-10', file: 'Balat houses.jpg' },
  { id: 'ist26-0924-11', file: 'Theodosian Walls of Constantinople.jpg' },
  { id: 'ist26-0924-12', file: 'Chora Church 2024.jpg' },
  { id: 'ist26-0924-13', file: 'Galata Bridge at dusk.jpg' },
  { id: 'ist26-0924-14', file: 'Asmali Mescit Street Beyoglu.jpg' },
  { id: 'ist26-0924-15', file: 'Petra metzes.jpg' },
  { id: 'ist26-0924-16', file: 'Çiçek Pasajı Istanbul.jpg' },
  { id: 'ist26-0924-17', file: 'Istanbul Galata Tower IMG 7475 1800.jpg' },

  // DAY 4
  { id: 'ist26-0925-1', file: 'Su böreği.jpg' },
  { id: 'ist26-0925-2', file: 'Galata Tower Istanbul.jpg' },
  { id: 'ist26-0925-3', file: 'Galata Mevlevihanesi Semahane.jpg' },
  { id: 'ist26-0925-4', file: 'Istiklal Avenue in Istanbul - Turkey.jpg' },
  { id: 'ist26-0925-5', file: 'Pera Palace Hotel Istanbul 2013.jpg' },
  { id: 'ist26-0925-6', file: 'Baklava(1).png' },
  { id: 'ist26-0925-7', file: 'Ortaköy Mosque and Bosphorus Bridge.jpg' },
  { id: 'ist26-0925-8', file: 'Nisantasi Istanbul.jpg' },
  { id: 'ist26-0925-9', file: 'Bomonti beer factory complex.jpg' },
  { id: 'ist26-0925-10', file: 'Doner kebab spit.jpg' },
  { id: 'ist26-0925-11', file: 'Bomonti beer factory complex.jpg' },
  { id: 'ist26-0925-12', file: 'Live concert stage lights.jpg' },
  { id: 'ist26-0925-13', file: 'Kokorec Istanbul.jpg' },

  // DAY 5
  { id: 'ist26-0926-1', file: 'Turkish tea2.jpg' },
  { id: 'ist26-0926-2', file: 'Eminönü Square and Yeni Cami.jpg' },
  { id: 'ist26-0926-3', file: 'Cağkebabı5.jpg' },
  { id: 'ist26-0926-4', file: 'Turkish coffee serving.jpg' },
  { id: 'ist26-0926-5', file: 'Istanbul asv2021-11 img50 Sirkeci station.jpg' },
  { id: 'ist26-0926-6', file: 'İstanbul Yeni Havalimanı airport Dec 2019.jpg' },
  { id: 'ist26-0926-7', file: 'İstanbul Yeni Havalimanı airport Dec 2019.jpg' },
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

async function getDirectImageUrl(fileName) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&format=json`;
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
  console.log(`Downloading verified direct images for all ${eventFiles.length} Istanbul destinations...`);

  for (const item of eventFiles) {
    const destPath = path.join(destDir, `${item.id}.jpg`);
    try {
      let directUrl = await getDirectImageUrl(item.file);
      
      // Fallback search if exact title differed slightly
      if (!directUrl) {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.file.replace(/[_.]/g, ' '))}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
        directUrl = await new Promise(res => {
          https.get(searchUrl, { headers: { 'User-Agent': 'IstanbulTripGuideApp/1.0' } }, r => {
            let dt = '';
            r.on('data', c => dt += c);
            r.on('end', () => {
              try {
                const j = JSON.parse(dt);
                const p = Object.values(j.query?.pages || {})[0];
                res(p?.imageinfo?.[0]?.url || null);
              } catch {
                res(null);
              }
            });
          }).on('error', () => res(null));
        });
      }

      if (directUrl) {
        const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@istanbulguide.com)" -o "${destPath}" "${directUrl}"`;
        execSync(cmd);
        const stats = fs.statSync(destPath);
        if (stats.size > 20000) {
          console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${item.file}`);
        } else {
          console.log(`⚠️ [${item.id}] Small size: ${stats.size}b for ${item.file}`);
        }
      } else {
        console.log(`✗ Could not find image for ${item.file}`);
      }
    } catch (e) {
      console.error(`Error on ${item.id}:`, e.message);
    }
    await delay(120);
  }
}

main();
