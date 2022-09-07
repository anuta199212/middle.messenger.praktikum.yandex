/* eslint-disable @typescript-eslint/no-var-requires */
const fallback = require("express-history-api-fallback");
const express = require("express");
const PORT = 3000;

const CURPORT = process.env.PORT || PORT;

const app = express();

let root = __dirname + "/dist/";

app.use(express.static(root));
app.use(fallback("index.html", { root: root }));

app.listen(CURPORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server running on port ${CURPORT}!`);
});
