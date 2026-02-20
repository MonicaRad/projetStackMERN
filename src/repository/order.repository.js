import Order from "../model/Order.js";

const create = async (data) => {
  return await Order.create(data);
};

const findAll = async () => {
  return await Order.find().populate("user").populate("items.movie");
};

const findById = async (id) => {
  return await Order.findById(id).populate("user").populate("items.movie");
};

const deleteById = async (id) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  findById,
  deleteById,
};
