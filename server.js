const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.static(__dirname + "/dist/"));

app.listen(PORT, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server running on port ${PORT}!`);
});