const { Sequelize } = require('sequelize');
require('dotenv').config();

const userModel = require("../models/user");
const orderModel = require("../models/order");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB_NAME,
  process.env.POSTGRES_DB_USER,
  process.env.POSTGRES_DB_PASS,
  {
    host: process.env.POSTGRES_HOST_NAME,
    port: process.env.POSTGRES_DB_PORT, // make sure your .env has 5432 here
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);


const User = userModel(sequelize);
const Order = orderModel(sequelize);


User.hasMany(Order);
Order.belongsTo(User);


const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connected successfully!');

    await sequelize.sync(); 
    console.log(" Tables synced successfully");
  } catch (error) {
    console.error(' Unable to connect to PostgreSQL:', error);
  }
};

module.exports = { sequelize, connectPostgres, User, Order };
