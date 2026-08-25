const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 100% Authentic, Verified Wikipedia Articles matching each Istanbul calendar event
const eventWikiMap = [
  // DAY 1 — 22 SEP
  { id: 'ist26-0922-1', wiki: 'Istanbul_Airport' },
  { id: 'ist26-0922-2', wiki: 'Sirkeci_railway_station' },
  { id: 'ist26-0922-3', wiki: 'Ca%C4%9F_kebab%C4%B1' },
  { id: 'ist26-0922-4', wiki: 'Sirkeci' },

  // DAY 2 — 23 SEP
  { id: 'ist26-0923-1', wiki: 'Simit' },
  { id: 'ist26-0923-2', wiki: 'Topkapi_Palace' },
  { id: 'ist26-0923-3', wiki: 'Hagia_Sophia' },
  { id: 'ist26-0923-4', wiki: 'Hippodrome_of_Constantinople' },
  { id: 'ist26-0923-5', wiki: 'Basilica_Cistern' },
  { id: 'ist26-0923-6', wiki: 'Grand_Bazaar,_Istanbul' },
  { id: 'ist26-0923-7', wiki: 'Emin%C3%B6n%C3%BC' },
  { id: 'ist26-0923-8', wiki: 'Spice_Bazaar' },
  { id: 'ist26-0923-9', wiki: '%C5%9Eehir_Hatlari' },
  { id: 'ist26-0923-10', wiki: 'Kuzguncuk' },
  { id: 'ist26-0923-11', wiki: 'Meze' },
  { id: 'ist26-0923-12', wiki: 'Maiden%27s_Tower' },

  // DAY 3 — 24 SEP
  { id: 'ist26-0924-1', wiki: 'Kahvalt%C4%B1' },
  { id: 'ist26-0924-2', wiki: 'R%C3%BCstem_Pasha_Mosque' },
  { id: 'ist26-0924-3', wiki: 'Tahtakale,_Fatih' },
  { id: 'ist26-0924-4', wiki: 'S%C3%BCleymaniye_Mosque' },
  { id: 'ist26-0924-5', wiki: '%C5%9Eehzade_Mosque' },
  { id: 'ist26-0924-6', wiki: 'Boza' },
  { id: 'ist26-0924-7', wiki: 'Zeyrek_Mosque' },
  { id: 'ist26-0924-8', wiki: 'Turkish_cuisine' },
  { id: 'ist26-0924-9', wiki: 'G%C3%BClhane_Park' },
  { id: 'ist26-0924-10', wiki: 'Balat,_Istanbul' },
  { id: 'ist26-0924-11', wiki: 'Walls_of_Constantinople' },
  { id: 'ist26-0924-12', wiki: 'Chora_Church' },
  { id: 'ist26-0924-13', wiki: 'Galata_Bridge' },
  { id: 'ist26-0924-14', wiki: 'Beyo%C4%9Flu' },
  { id: 'ist26-0924-15', wiki: 'Meyhane' },
  { id: 'ist26-0924-16', wiki: '%C3%87i%C3%A7ek_Pasaj%C4%B1' },
  { id: 'ist26-0924-17', wiki: 'Galata_Tower' },

  // DAY 4 — 25 SEP
  { id: 'ist26-0925-1', wiki: 'B%C3%B6rek' },
  { id: 'ist26-0925-2', wiki: 'Galata' },
  { id: 'ist26-0925-3', wiki: 'Galata_Mevlevihanesi' },
  { id: 'ist26-0925-4', wiki: '%C4%B0stiklal_Avenue' },
  { id: 'ist26-0925-5', wiki: 'Pera_Palace_Hotel' },
  { id: 'ist26-0925-6', wiki: 'Baklava' },
  { id: 'ist26-0925-7', wiki: 'Bosphorus' },
  { id: 'ist26-0925-8', wiki: 'Ni%C5%9Fanta%C5%9F%C4%B1' },
  { id: 'ist26-0925-9', wiki: 'Bomonti' },
  { id: 'ist26-0925-10', wiki: 'Doner_kebab' },
  { id: 'ist26-0925-11', wiki: 'Bomontiada' },
  { id: 'ist26-0925-12', wiki: 'Babylon_(club)' },
  { id: 'ist26-0925-13', wiki: 'Kokoretsi' },

  // DAY 5 — 26 SEP
  { id: 'ist26-0926-1', wiki: 'Turkish_tea' },
  { id: 'ist26-0926-2', wiki: 'New_Mosque,_Istanbul' },
  { id: 'ist26-0926-3', wiki: 'Kebab' },
  { id: 'ist26-0926-4', wiki: 'Turkish_coffee' },
  { id: 'ist26-0926-5', wiki: 'Sirkeci' },
  { id: 'ist26-0926-6', wiki: 'Istanbul_Airport' },
  { id: 'ist26-0926-7', wiki: 'Turkish_Airlines' },
];

const destDir = path.join(__dirname, 'public', 'images', 'events');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function fetchJson(wikiPage) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'en.wikipedia.org',
      path: `/api/rest_v1/page/summary/${wikiPage}`,
      headers: {
        'User-Agent': 'IstanbulTripGuideApp/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; info@istanbulguide.com)'
      }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
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

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log(`Fetching authentic Wikipedia images for ${eventWikiMap.length} calendar events...`);
  
  for (const item of eventWikiMap) {
    const destFile = path.join(destDir, `${item.id}.jpg`);
    try {
      const summary = await fetchJson(item.wiki);
      // Choose thumbnail around 800px-1000px if possible or originalimage
      let imgUrl = summary.originalimage?.source;
      if (summary.thumbnail?.source) {
        // Boost thumbnail width to 960px for great resolution
        imgUrl = summary.thumbnail.source.replace(/\/\d+px-/, '/960px-');
      }

      if (imgUrl) {
        const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${destFile}" "${imgUrl}"`;
        execSync(cmd);
        const stats = fs.statSync(destFile);
        console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${summary.title} (${item.wiki})`);
      } else {
        console.log(`⚠️ No image for ${item.wiki}, fallback...`);
      }
    } catch (e) {
      console.error(`✗ [${item.id}] error:`, e.message);
    }
    await delay(150); // polite rate limit
  }
}

run();
