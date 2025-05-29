const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const Machine = require("../models/machine.model");

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newData = await Category.create({ name });
    res.status(201).send({ message: "New Category Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Category.findAll({
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
    const data = await Category.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: category });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.destroy();
    res.status(200).send({ message: "Category deleted successfully" });
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
