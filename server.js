
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get("/form", (req, res) => {
  res.redirect("https://docs.google.com/forms/d/e/1FAIpQLSfWTt9rhBtosk4oAulyUxTkTHk06NJzGQ_qZ0yZkoVFb6f9Gg/viewform?embedded=true");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
