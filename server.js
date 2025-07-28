// Простой Node.js сервер с геолокационной проверкой

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const WAREHOUSE_LAT = 53.427023778266154;
const WAREHOUSE_LON = 14.735672852779608;
const ALLOWED_RADIUS = 100; // метров

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

app.post('/verify', (req, res) => {
  const { lat, lon } = req.body;
  const distance = getDistance(lat, lon, WAREHOUSE_LAT, WAREHOUSE_LON);
  if (distance <= ALLOWED_RADIUS) {
    res.status(200).json({ allowed: true });
  } else {
    res.status(403).json({ allowed: false });
  }
});

app.listen(3000, () => {
  console.log('🚀 Сервер запущен на http://localhost:3000');
});
