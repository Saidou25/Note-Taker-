const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
// const notes = require('./db/notes');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Note Taker');
});

app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, 'public/notes.html'))
});
app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
  console.info("get working");
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const {title, note} = req.body;

  if (title && note) {
    const newNote = {
      title,
      note,
      note_id: uuid(),
    };
    const noteString = JSON.stringify(newNote);
     fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
    err ? console.log(err) : console.log(`Nite for ${newNote.title} has been weitten to JSON file`))
    
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
