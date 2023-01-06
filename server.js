const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Note Taker');
});

app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, 'public/notes.html'))
});
app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, 'public/index.html'))
});






app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
