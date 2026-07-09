const User = require("../models/user");

exports.getUsers = async function() {
  return User.find({}).sort({ created_at: -1 });
};

exports.getUser = async function(id) {
  return User.findById(id);
};

exports.createUser = async function(user) {
  const newUser = new User({
    name: user.name,
    username: user.username,
    password: user.password,
    admin: user.admin || false
  });
  return newUser.save();
};

exports.deleteUser = async function(id) {
  const deletedUser = await User.remove({ _id: id });
  if (deletedUser.result.n === 0) {
    throw new Error("User could not be deleted");
  }
  return deletedUser;
};

exports.updateUser = async function(user) {
  const currentUser = await User.findById(user.id);
  if (!currentUser) {
    return false;
  }

  if (user.name !== undefined) {
    currentUser.name = user.name;
  }
  if (user.username !== undefined) {
    currentUser.username = user.username;
  }
  if (user.password !== undefined) {
    currentUser.password = user.password;
  }
  if (user.admin !== undefined) {
    currentUser.admin = user.admin;
  }

  return currentUser.save();
};
