const { execSync } = require('child_process');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/9/98/Istanbul_Basilica_Cistern_2009.JPG';
const cmd = `curl.exe -s -L -A "IstanbulTripGuideBot/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; contact@istanbulguide.com)" -o "test-original-cistern.jpg" "${url}"`;

execSync(cmd);
const stats = fs.statSync('test-original-cistern.jpg');
console.log('Original image download size:', (stats.size / 1024).toFixed(1), 'KB');
