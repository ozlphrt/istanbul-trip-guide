const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');

async function searchAndDownload(keyword, destFile) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(keyword)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideBot/1.0 (contact@istanbulguide.com)' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const pages = j.query?.pages;
          if (!pages) {
            console.log(`✗ No search results for "${keyword}"`);
            return resolve(false);
          }
          const page = Object.values(pages)[0];
          const imgUrl = page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url;
          console.log(`Found "${page.title}" -> ${imgUrl}`);
          if (imgUrl) {
            execSync(`curl.exe -s -L -A "Mozilla/5.0" -o "${destFile}" "${imgUrl}"`);
            const stats = fs.statSync(destFile);
            console.log(`✓ Saved ${destFile}: ${(stats.size / 1024).toFixed(1)} KB`);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (e) {
          console.error(`Parse error for "${keyword}":`, e.message);
          resolve(false);
        }
      });
    }).on('error', (e) => {
      console.error(`HTTP error for "${keyword}":`, e.message);
      resolve(false);
    });
  });
}

async function test() {
  await searchAndDownload('Basilica Cistern Istanbul columns', 'test-cistern.jpg');
  await searchAndDownload('Topkapi Palace gate of salutation', 'test-topkapi.jpg');
  await searchAndDownload('Hagia Sophia Istanbul exterior', 'test-hagiasophia.jpg');
  await searchAndDownload('Suleymaniye Mosque Istanbul Golden Horn', 'test-suleymaniye.jpg');
  await searchAndDownload('Galata Tower Istanbul night', 'test-galata.jpg');
  await searchAndDownload('Vefa Bozacisi Istanbul', 'test-vefa.jpg');
}

test();
