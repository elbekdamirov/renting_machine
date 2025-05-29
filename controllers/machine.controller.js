const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const Machine = require("../models/machine.model");
const Users = require("../models/users.model");
const Region = require("../models/region.model");
const District = require("../models/district.model");

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

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
