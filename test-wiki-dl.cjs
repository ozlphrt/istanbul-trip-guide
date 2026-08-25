const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cisterna_Bas%C3%ADlica%2C_Estambul%2C_Turqu%C3%ADa%2C_2024-09-28%2C_DD_58-60_HDR.jpg/960px-Cisterna_Bas%C3%ADlica%2C_Estambul%2C_Turqu%C3%ADa%2C_2024-09-28%2C_DD_58-60_HDR.jpg';
const dest = path.join(__dirname, 'test-cistern.jpg');

function download(imgUrl, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(imgUrl, {
      headers: {
        'User-Agent': 'IstanbulTripGuideApp/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@example.com)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      console.log('Status code:', res.statusCode);
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          console.log('Downloaded size:', stats.size, 'bytes');
          resolve(stats.size);
        });
      });
    }).on('error', (e) => {
      console.error('Download error:', e.message);
      reject(e);
    });
  });
}

download(url, dest);
