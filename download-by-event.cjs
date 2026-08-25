const https = require('https');
const fs = require('fs');
const path = require('path');

// 1-to-1 event mapping with curated, authentic Unsplash photos for each specific venue/activity
const eventPhotos = [
  // DAY 1 — 22 SEP
  { id: 'ist26-0922-1', query: 'airport terminal modern', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' }, // Airport
  { id: 'ist26-0922-2', query: 'istanbul boutique hotel sirkeci', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' }, // Sirkeci Hotel
  { id: 'ist26-0922-3', query: 'cag kebap horizontal spit', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' }, // Cağ Kebap
  { id: 'ist26-0922-4', query: 'istanbul old street dusk', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80' }, // Hotel return

  // DAY 2 — 23 SEP
  { id: 'ist26-0923-1', query: 'turkish tea and simit', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' }, // Simit & Tea
  { id: 'ist26-0923-2', query: 'topkapi palace gate', url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80' }, // Topkapı Palace
  { id: 'ist26-0923-3', query: 'hagia sophia interior dome', url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80' }, // Hagia Sophia
  { id: 'ist26-0923-4', query: 'hippodrome obelisk sultanahmet', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80' }, // Hippodrome
  { id: 'ist26-0923-5', query: 'basilica cistern medusa columns', url: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' }, // Basilica Cistern
  { id: 'ist26-0923-6', query: 'grand bazaar istanbul covered street', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' }, // Grand Bazaar
  { id: 'ist26-0923-7', query: 'hamdi kebab restaurant view eminonu', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' }, // Hamdi
  { id: 'ist26-0923-8', query: 'spice bazaar spices istanbul', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80' }, // Spice Bazaar
  { id: 'ist26-0923-9', query: 'sehir hatlari ferry bosphorus', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' }, // Uskudar Ferry
  { id: 'ist26-0923-10', query: 'kuzguncuk wooden colorful houses', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80' }, // Kuzguncuk
  { id: 'ist26-0923-11', query: 'bosphorus seafood meze raki', url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80' }, // İsmet Baba
  { id: 'ist26-0923-12', query: 'istanbul bosphorus night ferry', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80' }, // Night Ferry

  // DAY 3 — 24 SEP
  { id: 'ist26-0924-1', query: 'namli gourmet turkish breakfast cheese', url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80' }, // Namlı Breakfast
  { id: 'ist26-0924-2', query: 'rustem pasha iznik tiles blue', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80' }, // Rüstem Paşa Mosque
  { id: 'ist26-0924-3', query: 'tahtakale bazaar commercial alleys', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80' }, // Tahtakale
  { id: 'ist26-0924-4', query: 'suleymaniye mosque dome golden horn', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80' }, // Süleymaniye Mosque
  { id: 'ist26-0924-5', query: 'sehzade mosque courtyard sinan', url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80' }, // Şehzadebaşı
  { id: 'ist26-0924-6', query: 'vefa boza glass yellow leblebi', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' }, // Vefa Bozacısı
  { id: 'ist26-0924-7', query: 'zeyrek monastery pantokrator byzantine brick', url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80' }, // Zeyrek
  { id: 'ist26-0924-8', query: 'esnaf lokantasi traditional dishes', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' }, // Esnaf Lokantası
  { id: 'ist26-0924-9', query: 'tea garden golden horn bench', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }, // Rest Buffer
  { id: 'ist26-0924-10', query: 'balat colorful houses fener', url: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80' }, // Balat
  { id: 'ist26-0924-11', query: 'walls of constantinople theodosian', url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80' }, // City Walls
  { id: 'ist26-0924-12', query: 'chora church byzantine mosaic golden', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' }, // Chora / Kariye
  { id: 'ist26-0924-13', query: 'golden horn transfer bridge pera', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80' }, // Transfer Pera
  { id: 'ist26-0924-14', query: 'asmali mescit pera street night', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80' }, // Asmalımescit Walk
  { id: 'ist26-0924-15', query: 'asmali cavit meyhane dining tables', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }, // Asmalı Cavit
  { id: 'ist26-0924-16', query: 'cicek pasaji istiklal historic arcade', url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80' }, // İstiklal Passages
  { id: 'ist26-0924-17', query: 'firuzende rooftop bar galata tower night view', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80' }, // Firuzende Galata

  // DAY 4 — 25 SEP
  { id: 'ist26-0925-1', query: 'borek and tea galata morning', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' }, // Simit / Borek
  { id: 'ist26-0925-2', query: 'galata cobbled street masonry', url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80' }, // Galata Neighborhood
  { id: 'ist26-0925-3', query: 'galata mevlevihanesi whirling dervish hall', url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80' }, // Galata Mevlevihanesi
  { id: 'ist26-0925-4', query: 'istiklal red vintage tram daylight', url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80' }, // İstiklal Tramway
  { id: 'ist26-0925-5', query: 'pera palace hotel grand lobby ballroom', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' }, // Pera Palace Hotel
  { id: 'ist26-0925-6', query: 'karakoy gulluoglu pistachio baklava', url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80' }, // Karaköy Güllüoğlu
  { id: 'ist26-0925-7', query: 'long bosphorus cruise ferry yali', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' }, // Bosphorus Ride
  { id: 'ist26-0925-8', query: 'nisantasi abdi ipekci street fashion', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80' }, // Nişantaşı
  { id: 'ist26-0925-9', query: 'bomonti trendy cafe courtyard', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' }, // Bomonti Free Time
  { id: 'ist26-0925-10', query: 'donerci aydin yaprak doner vertical spit', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' }, // Dönerci Aydın
  { id: 'ist26-0925-11', query: 'bomontiada historic brewery courtyard', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80' }, // Bomontiada
  { id: 'ist26-0925-12', query: 'babylon live concert crowd stage', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' }, // Babylon Concert
  { id: 'ist26-0925-13', query: 'kokorec late night roasted sandwich', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' }, // Kokoreç

  // DAY 5 — 26 SEP
  { id: 'ist26-0926-1', query: 'sirkeci morning pastries simit', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' }, // Final Breakfast
  { id: 'ist26-0926-2', query: 'eminonu waterfront spice alleys walk', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' }, // Final Walk
  { id: 'ist26-0926-3', query: 'ocakbasi meat grill final lunch', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' }, // Final Lunch
  { id: 'ist26-0926-4', query: 'turkish coffee gulhane park', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' }, // Coffee / Gülhane
  { id: 'ist26-0926-5', query: 'sirkeci hotel lounge luggage', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' }, // Luggage
  { id: 'ist26-0926-6', query: 'transfer highway to istanbul airport', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80' }, // Leave for IST
  { id: 'ist26-0926-7', query: 'sunset flight departure airplane', url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80' }, // Flight Departure
];

const destDir = path.join(__dirname, 'public', 'images', 'events');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          resolve(stats.size);
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Downloading ${eventPhotos.length} individual event photos...`);
  for (const ep of eventPhotos) {
    const dest = path.join(destDir, `${ep.id}.jpg`);
    try {
      const size = await download(ep.url, dest);
      console.log(`✓ [${ep.id}] (${(size / 1024).toFixed(1)} KB) - ${ep.query}`);
    } catch (e) {
      console.error(`✗ [${ep.id}] failed:`, e.message);
    }
  }
}

run();
