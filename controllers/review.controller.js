const { sendErrorResponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");
const Review = require("../models/review.model");
const Users = require("../models/users.model");

const create = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;

    const newData = await Review.create({ rating, comment, machineId, userId });
    res.status(201).send({ message: "New Review Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Review.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
        {
          model: Users,
          attributes: ["full_name", "email"],
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
    const data = await Review.findByPk(id, {
      include: [
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
        {
          model: Users,
          attributes: ["full_name", "email"],
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
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }

    await review.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: review });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }

    await review.destroy();
    res.status(200).send({ message: "Review deleted successfully" });
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
