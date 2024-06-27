require('dotenv').config({ path: `${process.cwd()}/ems_app.env`});

const Sequelize = require('sequelize');
const config = require('./Config');
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);



module.exports = sequelize;