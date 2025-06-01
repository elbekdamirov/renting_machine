const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const Machine = require("../models/machine.model");
const Users = require("../models/users.model");
const Region = require("../models/region.model");
const District = require("../models/district.model");
const { Op } = require("sequelize");
const Image = require("../models/image.model");
const Sequelize = require("../config/db");
const sequelize = require("sequelize");

const create = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    } = req.body;

    const newData = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    });
    res.status(201).send({ message: "New Machine Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Machine.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Users,
          attributes: ["full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: Image,
        },
      ],
      attributes: {
        exclude: ["categoryId", "userId", "regionId", "districtId"],
      },
    });
    res.status(200).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Machine.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Users,
          attributes: ["full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
      ],
      attributes: {
        exclude: ["categoryId", "userId", "regionId", "districtId"],
      },
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send({ message: "Machine not found" });
    }

    await machine.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: machine });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send({ message: "Machine not found" });
    }

    await machine.destroy();
    res.status(200).send({ message: "Machine deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

//--------------------- Homework -----------------------------//
const selectByRegion = async (req, res) => {
  try {
    const { region, district } = req.body;

    const data = await Machine.findAll({
      include: [
        {
          model: Region,
          where: {
            name: { [Op.like]: `%${region}%` },
          },
        },
        {
          model: District,
          where: {
            name: { [Op.like]: `%${district}%` },
          },
        },
      ],
    });

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const selectByImageCount = async (req, res) => {
  const { imageCount } = req.body;

  try {
    const [results, metadata] = await Sequelize.query(
      `
      SELECT
        "machine"."id",
        "machine"."name",
        COUNT("image"."id") AS "imageCount"
      FROM "machine"
      LEFT JOIN "image" ON "image"."machineId" = "machine"."id"
      GROUP BY "machine"."id", "machine"."name"
      HAVING COUNT("image"."id") >= :imageCount
      `,
      {
        replacements: { imageCount },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).send({ data: results });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

//--------------------- Homework -----------------------//

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  selectByRegion,
  selectByImageCount,
};
