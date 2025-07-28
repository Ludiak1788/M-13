const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Статика
app.use(express.static(path.join(__dirname, 'public')));

// Скрытая переадресация
app.get('/form', (req, res) => {
  const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfWTt9rhBtosk4oAulyUxTkTHk06NJzGQ_qZ0yZkoVFb6f9Gg/viewform?usp=dialog';
  res.redirect(formURL);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
