const https = require('https');

const url = 'https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/8/87/Gate_of_Salutation_%28Topkap%C4%B1_Palace%29.jpg&w=800';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Weserv CDN Status for Topkapi:', res.statusCode);
});
