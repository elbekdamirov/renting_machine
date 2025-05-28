const { sendErrorResponse } = require("../helpers/send_error_response");
const Status = require("../models/status.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await Status.create({ name });
    res.status(201).send({ message: "New Status Added", newData });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Status.findAll({});
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Status.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    await status.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    await status.destroy();
    res.status(200).send({ message: "Status deleted successfully" });
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
