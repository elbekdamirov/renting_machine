const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");

const UserLocation = sequelize.define(
  "user_location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    address: {
      type: DataTypes.STRING(30),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Users.hasMany(UserLocation);
UserLocation.belongsTo(Users);

module.exports = UserLocation;
