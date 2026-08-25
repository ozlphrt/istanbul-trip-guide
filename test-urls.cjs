const https = require('https');

const urls = [
  'https://upload.wikimedia.org/wikipedia/commons/1/18/Istanbul_Airport_control_tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/23/Sirkeci_Station_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5a/Ca%C4%9F_kebab%C4%B1.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/Turkish_tea_in_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/8/87/Gate_of_Salutation_%28Topkap%C4%B1_Palace%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/90/Obelisk_of_Theodosius_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/7b/Basilica_Cistern_Istanbul.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/8/8c/Grand_Bazaar_Istanbul_interior_2010.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/1a/Eminonu_square_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/14/Spice_Bazaar_Istanbul_2010.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9e/Istanbul_ferry_bosphorus.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/47/Kuzguncuk_houses.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Turkish_meze.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/da/Turkish_breakfast_spread.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/Rustem_Pasha_Mosque_Iznik_tiles.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/94/Tahtakale_bazaar_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4e/Suleymaniye_Mosque_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/36/Sehzade_Mosque_courtyard.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c5/Boza_in_glass.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zeyrek_Mosque_Pantokrator_Monastery.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Turkish_esnaf_lokantasi_food.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Ortak%C3%B6y_Mosque_and_Bosphorus_Bridge.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e0/Balat_houses_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e9/Walls_of_Constantinople_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/ce/Chora_church_Istanbul_2007.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/30/Istiklal_Avenue_tram_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/52/Pera_Beyoglu_street.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/ed/Cicek_Pasaji_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d7/Galata_Tower_%28Istanbul%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a2/Galata_Mevlevihanesi_Semahane.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pera_Palace_Hotel_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png',
  'https://upload.wikimedia.org/wikipedia/commons/e/e3/Nisantasi_Istanbul.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Doner_kebab_spit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b3/Bomonti_beer_factory_complex.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3b/Live_concert_stage_lights.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5a/Kokorec_serving.jpg'
];

async function check() {
  for (const url of urls) {
    try {
      await new Promise((resolve) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
          console.log(res.statusCode, url.split('/').pop());
          resolve();
        });
        req.on('error', (e) => {
          console.log('ERR', e.message, url.split('/').pop());
          resolve();
        });
      });
    } catch(e) {}
  }
}
check();
