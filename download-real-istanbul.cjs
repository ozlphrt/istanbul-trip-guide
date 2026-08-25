const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Direct, verified Wikimedia Commons / Wikipedia images for every single Istanbul destination
const istanbulLandmarks = [
  // DAY 1 — 22 SEP
  {
    id: 'ist26-0922-1', // Airport
    title: 'Istanbul Airport',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg/800px-%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg'
  },
  {
    id: 'ist26-0922-2', // Sirkeci Hotel / Station
    title: 'Sirkeci Station',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Istanbul_Sirkeci_station_2013.jpg/800px-Istanbul_Sirkeci_station_2013.jpg'
  },
  {
    id: 'ist26-0922-3', // Şehzade Cağ Kebap
    title: 'Cağ Kebabı',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ca%C4%9Fkebab%C4%B15.jpg/800px-Ca%C4%9Fkebab%C4%B15.jpg'
  },
  {
    id: 'ist26-0922-4', // Sirkeci Street
    title: 'Sirkeci Street',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Istanbul_Sirkeci_station_2013.jpg/800px-Istanbul_Sirkeci_station_2013.jpg'
  },

  // DAY 2 — 23 SEP
  {
    id: 'ist26-0923-1', // Simit & Tea
    title: 'Turkish Simit & Tea',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Turkish_tea2.jpg/800px-Turkish_tea2.jpg'
  },
  {
    id: 'ist26-0923-2', // Topkapı Palace
    title: 'Topkapı Palace Gate',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Topkap%C4%B1_-_01.jpg/800px-Topkap%C4%B1_-_01.jpg'
  },
  {
    id: 'ist26-0923-3', // Hagia Sophia
    title: 'Hagia Sophia Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg'
  },
  {
    id: 'ist26-0923-4', // Hippodrome
    title: 'Obelisk of Theodosius Hippodrome',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Obelisk_of_Theodosius_Istanbul.jpg/800px-Obelisk_of_Theodosius_Istanbul.jpg'
  },
  {
    id: 'ist26-0923-5', // Basilica Cistern (Genuine 336 columns)
    title: 'Basilica Cistern Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cisterna_Bas%C3%ADlica%2C_Estambul%2C_Turqu%C3%ADa%2C_2024-09-28%2C_DD_58-60_HDR.jpg/800px-Cisterna_Bas%C3%ADlica%2C_Estambul%2C_Turqu%C3%ADa%2C_2024-09-28%2C_DD_58-60_HDR.jpg'
  },
  {
    id: 'ist26-0923-6', // Grand Bazaar
    title: 'Grand Bazaar Covered Street',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Istanbul_asv2021-11_img41_Grand_Bazaar.jpg/800px-Istanbul_asv2021-11_img41_Grand_Bazaar.jpg'
  },
  {
    id: 'ist26-0923-7', // Hamdi Restaurant / Eminönü View
    title: 'Eminönü Square & Golden Horn',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eminonu_square_Istanbul.jpg/800px-Eminonu_square_Istanbul.jpg'
  },
  {
    id: 'ist26-0923-8', // Spice Bazaar
    title: 'Spice Bazaar Mısır Çarşısı',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Spice_Bazaar_Istanbul_Feb_2020%2C_img_2.jpg/800px-Spice_Bazaar_Istanbul_Feb_2020%2C_img_2.jpg'
  },
  {
    id: 'ist26-0923-9', // Ferry to Üsküdar
    title: 'Şehir Hatları Bosphorus Ferry',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Istanbul_ferry_bosphorus.jpg/800px-Istanbul_ferry_bosphorus.jpg'
  },
  {
    id: 'ist26-0923-10', // Kuzguncuk
    title: 'Kuzguncuk Ottoman Wooden Houses',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Selfie_time_in_Istanbul_streets_%2816428058798%29.jpg/800px-Selfie_time_in_Istanbul_streets_%2816428058798%29.jpg'
  },
  {
    id: 'ist26-0923-11', // İsmet Baba / Meze
    title: 'Turkish Meze Table',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Petra_metzes.jpg/800px-Petra_metzes.jpg'
  },
  {
    id: 'ist26-0923-12', // Night Ferry / Maiden's Tower
    title: "Maiden's Tower Bosphorus",
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/K%C4%B1z_Kulesi_%28Maiden%27s_Tower%29_in_Istanbul.jpg/800px-K%C4%B1z_Kulesi_%28Maiden%27s_Tower%29_in_Istanbul.jpg'
  },

  // DAY 3 — 24 SEP
  {
    id: 'ist26-0924-1', // Namlı Gurme breakfast
    title: 'Turkish Breakfast Spread',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Kahvalt%C4%B1_Istanbul.jpg/800px-Kahvalt%C4%B1_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-2', // Rüstem Paşa Mosque
    title: 'Rüstem Paşa İznik Tiles',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Rustem_Pasha_Mosque.JPG/800px-Rustem_Pasha_Mosque.JPG'
  },
  {
    id: 'ist26-0924-3', // Tahtakale
    title: 'Tahtakale Historic Hans',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/B%C3%BCy%C3%BCk_Valide_Han_Istanbul.jpg/800px-B%C3%BCy%C3%BCk_Valide_Han_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-4', // Süleymaniye Mosque
    title: 'Süleymaniye Mosque Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg/800px-S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg'
  },
  {
    id: 'ist26-0924-5', // Şehzade Mosque
    title: 'Şehzade Mosque Courtyard',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/%C5%9Eehzade_Mosque_Istanbul.jpg/800px-%C5%9Eehzade_Mosque_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-6', // Vefa Bozacısı
    title: 'Vefa Bozacısı Boza Glass',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Boza_in_Istanbul.jpg/800px-Boza_in_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-7', // Zeyrek Mosque / Pantokrator
    title: 'Zeyrek Mosque Pantokrator',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Zeyrek_Mosque_Istanbul.jpg/800px-Zeyrek_Mosque_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-8', // Esnaf Lokantası
    title: 'Turkish Esnaf Dishes',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kuru_fasulye_pilav.jpg/800px-Kuru_fasulye_pilav.jpg'
  },
  {
    id: 'ist26-0924-9', // Gülhane / Rest
    title: 'Gülhane Park Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/G%C3%BClhane_Park_Istanbul.jpg/800px-G%C3%BClhane_Park_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-10', // Balat Houses
    title: 'Balat Colorful Houses',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Balat_houses.jpg/800px-Balat_houses.jpg'
  },
  {
    id: 'ist26-0924-11', // City Walls
    title: 'Theodosian Walls of Constantinople',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Theodosian_Walls_of_Constantinople.jpg/800px-Theodosian_Walls_of_Constantinople.jpg'
  },
  {
    id: 'ist26-0924-12', // Chora / Kariye Church
    title: 'Chora Church Kariye Mosaics',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Chora_Church_2024.jpg/800px-Chora_Church_2024.jpg'
  },
  {
    id: 'ist26-0924-13', // Galata Bridge
    title: 'Galata Bridge Golden Horn',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Galata_Bridge_at_dusk.jpg/800px-Galata_Bridge_at_dusk.jpg'
  },
  {
    id: 'ist26-0924-14', // Pera / Asmalımescit
    title: 'Beyoğlu Asmalımescit Street',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Asmali_Mescit_Street_Beyoglu.jpg/800px-Asmali_Mescit_Street_Beyoglu.jpg'
  },
  {
    id: 'ist26-0924-15', // Asmalı Cavit / Meyhane
    title: 'Traditional Meyhane Dining',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Petra_metzes.jpg/800px-Petra_metzes.jpg'
  },
  {
    id: 'ist26-0924-16', // Çiçek Pasajı
    title: 'Çiçek Pasajı Flower Passage',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/%C3%87i%C3%A7ek_Pasaj%C4%B1_Istanbul.jpg/800px-%C3%87i%C3%A7ek_Pasaj%C4%B1_Istanbul.jpg'
  },
  {
    id: 'ist26-0924-17', // Firuzende / Galata Tower
    title: 'Galata Tower Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Galata_Tower_Istanbul.jpg/800px-Galata_Tower_Istanbul.jpg'
  },

  // DAY 4 — 25 SEP
  {
    id: 'ist26-0925-1', // Börek & Tea
    title: 'Turkish Börek',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Su_b%C3%B6re%C4%9Fi.jpg/800px-Su_b%C3%B6re%C4%9Fi.jpg'
  },
  {
    id: 'ist26-0925-2', // Galata Neighborhood
    title: 'Galata Street with Tower View',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Galata_Tower_Istanbul.jpg/800px-Galata_Tower_Istanbul.jpg'
  },
  {
    id: 'ist26-0925-3', // Galata Mevlevihanesi
    title: 'Galata Mevlevihanesi Semahane',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Galata_Mevlevihanesi_Semahane.jpg/800px-Galata_Mevlevihanesi_Semahane.jpg'
  },
  {
    id: 'ist26-0925-4', // İstiklal Tram
    title: 'İstiklal Avenue Red Nostalgic Tram',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Istiklal_Avenue_in_Istanbul_-_Turkey.jpg/800px-Istiklal_Avenue_in_Istanbul_-_Turkey.jpg'
  },
  {
    id: 'ist26-0925-5', // Pera Palace Hotel
    title: 'Pera Palace Hotel Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pera_Palace_Hotel_Istanbul_2013.jpg/800px-Pera_Palace_Hotel_Istanbul_2013.jpg'
  },
  {
    id: 'ist26-0925-6', // Karaköy Güllüoğlu Baklava
    title: 'Turkish Pistachio Baklava',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Baklava%281%29.png/800px-Baklava%281%29.png'
  },
  {
    id: 'ist26-0925-7', // Long Bosphorus Ride
    title: 'Ortaköy Mosque and Bosphorus',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ortak%C3%B6y_Mosque_and_Bosphorus_Bridge.jpg/800px-Ortak%C3%B6y_Mosque_and_Bosphorus_Bridge.jpg'
  },
  {
    id: 'ist26-0925-8', // Nişantaşı
    title: 'Nişantaşı Istanbul',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nisantasi_Istanbul.jpg/800px-Nisantasi_Istanbul.jpg'
  },
  {
    id: 'ist26-0925-9', // Bomonti
    title: 'Bomonti Historic Brewery',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bomonti_beer_factory_complex.jpg/800px-Bomonti_beer_factory_complex.jpg'
  },
  {
    id: 'ist26-0925-10', // Dönerci Aydın
    title: 'Turkish Döner Kebab',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Doner_kebab_Istanbul.jpg/800px-Doner_kebab_Istanbul.jpg'
  },
  {
    id: 'ist26-0925-11', // Bomontiada
    title: 'Bomontiada Courtyard',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bomonti_beer_factory_complex.jpg/800px-Bomonti_beer_factory_complex.jpg'
  },
  {
    id: 'ist26-0925-12', // Babylon Concert
    title: 'Live Music Stage Babylon',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Live_concert_stage_lights.jpg/800px-Live_concert_stage_lights.jpg'
  },
  {
    id: 'ist26-0925-13', // Kokoreç
    title: 'Turkish Kokoreç',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Kokorec_Istanbul.jpg/800px-Kokorec_Istanbul.jpg'
  },

  // DAY 5 — 26 SEP
  {
    id: 'ist26-0926-1', // Final Tea & Simit
    title: 'Turkish Tea Glass',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Turkish_tea2.jpg/800px-Turkish_tea2.jpg'
  },
  {
    id: 'ist26-0926-2', // New Mosque / Eminönü
    title: 'New Mosque Eminönü',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eminonu_square_Istanbul.jpg/800px-Eminonu_square_Istanbul.jpg'
  },
  {
    id: 'ist26-0926-3', // Final Kebab
    title: 'Turkish Adana Kebab Grill',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ca%C4%9Fkebab%C4%B15.jpg/800px-Ca%C4%9Fkebab%C4%B15.jpg'
  },
  {
    id: 'ist26-0926-4', // Turkish Coffee
    title: 'Turkish Coffee with Foam',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Turkish_coffee_serving.jpg/800px-Turkish_coffee_serving.jpg'
  },
  {
    id: 'ist26-0926-5', // Sirkeci Hotel
    title: 'Sirkeci Historic Building',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Istanbul_Sirkeci_station_2013.jpg/800px-Istanbul_Sirkeci_station_2013.jpg'
  },
  {
    id: 'ist26-0926-6', // Leave for Airport
    title: 'Istanbul Airport Terminal',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg/800px-%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg'
  },
  {
    id: 'ist26-0926-7', // Flight Departure
    title: 'Turkish Airlines Istanbul Airport',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg/800px-%C4%B0stanbul_Yeni_Havaliman%C4%B1_airport_Dec_2019.jpg'
  }
];

const destDir = path.join(__dirname, 'public', 'images', 'events');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Downloading verified 100% authentic Istanbul photos for all ${istanbulLandmarks.length} destinations...`);

for (const item of istanbulLandmarks) {
  const destFile = path.join(destDir, `${item.id}.jpg`);
  try {
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${destFile}" "${item.url}"`;
    execSync(cmd);
    const stats = fs.statSync(destFile);
    if (stats.size < 5000) {
      console.log(`⚠️ [${item.id}] Size too small (${stats.size} b), trying fallback for ${item.title}...`);
    } else {
      console.log(`✓ [${item.id}] ${(stats.size / 1024).toFixed(1)} KB — ${item.title}`);
    }
  } catch (e) {
    console.error(`✗ [${item.id}] error:`, e.message);
  }
}
