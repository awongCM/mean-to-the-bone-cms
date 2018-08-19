const UserService = require("../services/user.service");

const _this = this;

exports.getUsers = async function(req, res, next) {
  try {
    const users = await UserService.getUsers();

    return res
      .status(200)
      .json({ data: users, message: "Successfully fetched User" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getUser = async function(req, res, next) {
  try {
    const user_id = req.query.id;

    const user = await UserService.getUser(user_id);

    return res
      .status(200)
      .json({ data: user, message: "Successfully fetched User" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.insertUser = async function(req, res, next) {
  const newUser = {
    title: req.body.title,
    content: req.body.content
  };

  try {
    const insertedUser = await UserService.insertUser(newUser);
    return res
      .status(200)
      .json({ data: insertedUser, message: "Successfully inserted User" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.removeUser = async function(req, res, next) {
  const id = req.params.id;

  try {
    const deletedPage = await UserService.deleteUser(id);
    return res.status(200).json({ message: "Successfully deleted User" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.updateUser = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  const id = req.body._id;

  console.log(req.body);

  const user = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  try {
    const updatedPage = await UserService.updateUser(user);
    return res
      .status(200)
      .json({ data: updatedPage, message: "Successfully Updated User" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};
