// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const PORT = 3000;

const CURPORT = process.env.PORT || PORT;

const app = express();

app.use(express.static(__dirname + "/dist/"));

app.listen(CURPORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server running on port ${CURPORT}!`);
});
