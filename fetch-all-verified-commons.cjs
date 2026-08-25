const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const eventFileMap = [
  // DAY 1 — 22 SEP
  { id: 'ist26-0922-1', file: 'Istanbul_Airport_control_tower.jpg' },
  { id: 'ist26-0922-2', file: 'Istanbul_Sirkeci_station_2013.jpg' },
  { id: 'ist26-0922-3', file: 'Cağ_kebabı5.jpg' },
  { id: 'ist26-0922-4', file: 'Istanbul_Sirkeci_station_2013.jpg' },

  // DAY 2 — 23 SEP
  { id: 'ist26-0923-1', file: 'Turkish_tea2.jpg' },
  { id: 'ist26-0923-2', file: 'Topkapı_-_01.jpg' },
  { id: 'ist26-0923-3', file: 'Hagia_Sophia_Mars_2013.jpg' },
  { id: 'ist26-0923-4', file: 'Obelisk_of_Theodosius_Istanbul.jpg' },
  { id: 'ist26-0923-5', file: 'Cisterna_Basílica,_Estambul,_Turquía,_2024-09-28,_DD_58-60_HDR.jpg' },
  { id: 'ist26-0923-6', file: 'Istanbul_asv2021-11_img41_Grand_Bazaar.jpg' },
  { id: 'ist26-0923-7', file: 'Eminonu_square_Istanbul.jpg' },
  { id: 'ist26-0923-8', file: 'Spice_Bazaar_Istanbul_Feb_2020,_img_2.jpg' },
  { id: 'ist26-0923-9', file: 'Istanbul_ferry_bosphorus.jpg' },
  { id: 'ist26-0923-10', file: 'Kuzguncuk_houses.jpg' },
  { id: 'ist26-0923-11', file: 'Turkish_meze.jpg' },
  { id: 'ist26-0923-12', file: 'Kız_Kulesi_(Maiden\'s_Tower)_in_Istanbul.jpg' },

  // DAY 3 — 24 SEP
  { id: 'ist26-0924-1', file: 'Turkish_breakfast_spread.jpg' },
  { id: 'ist26-0924-2', file: 'Rustem_Pasha_Mosque.JPG' },
  { id: 'ist26-0924-3', file: 'Büyük_Valide_Han_Istanbul.jpg' },
  { id: 'ist26-0924-4', file: 'SüleymaniyeMosqueIstanbul_(cropped).jpg' },
  { id: 'ist26-0924-5', file: 'Şehzade_Mosque_courtyard.jpg' },
  { id: 'ist26-0924-6', file: 'Boza_in_glass.jpg' },
  { id: 'ist26-0924-7', file: 'Zeyrek_Mosque_Pantokrator_Monastery.jpg' },
  { id: 'ist26-0924-8', file: 'Turkish_esnaf_lokantasi_food.jpg' },
  { id: 'ist26-0924-9', file: 'Gülhane_Park_Istanbul.jpg' },
  { id: 'ist26-0924-10', file: 'Balat_houses_Istanbul.jpg' },
  { id: 'ist26-0924-11', file: 'Theodosian_Walls_of_Constantinople.jpg' },
  { id: 'ist26-0924-12', file: 'Chora_Church_2024.jpg' },
  { id: 'ist26-0924-13', file: 'Galata_Bridge_at_dusk.jpg' },
  { id: 'ist26-0924-14', file: 'Pera_Beyoglu_street.jpg' },
  { id: 'ist26-0924-15', file: 'Turkish_meze.jpg' },
  { id: 'ist26-0924-16', file: 'Çiçek_Pasajı_Istanbul.jpg' },
  { id: 'ist26-0924-17', file: 'Galata_Tower_Istanbul.jpg' },

  // DAY 4 — 25 SEP
  { id: 'ist26-0925-1', file: 'Su_böreği.jpg' },
  { id: 'ist26-0925-2', file: 'Galata_Tower_Istanbul.jpg' },
  { id: 'ist26-0925-3', file: 'Galata_Mevlevihanesi_Semahane.jpg' },
  { id: 'ist26-0925-4', file: 'Istiklal_Avenue_in_Istanbul_-_Turkey.jpg' },
  { id: 'ist26-0925-5', file: 'Pera_Palace_Hotel_Istanbul_2013.jpg' },
  { id: 'ist26-0925-6', file: 'Baklava(1).png' },
  { id: 'ist26-0925-7', file: 'Ortaköy_Mosque_and_Bosphorus_Bridge.jpg' },
  { id: 'ist26-0925-8', file: 'Nisantasi_Istanbul.jpg' },
  { id: 'ist26-0925-9', file: 'Bomonti_beer_factory_complex.jpg' },
  { id: 'ist26-0925-10', file: 'Doner_kebab_spit.jpg' },
  { id: 'ist26-0925-11', file: 'Bomonti_beer_factory_complex.jpg' },
  { id: 'ist26-0925-12', file: 'Live_concert_stage_lights.jpg' },
  { id: 'ist26-0925-13', file: 'Kokorec_serving.jpg' },

  // DAY 5 — 26 SEP
  { id: 'ist26-0926-1', file: 'Turkish_tea2.jpg' },
  { id: 'ist26-0926-2', file: 'Eminonu_square_Istanbul.jpg' },
  { id: 'ist26-0926-3', file: 'Cağ_kebabı5.jpg' },
  { id: 'ist26-0926-4', file: 'Turkish_coffee_serving.jpg' },
  { id: 'ist26-0926-5', file: 'Istanbul_Sirkeci_station_2013.jpg' },
  { id: 'ist26-0926-6', file: 'Istanbul_Airport_control_tower.jpg' },
  { id: 'ist26-0926-7', file: 'Istanbul_Airport_control_tower.jpg' }
];

const destDir = path.join(__dirname, 'public', 'images', 'events');

async function getCommonsThumbnail(fileName) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(fileName)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideApp/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; ozalp@example.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) return resolve(null);
          const page = Object.values(pages)[0];
          const imgInfo = page.imageinfo?.[0];
          resolve(imgInfo?.thumburl || imgInfo?.url || null);
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
  console.log(`Querying MediaWiki Commons API for ${eventFileMap.length} verified files...`);

  for (const item of eventFileMap) {
    const destPath = path.join(destDir, `${item.id}.jpg`);
    try {
      let thumbUrl = await getCommonsThumbnail(item.file);
      
      // If direct filename query didn't find it, try search API on Commons
      if (!thumbUrl) {
        const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.file.replace(/[_.]/g, ' '))}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
        thumbUrl = await new Promise(res => {
          https.get(searchUrl, { headers: { 'User-Agent': 'IstanbulTripGuide/1.0' } }, r => {
            let d = '';
            r.on('data', c => d += c);
            r.on('end', () => {
              try {
                const j = JSON.parse(d);
                const p = Object.values(j.query?.pages || {})[0];
                res(p?.imageinfo?.[0]?.thumburl || p?.imageinfo?.[0]?.url || null);
              } catch {
                res(null);
              }
            });
          }).on('error', () => res(null));
        });
      }

      if (thumbUrl) {
        const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${destPath}" "${thumbUrl}"`;
        execSync(cmd);
        const stats = fs.statSync(destPath);
        console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${item.file}`);
      } else {
        console.log(`✗ Could not find thumbnail for ${item.file}`);
      }
    } catch (e) {
      console.error(`Error on ${item.id}:`, e.message);
    }
    await delay(120);
  }
}

main();
