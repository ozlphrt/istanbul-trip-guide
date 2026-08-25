const https = require('https');
const fs = require('fs');
const path = require('path');

// Test fetching genuine official Wikipedia image for Basilica Cistern
const article = 'Basilica_Cistern';

const options = {
  hostname: 'en.wikipedia.org',
  path: `/api/rest_v1/page/summary/${encodeURIComponent(article)}`,
  headers: {
    'User-Agent': 'IstanbulTripGuideApp/1.0 (https://github.com/ozlphrt/istanbul-trip-guide; ozalp@example.com)'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('Title:', json.title);
    console.log('Description:', json.description);
    console.log('Thumbnail URL:', json.thumbnail?.source);
    console.log('Original Image URL:', json.originalimage?.source);
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
});
