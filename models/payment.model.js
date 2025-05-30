const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contract = require("./contract.model");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    payment_status: {
      type: DataTypes.STRING(15),
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.STRING(15),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Contract.hasOne(Payment);
Payment.belongsTo(Contract);

module.exports = Payment;
