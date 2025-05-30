const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");
const Users = require("./users.model");
const Status = require("./status.model");
const Commission = require("./commission.model");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    date: {
      type: DataTypes.DATE,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    total_time: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Machine.hasMany(Contract);
Contract.belongsTo(Machine);

Users.hasMany(Contract);
Contract.belongsTo(Users);

Status.hasMany(Contract);
Contract.belongsTo(Status);

Commission.hasOne(Contract);
Contract.belongsTo(Commission);

module.exports = Contract;
