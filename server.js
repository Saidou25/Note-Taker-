const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid.js');
const notes = require('./db/notes.json');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Note Taker');
});

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
  console.log('ok');
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, note } = req.body;

  if (title && note) {
    const newNote = {
      title,
      note,
      id: uuid(),
    };

    const readNotes = fs.readFileSync(`./db/db.json`, 'utf8');
    const parsedNotes = JSON.parse(readNotes);
    parsedNotes.push(newNote);
    const noteString = JSON.stringify(parsedNotes, null, 2);


    fs.writeFile(`./db/db.json${newNote.title}.json`, noteString, (err) =>
      err ? console.log(err) : console.log(`Nite for ${newNote.title} has been written to JSON file`)
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    req.status(201).json(response);
  } else {
    res.status(500).json('err in posting note');
  }

});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
