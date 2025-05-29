const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Category = require("./category.model");
const Users = require("./users.model");
const Region = require("./region.model");
const District = require("./district.model");

const Machine = sequelize.define(
  "machine",
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
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.TEXT,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    min_hour: {
      type: DataTypes.STRING,
    },
    min_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Category.hasMany(Machine);
Machine.belongsTo(Category);

Users.hasMany(Machine);
Machine.belongsTo(Users);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

module.exports = Machine;
