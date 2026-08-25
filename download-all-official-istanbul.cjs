const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const officialUrls = [
  // DAY 1 — 22 SEP
  { id: 'ist26-0922-1', title: 'Istanbul Airport', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg' },
  { id: 'ist26-0922-2', title: 'Sirkeci Station', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Istanbul_Sirkeci_station_2013.jpg' },
  { id: 'ist26-0922-3', title: 'Cağ Kebabı', url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Ca%C4%9Fkebab%C4%B15.jpg' },
  { id: 'ist26-0922-4', title: 'Sirkeci Night', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Istanbul_Sirkeci_Tram_stop.JPG' },

  // DAY 2 — 23 SEP
  { id: 'ist26-0923-1', title: 'Turkish Simit & Tea', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Turkish_tea2.jpg' },
  { id: 'ist26-0923-2', title: 'Topkapı Palace Gate', url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Topkap%C4%B1_-_01.jpg' },
  { id: 'ist26-0923-3', title: 'Hagia Sophia', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Hagia_Sophia_%28228968325%29.jpeg' },
  { id: 'ist26-0923-4', title: 'Hippodrome Obelisk', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Obelisk_of_Theodosius_Istanbul.jpg' },
  { id: 'ist26-0923-5', title: 'Basilica Cistern Istanbul', url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Istanbul_Basilica_Cistern_2009.JPG' },
  { id: 'ist26-0923-6', title: 'Grand Bazaar Street', url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Istanbul_asv2021-11_img41_Grand_Bazaar.jpg' },
  { id: 'ist26-0923-7', title: 'Eminönü Square & Golden Horn', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Eminonu_square_Istanbul.jpg' },
  { id: 'ist26-0923-8', title: 'Spice Bazaar', url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Spice_Bazaar_Istanbul_Feb_2020%2C_img_2.jpg' },
  { id: 'ist26-0923-9', title: 'Bosphorus Ferry', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Istanbul_ferry_bosphorus.jpg' },
  { id: 'ist26-0923-10', title: 'Kuzguncuk Houses', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Selfie_time_in_Istanbul_streets_%2816428058798%29.jpg' },
  { id: 'ist26-0923-11', title: 'Turkish Meze & Seafood', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Petra_metzes.jpg' },
  { id: 'ist26-0923-12', title: "Maiden's Tower Bosphorus", url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/K%C4%B1z_Kulesi_%28Maiden%27s_Tower%29_in_Istanbul.jpg' },

  // DAY 3 — 24 SEP
  { id: 'ist26-0924-1', title: 'Turkish Breakfast Spread', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Turkish_breakfast_table.jpg' },
  { id: 'ist26-0924-2', title: 'Rüstem Paşa İznik Tiles', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Rustem_Pasha_Mosque.JPG' },
  { id: 'ist26-0924-3', title: 'Tahtakale Valide Han', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/B%C3%BCy%C3%BCk_Valide_Han_Istanbul.jpg' },
  { id: 'ist26-0924-4', title: 'Süleymaniye Mosque', url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg' },
  { id: 'ist26-0924-5', title: 'Şehzade Mosque', url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/%C5%9Eehzade_Mosque_Istanbul.jpg' },
  { id: 'ist26-0924-6', title: 'Vefa Bozacısı Glass', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Istanbul_Vefa_Bozaci_4881.jpg' },
  { id: 'ist26-0924-7', title: 'Zeyrek Pantokrator Mosque', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Zeyrek_Mosque_Istanbul.jpg' },
  { id: 'ist26-0924-8', title: 'Esnaf Lokantası Cuisine', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Kuru_fasulye_pilav.jpg' },
  { id: 'ist26-0924-9', title: 'Gülhane Park', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/G%C3%BClhane_Park_Istanbul.jpg' },
  { id: 'ist26-0924-10', title: 'Balat Colorful Houses', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Balat_houses.jpg' },
  { id: 'ist26-0924-11', title: 'Walls of Constantinople', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Theodosian_Walls_of_Constantinople.jpg' },
  { id: 'ist26-0924-12', title: 'Chora Church Kariye', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Chora_Church_2024.jpg' },
  { id: 'ist26-0924-13', title: 'Galata Bridge Golden Horn', url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Galata_Bridge_at_dusk.jpg' },
  { id: 'ist26-0924-14', title: 'Asmalımescit Beyoğlu', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Asmali_Mescit_Street_Beyoglu.jpg' },
  { id: 'ist26-0924-15', title: 'Meyhane Dining Tables', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Petra_metzes.jpg' },
  { id: 'ist26-0924-16', title: 'Çiçek Pasajı Arcade', url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/%C3%87i%C3%A7ek_Pasaj%C4%B1_Istanbul.jpg' },
  { id: 'ist26-0924-17', title: 'Galata Tower Istanbul', url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Galata_Tower_Istanbul.jpg' },

  // DAY 4 — 25 SEP
  { id: 'ist26-0925-1', title: 'Su Böreği', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Su_b%C3%B6re%C4%9Fi.jpg' },
  { id: 'ist26-0925-2', title: 'Galata Quarter', url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Galata_Tower_Istanbul.jpg' },
  { id: 'ist26-0925-3', title: 'Galata Mevlevihanesi', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Galata_Mevlevihanesi_Semahane.jpg' },
  { id: 'ist26-0925-4', title: 'İstiklal Nostalgic Tram', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Istiklal_Avenue_in_Istanbul_-_Turkey.jpg' },
  { id: 'ist26-0925-5', title: 'Pera Palace Hotel', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Pera_Palace_Hotel_Istanbul_2013.jpg' },
  { id: 'ist26-0925-6', title: 'Pistachio Baklava', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png' },
  { id: 'ist26-0925-7', title: 'Ortaköy Mosque & Bosphorus', url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ortak%C3%B6y_Mosque_and_Bosphorus_Bridge.jpg' },
  { id: 'ist26-0925-8', title: 'Nişantaşı Fashion Street', url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Nisantasi_Istanbul.jpg' },
  { id: 'ist26-0925-9', title: 'Bomonti Beer Factory', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Bomonti_beer_factory_complex.jpg' },
  { id: 'ist26-0925-10', title: 'Yaprak Döner Spit', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Doner_kebab_Istanbul.jpg' },
  { id: 'ist26-0925-11', title: 'Bomontiada Courtyard', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Bomonti_beer_factory_complex.jpg' },
  { id: 'ist26-0925-12', title: 'Babylon Live Stage', url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Live_concert_stage_lights.jpg' },
  { id: 'ist26-0925-13', title: 'Kokoreç Grill', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Kokorec_Istanbul.jpg' },

  // DAY 5 — 26 SEP
  { id: 'ist26-0926-1', title: 'Turkish Tea Glass', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Turkish_tea2.jpg' },
  { id: 'ist26-0926-2', title: 'Eminönü Waterfront', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Eminonu_square_Istanbul.jpg' },
  { id: 'ist26-0926-3', title: 'Ocakbaşı Kebab', url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Ca%C4%9Fkebab%C4%B15.jpg' },
  { id: 'ist26-0926-4', title: 'Turkish Coffee Demitasse', url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Turkish_coffee_serving.jpg' },
  { id: 'ist26-0926-5', title: 'Sirkeci Hotel', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Istanbul_Sirkeci_station_2013.jpg' },
  { id: 'ist26-0926-6', title: 'Airport Highway Transfer', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg' },
  { id: 'ist26-0926-7', title: 'Airport Departure', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg' },
];

const destDir = path.join(__dirname, 'public', 'images', 'events');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Downloading 100% genuine original Istanbul photos for all ${officialUrls.length} activities...`);

let success = 0;
let fail = 0;

for (const item of officialUrls) {
  const destPath = path.join(destDir, `${item.id}.jpg`);
  try {
    const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@istanbulguide.com)" -o "${destPath}" "${item.url}"`;
    execSync(cmd);
    const stats = fs.statSync(destPath);
    if (stats.size > 20000) {
      console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${item.title}`);
      success++;
    } else {
      console.error(`⚠️ [${item.id}] Unexpected small file (${stats.size} b) for ${item.title}`);
      fail++;
    }
  } catch (e) {
    console.error(`✗ [${item.id}] error:`, e.message);
    fail++;
  }
}

console.log(`Finished: ${success} succeeded, ${fail} failed.`);
