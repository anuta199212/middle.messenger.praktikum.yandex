/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const express = require("express");
const PORT = 3000;

const CURPORT = process.env.PORT || PORT;

const app = express();

const DIRNAME = path.resolve(__dirname, 'dist');
const INDEXDIR = path.resolve(DIRNAME, 'index.html');

app.use(express.static(DIRNAME));

app.get('*', (req, res) => {
    res.sendFile(INDEXDIR);
});

app.listen(CURPORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server running on port ${CURPORT}!`);
});
