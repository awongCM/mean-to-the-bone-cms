const UserService = require("../services/user.service");

exports.getUsers = async function(req, res, next) {
  try {
    const users = await UserService.getUsers();
    return res
      .status(200)
      .json({ data: users, message: "Successfully fetched users" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getUser = async function(req, res, next) {
  try {
    const user = await UserService.getUser(req.params.id);
    return res
      .status(200)
      .json({ data: user, message: "Successfully fetched user" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.insertUser = async function(req, res, next) {
  try {
    const insertedUser = await UserService.createUser({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin
    });
    return res
      .status(200)
      .json({ data: insertedUser, message: "Successfully created user" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removeUser = async function(req, res, next) {
  try {
    await UserService.deleteUser(req.params.id);
    return res.status(200).json({ message: "Successfully deleted user" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  try {
    const updatedUser = await UserService.updateUser({
      id: req.body._id,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin
    });
    return res
      .status(200)
      .json({ data: updatedUser, message: "Successfully updated user" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
