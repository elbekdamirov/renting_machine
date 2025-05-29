const { sendErrorResponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");
const UserAddress = require("../models/users.address");
const Users = require("../models/users.model");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday user mavjud" }, res, 400);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newData = await Users.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "New User Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Users.findAll({
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
        {
          model: Machine,
          attributes: ["name", "is_available"],
        },
      ],
      attributes: ["full_name", "phone"],
    });
    res.status(200).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Users.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: user });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully" });
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
