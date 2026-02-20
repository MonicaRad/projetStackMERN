import orderService from "../service/order.service.js";
import ApiResponse from "../utils/apiResponse.js";

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    return ApiResponse.success(res, order, "Order created");
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    return ApiResponse.success(res, orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return next(new Error("Order not found"));
    }

    return ApiResponse.success(res, order);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);

    if (!order) {
      return next(new Error("Order not found"));
    }

    return ApiResponse.success(res, null, "Order deleted");
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
};
