const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent('Raki meze Turkey')}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;

https.get(url, { headers: { 'User-Agent': 'IstanbulTripGuideApp/1.0' } }, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const j = JSON.parse(d);
    const p = Object.values(j.query?.pages || {})[0];
    const directUrl = p?.imageinfo?.[0]?.url;
    console.log('Direct URL:', directUrl);
    if (directUrl) {
      const destPath = path.join(__dirname, 'public', 'images', 'events', 'ist26-0923-11.jpg');
      const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (contact@istanbulguide.com)" -o "${destPath}" "${directUrl}"`;
      execSync(cmd);
      const stats = fs.statSync(destPath);
      console.log(`✓ Saved ist26-0923-11.jpg: ${(stats.size / 1024).toFixed(1)} KB`);
    }
  });
});
