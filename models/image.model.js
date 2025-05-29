const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Region = require("./region.model");
const Machine = require("./machine.model");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(150),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Machine.hasMany(Image);
Image.belongsTo(Machine);

module.exports = Image;
