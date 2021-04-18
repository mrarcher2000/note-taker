// REQUIREMENTS
const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json');
const { response } = require('express');

// set up server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!req.body.text) {
        res.status(400).send("There is no text in this note!");
    } 

    else {
        var newNote = req.body;
        notes.push(newNote);

        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notes, null, 2)
        );

        res.json(notes);
    }
});


app.delete('/api/notes/:id', (req, res) => {

    for (i = 0; i < notes.length; i++) {
        currentNote = notes[i];
        console.log(currentNote.id);
        console.log(req.params.id);
        if (currentNote.id == req.params.id) {
            let pos = notes.indexOf(currentNote);
            notes.splice(pos, 1);
            console.log(notes);
        }
    };


    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.send(`Note #${req.params.id} deleted`);
});


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () => {
    console.log(`API Server now active on ${PORT}.`);
});