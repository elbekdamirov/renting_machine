const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");

const UserAddress = sequelize.define(
  "user_address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.hasMany(UserAddress);
UserAddress.belongsTo(Users);

module.exports = UserAddress;
