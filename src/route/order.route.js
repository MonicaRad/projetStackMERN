import express from "express";
import orderController from "../controller/order.controller.js";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.delete("/:id", orderController.deleteOrder);

export default router;
