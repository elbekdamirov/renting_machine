const { sendErrorResponse } = require("../helpers/send_error_response");
const Contract = require("../models/contract.model");
const Payment = require("../models/payment.model");

const create = async (req, res) => {
  try {
    const { contractId, payment_date, payment_status, amount, status } =
      req.body;

    const newData = await Payment.create({
      contractId,
      payment_date,
      payment_status,
      amount,
      status,
    });
    res.status(201).send({ message: "New Payment Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Payment.findAll({
      include: [
        {
          model: Contract,
          attributes: ["total_price", "total_time"],
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
    const data = await Payment.findByPk(id, {
      include: [
        {
          model: Contract,
          attributes: ["total_price", "total_time"],
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
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    await payment.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: payment });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    await payment.destroy();
    res.status(200).send({ message: "Payment deleted successfully" });
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
