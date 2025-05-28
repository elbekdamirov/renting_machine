const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Commission = sequelize.define(
  "commission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 15.0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Commission;
