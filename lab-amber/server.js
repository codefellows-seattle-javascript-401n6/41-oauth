'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');

const app = express();

dotenv.load();

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: './'});
});

app.listen(PORT, () => {
  console.log(`Listening in at port ${PORT}`);
});