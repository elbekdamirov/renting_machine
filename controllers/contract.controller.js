const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");
const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const Status = require("../models/status.model");
const Users = require("../models/users.model");

const create = async (req, res) => {
  try {
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    } = req.body;

    const newData = await Contract.create({
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    });
    res.status(201).send({ message: "New Contract Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Contract.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
        {
          model: Users,
          attributes: ["full_name", "email"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
        {
          model: Commission,
          attributes: ["percent"],
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
    const data = await Contract.findByPk(id, {
      include: [
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
        {
          model: Users,
          attributes: ["full_name", "email"],
        },
        {
          model: Status,
          attributes: ["name"],
        },
        {
          model: Commission,
          attributes: ["percent"],
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
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ message: "Contract not found" });
    }

    await contract.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: contract });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ message: "Contract not found" });
    }

    await contract.destroy();
    res.status(200).send({ message: "Contract deleted successfully" });
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
