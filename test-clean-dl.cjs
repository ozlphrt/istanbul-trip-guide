const { execSync } = require('child_process');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Istanbul_Basilica_Cistern_2009.JPG/960px-Istanbul_Basilica_Cistern_2009.JPG';
const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "test-clean-cistern.jpg" "${url}"`;

execSync(cmd);
const stats = fs.statSync('test-clean-cistern.jpg');
console.log('Clean download size:', (stats.size / 1024).toFixed(1), 'KB');
