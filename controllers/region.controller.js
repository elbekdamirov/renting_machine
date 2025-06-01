const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await Region.create({ name });
    res.status(201).send({ message: "New Region Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Region.findAll({
      include: [
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
      ],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Region.findByPk(id, {
      include: [
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
      ],
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
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }

    await region.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: region });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }

    await region.destroy();
    res.status(200).send({ message: "Region deleted successfully" });
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