const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Users = require("../models/users.model");
const Role = require("./role.model");

const UserRole = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Users.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(Users, { through: UserRole });

UserRole.belongsTo(Users);
UserRole.belongsTo(Role);

module.exports = UserRole;
