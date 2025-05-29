const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Image = require("../models/image.model");

const create = async (req, res) => {
  try {
    const { image_url, machineId } = req.body;

    const newData = await Image.create({ image_url, machineId });
    res.status(201).send({ message: "New Image Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Image.findAll({
      include: [
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
    const data = await Image.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }

    await image.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: image });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }

    await image.destroy();
    res.status(200).send({ message: "Image deleted successfully" });
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
