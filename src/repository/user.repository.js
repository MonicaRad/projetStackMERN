import User from "../model/User.js";

const createUser = (data) => {
  return User.create(data);
};

const getAllUsers = () => {
  return User.find();
};

const getUserById = (id) => {
  return User.findById(id);
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
