const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await Commission.create({ name });
    res.status(201).send({ message: "New Commission Added", newData });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Commission.findAll({});
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Commission.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }

    await commission.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: commission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const commission = await Commission.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Commission not found" });
    }

    await commission.destroy();
    res.status(200).send({ message: "Commission deleted successfully" });
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
