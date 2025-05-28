const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await District.create({ name });
    res.status(201).send({ message: "New District Added", newData });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await District.findAll({});
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await District.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }

    await district.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).send({ message: "District not found" });
    }

    await district.destroy();
    res.status(200).send({ message: "District deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
