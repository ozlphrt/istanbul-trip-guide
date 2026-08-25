const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');

async function getCommonsThumbnail(filename, width = 800) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
    https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuide/1.0 (contact@example.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = Object.values(pages)[0];
          const imgInfo = page.imageinfo?.[0];
          resolve(imgInfo?.thumburl || imgInfo?.url);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const testFiles = [
    'Hagia_Sophia_Mars_2013.jpg',
    'Cisterna_Bas%C3%ADlica%2C_Estambul%2C_Turqu%C3%ADa%2C_2024-09-28%2C_DD_58-60_HDR.jpg',
    'Topkap%C4%B1_-_01.jpg',
    'S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg',
    'Galata_Tower_Istanbul.jpg',
    'Rustem_Pasha_Mosque.JPG'
  ];

  for (const f of testFiles) {
    const thumbUrl = await getCommonsThumbnail(f, 800);
    console.log(`Thumbnail for ${f}: ${thumbUrl}`);
    execSync(`curl.exe -s -L -A "Mozilla/5.0" -o test-${f.substring(0, 10)}.jpg "${thumbUrl}"`);
    const stats = fs.statSync(`test-${f.substring(0, 10)}.jpg`);
    console.log(`✓ Size: ${(stats.size / 1024).toFixed(1)} KB`);
  }
}

main();
