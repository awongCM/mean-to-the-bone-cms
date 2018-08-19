const User = require("../models/user");

const _this = this;

exports.getUsers = async function() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw Error("Error when fetching Users ");
  }
};

exports.getUser = async function(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw Error("Error when fetcing User by id: ");
  }
};

exports.createUser = async function(user) {
  const newUser = new User({
    title: user.title,
    content: user.content
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw Error("Error when saving User");
  }
};

exports.deleteUser = async function(id) {
  try {
    const deletedUser = await User.remove({ _id: id });
    if (deletedUser.result.n === 0) {
      throw Error("User could not be deleted");
    }
    return deletedUser;
  } catch (error) {
    throw Error("Error when deleting User");
  }
};

exports.updateUser = async function(user) {
  const current_id = user.id;

  try {
    const currentUser = await newUser.findById(current_id);
  } catch (error) {
    throw Error("Error when finding User");
  }

  if (!currentUser) {
    return false;
  }

  console.log(currentUser);

  currentUser.title = user.title;
  currentUser.content = user.content;

  console.log(currentUser);

  try {
    const savedUser = await currentUser.save();
    return savedUser;
  } catch (error) {
    throw Error("Error when updating user");
  }
};
