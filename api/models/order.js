// models/order.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    items: {
      type: DataTypes.JSONB, // or STRING if you’re storing it as plain text
      allowNull: false,
    },
    
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Order;
};
