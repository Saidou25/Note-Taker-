const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid.js');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Note Taker');
});

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const readNotes = fs.readFileSync(`./db/db.json`, 'utf8');
  const parsedNotes = JSON.parse(readNotes);
  res.json(parsedNotes);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    
    parsedNotes.push(newNote);
    const noteString = JSON.stringify(parsedNotes, null, 2);
    console.log(noteString);

    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err ? console.log(err) : console.log(`Note for ${newNote.title} has been written to JSON file`)
    );
  }
});
    //   const response = {
    //     status: 'success',
    //     body: newNote,
    //   }

    //   res.status(201).json(response);
    // } else {
    //   res.status(500).json('err in posting note');
    // }

 

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

