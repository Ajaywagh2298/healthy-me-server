'use strict';
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const chalk = require('chalk')
const env = process.env.HOST_ENV || 'development';  // Default to development if not set

require('dotenv').config();

// Load the correct database config based on the environment
const hostConfig = require('../config/envConfig').dbConfig[env];

let sequelize;

// Check if environment variable for Sequelize is used or manual config
if (process.env[hostConfig.use_env_variable]) {
  sequelize = new Sequelize(process.env[hostConfig.use_env_variable], hostConfig);
} else {
  sequelize = new Sequelize(hostConfig.database, hostConfig.username, hostConfig.password, hostConfig);
}

let DBTables = {};

// Load all models
const Organization = require(path.join(__dirname, '../models/master/Organization'))(sequelize, Sequelize.DataTypes);
DBTables.Organization = Organization;

const User = require(path.join(__dirname, '../models/master/User'))(sequelize, Sequelize.DataTypes);
DBTables.User = User;

const LoginSession = require(path.join(__dirname, '../models/master/LoginSession'))(sequelize, Sequelize.DataTypes);
DBTables.LoginSession = LoginSession;

const Patient = require(path.join(__dirname, '../models/master/Patient'))(sequelize, Sequelize.DataTypes);
DBTables.Patient = Patient;

// If there are associations, ensure they're applied
Object.keys(DBTables).forEach((modelName) => {
  if (DBTables[modelName].associate) {
    DBTables[modelName].associate(DBTables);
  }
});

DBTables.sequelize = sequelize;

// Function to start the database migration/sync process
function serverDB() {
  sequelize.sync()
    .then(() => {
      console.log(chalk.green('Migration run successfully completed!'));
    })
    .catch((err) => {
        console.log(err)
      console.error(chalk.red("Migration failed. Database server restart in 5 minutes..."));
      setTimeout(serverDB, 300000); // Retry after 5 minutes
    });
}

// Start the migration/sync process
serverDB();

module.exports = DBTables;
