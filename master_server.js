// server.js
const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');

require('dotenv').config();
const env = process.env.HOST_ENV; 
const config = require('./config/envConfig').serverConfig[env];

const app = express();

// Middleware
app.use(bodyParser.json());
// Root route

app.get('/', (req, res) => {
    res.status(200).send('Hey this is my API running 🥳');
});

const port = config.host_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.HOST_ENV } mode`);
});
