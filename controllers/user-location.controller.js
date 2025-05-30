const { sendErrorResponse } = require("../helpers/send_error_response");
const UserLocation = require("../models/user-location.model");
const Users = require("../models/users.model");

const create = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const newData = await UserLocation.create({
      name,
      address,
      userId,
    });
    res.status(201).send({ message: "New UserLocation Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await UserLocation.findAll({
      include: [
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
    const data = await UserLocation.findByPk(id, {
      include: [
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
    const userLocation = await UserLocation.findByPk(id);
    if (!userLocation) {
      return res.status(404).send({ message: "UserLocation not found" });
    }

    await userLocation.update(updateData);
    res
      .status(200)
      .send({ message: "Updated successfully", data: userLocation });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const userLocation = await UserLocation.findByPk(id);
    if (!userLocation) {
      return res.status(404).send({ message: "UserLocation not found" });
    }

    await userLocation.destroy();
    res.status(200).send({ message: "UserLocation deleted successfully" });
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
