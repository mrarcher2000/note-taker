// REQUIREMENTS
const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db.json');

// set up server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API Server now active on ${PORT}.`);
});