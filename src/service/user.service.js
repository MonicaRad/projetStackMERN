import userRepository from "../repository/user.repository.js";

const createUser = async (data) => {
  if (!name || !surname || !mail || !number || !address) {
    throw new Error("Name, surname, mail, number and address are required");
  }

  return await userRepository.createUser(data);
};

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const getUserById = async (id) => {
  return await userRepository.getUserById(id);
};

const updateUser = async (id, data) => {
  return await userRepository.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
