const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RESULTS_FILE = path.join(__dirname, 'results.txt');

app.use(express.static(__dirname)); // отдаём index.html, stats.html и т.д.
app.use(express.json());

// Принять ответ
app.post('/submit', (req, res) => {
  const allowedFields = ['q1','q2','q3','q4','q5','q6','q7'];
  const ans = {};
  for (let f of allowedFields) {
    if (!req.body[f] || !String(req.body[f]).match(/^[1-4]$/)) {
      return res.status(400).json({error: 'Invalid data'});
    }
    ans[f] = req.body[f];
  }
  ans.ts = new Date().toISOString(); // метка времени (опционально)
  fs.appendFile(RESULTS_FILE, JSON.stringify(ans)+'\n', err => {
    if (err) return res.status(500).json({error:'Write failed'});
    res.json({ok:true});
  });
});

// Получить все результаты (для stats.html)
app.get('/results', (req, res) => {
  if (!fs.existsSync(RESULTS_FILE)) return res.json([]);
  const lines = fs.readFileSync(RESULTS_FILE, 'utf8').trim().split('\n').filter(Boolean);
  const arr = lines.map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean).map(ans => {
    // только q1..q7, игнорировать всё остальное
    const res = {};
    for (let i=1;i<=7;i++) res['q'+i]=ans['q'+i];
    return res;
  });
  res.json(arr);
});

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));


