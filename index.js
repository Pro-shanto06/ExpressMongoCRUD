const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is an ExpressJs project named “ExpressMongoCRUD”');
});

app.use('/users', userRoutes);

module.exports = app;
