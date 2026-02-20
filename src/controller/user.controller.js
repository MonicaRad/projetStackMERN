import userService from "../service/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return ApiResponse.success(res, user, "User created");
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return ApiResponse.success(res, users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return next(new Error("User not found"));
    }

    return ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (!user) {
      return next(new Error("User not found"));
    }

    return ApiResponse.success(res, user, "User updated");
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
