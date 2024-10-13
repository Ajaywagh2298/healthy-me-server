// server.js
const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');
const route = require('./auth-service/routerClient')
require('dotenv').config();
const env = process.env.HOST_ENV; 
const config = require('./config/envConfig').serverConfig[env];
const logger = require('./utils/logsUtils')

const app = express();

// Middleware
app.use(bodyParser.json());
// Root route

route.routerService(app);

const port = config.host_PORT;
app.listen(port, () => {
    logger.serverLogs(port,env);
});
