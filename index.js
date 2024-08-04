const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is an ExpressJs project named “ExpressMongoCRUD”');
});

module.exports = app;
