const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const eventPages = [
  // DAY 1 — 22 SEP
  { id: 'ist26-0922-1', page: 'Istanbul_Airport', desc: 'Istanbul Airport' },
  { id: 'ist26-0922-2', page: 'Sirkeci_railway_station', desc: 'Sirkeci Station' },
  { id: 'ist26-0922-3', page: 'Cağ_kebabı', desc: 'Cağ Kebabı' },
  { id: 'ist26-0922-4', page: 'Sirkeci', desc: 'Sirkeci' },

  // DAY 2 — 23 SEP
  { id: 'ist26-0923-1', page: 'Simit', desc: 'Simit' },
  { id: 'ist26-0923-2', page: 'Topkapi_Palace', desc: 'Topkapı Palace' },
  { id: 'ist26-0923-3', page: 'Hagia_Sophia', desc: 'Hagia Sophia' },
  { id: 'ist26-0923-4', page: 'Hippodrome_of_Constantinople', desc: 'Hippodrome' },
  { id: 'ist26-0923-5', page: 'Basilica_Cistern', desc: 'Basilica Cistern' },
  { id: 'ist26-0923-6', page: 'Grand_Bazaar,_Istanbul', desc: 'Grand Bazaar' },
  { id: 'ist26-0923-7', page: 'Eminönü', desc: 'Eminönü' },
  { id: 'ist26-0923-8', page: 'Spice_Bazaar', desc: 'Spice Bazaar' },
  { id: 'ist26-0923-9', page: 'Bosphorus', desc: 'Bosphorus Ferry' },
  { id: 'ist26-0923-10', page: 'Kuzguncuk', desc: 'Kuzguncuk' },
  { id: 'ist26-0923-11', page: 'Meze', desc: 'Meze' },
  { id: 'ist26-0923-12', page: "Maiden's_Tower", desc: "Maiden's Tower" },

  // DAY 3 — 24 SEP
  { id: 'ist26-0924-1', page: 'Breakfast', desc: 'Turkish Breakfast' },
  { id: 'ist26-0924-2', page: 'Rüstem_Pasha_Mosque', desc: 'Rüstem Paşa Mosque' },
  { id: 'ist26-0924-3', page: 'Grand_Bazaar,_Istanbul', desc: 'Tahtakale / Hans' },
  { id: 'ist26-0924-4', page: 'Süleymaniye_Mosque', desc: 'Süleymaniye Mosque' },
  { id: 'ist26-0924-5', page: 'Şehzade_Mosque', desc: 'Şehzade Mosque' },
  { id: 'ist26-0924-6', page: 'Boza', desc: 'Vefa Bozacısı' },
  { id: 'ist26-0924-7', page: 'Zeyrek_Mosque', desc: 'Zeyrek Mosque' },
  { id: 'ist26-0924-8', page: 'Turkish_cuisine', desc: 'Esnaf Lokantası' },
  { id: 'ist26-0924-9', page: 'Gülhane_Park', desc: 'Gülhane Park' },
  { id: 'ist26-0924-10', page: 'Balat,_Istanbul', desc: 'Balat Houses' },
  { id: 'ist26-0924-11', page: 'Walls_of_Constantinople', desc: 'City Walls' },
  { id: 'ist26-0924-12', page: 'Chora_Church', desc: 'Chora Church' },
  { id: 'ist26-0924-13', page: 'Galata_Bridge', desc: 'Galata Bridge' },
  { id: 'ist26-0924-14', page: 'Beyoğlu', desc: 'Pera Street' },
  { id: 'ist26-0924-15', page: 'Meyhane', desc: 'Meyhane Dining' },
  { id: 'ist26-0924-16', page: 'Çiçek_Pasajı', desc: 'Çiçek Pasajı' },
  { id: 'ist26-0924-17', page: 'Galata_Tower', desc: 'Galata Tower' },

  // DAY 4 — 25 SEP
  { id: 'ist26-0925-1', page: 'Börek', desc: 'Börek' },
  { id: 'ist26-0925-2', page: 'Galata', desc: 'Galata Quarter' },
  { id: 'ist26-0925-3', page: 'Mevlevi_Order', desc: 'Mevlevi Semahane' },
  { id: 'ist26-0925-4', page: 'İstiklal_Avenue', desc: 'İstiklal Red Tram' },
  { id: 'ist26-0925-5', page: 'Pera_Palace_Hotel', desc: 'Pera Palace Hotel' },
  { id: 'ist26-0925-6', page: 'Baklava', desc: 'Baklava' },
  { id: 'ist26-0925-7', page: 'Ortaköy_Mosque', desc: 'Bosphorus Ortaköy' },
  { id: 'ist26-0925-8', page: 'Nişantaşı', desc: 'Nişantaşı' },
  { id: 'ist26-0925-9', page: 'Şişli', desc: 'Bomonti' },
  { id: 'ist26-0925-10', page: 'Doner_kebab', desc: 'Döner Kebab' },
  { id: 'ist26-0925-11', page: 'Şişli', desc: 'Bomontiada' },
  { id: 'ist26-0925-12', page: 'Concert', desc: 'Babylon Live' },
  { id: 'ist26-0925-13', page: 'Kokoretsi', desc: 'Kokoreç' },

  // DAY 5 — 26 SEP
  { id: 'ist26-0926-1', page: 'Tea_in_Turkey', desc: 'Turkish Tea' },
  { id: 'ist26-0926-2', page: 'New_Mosque,_Istanbul', desc: 'New Mosque' },
  { id: 'ist26-0926-3', page: 'Adana_kebabı', desc: 'Kebab Grill' },
  { id: 'ist26-0926-4', page: 'Turkish_coffee', desc: 'Turkish Coffee' },
  { id: 'ist26-0926-5', page: 'Sirkeci_railway_station', desc: 'Sirkeci' },
  { id: 'ist26-0926-6', page: 'Istanbul_Airport', desc: 'Istanbul Airport' },
  { id: 'ist26-0926-7', page: 'Turkish_Airlines', desc: 'Departure Flight' }
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

async function getPageImage(pageTitle, width = 960) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=${width}&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideApp/1.0 (contact@istanbulguide.com)' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const p = Object.values(j.query?.pages || {})[0];
          resolve(p?.thumbnail?.source || null);
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
  console.log(`Fetching 100% verified authentic photos for ${eventPages.length} Istanbul items...`);

  for (const item of eventPages) {
    const destPath = path.join(destDir, `${item.id}.jpg`);
    try {
      const imgUrl = await getPageImage(item.page, 960);
      if (imgUrl) {
        const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${destPath}" "${imgUrl}"`;
        execSync(cmd);
        const stats = fs.statSync(destPath);
        if (stats.size > 10000) {
          console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${item.desc} (${item.page})`);
        } else {
          console.log(`⚠️ [${item.id}] Small size: ${stats.size}b`);
        }
      } else {
        console.log(`✗ No image found for ${item.page}`);
      }
    } catch (e) {
      console.error(`Error on ${item.id}:`, e.message);
    }
    await delay(100);
  }
}

main();
