const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/users.address");
const Users = require("../models/users.model");

const create = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await Users.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas" },
        res,
        400
      );
    }

    const newData = await UserAddress.create({
      name,
      address,
      userId,
    });
    res.status(201).send({ message: "New UserAddress Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await UserAddress.findAll({
      //   include: Users,
      include: [
        {
          model: Users,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name", "address"],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await UserAddress.findByPk(id);
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
