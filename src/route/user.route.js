import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);

export default router;
