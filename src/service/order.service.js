import orderRepository from "../repository/order.repository.js";
import User from "../models/User.js";

const createOrder = async (data) => {
  const { name, surname, mail, number, address, items } = data;

  if (!name || !surname || !mail || !number || !address) {
    throw new Error("User information is required");
  }

  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one movie");
  }

  // Vérifier si utilisateur existe
  let user = await User.findOne({ mail });

  if (!user) {
    user = await User.create({
      name,
      surname,
      mail,
      number,
      address,
    });
  }

  const orderData = {
    user: user._id,
    items,
  };

  return await orderRepository.create(orderData);
};

const getAllOrders = async () => {
  return await orderRepository.findAll();
};

const getOrderById = async (id) => {
  return await orderRepository.findById(id);
};

const deleteOrder = async (id) => {
  return await orderRepository.deleteById(id);
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};
