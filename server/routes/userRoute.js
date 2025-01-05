import express from "express";

import userController from "../controllers/userController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.authenticateToken);
router.post("/addUser", userController.addUser);
router.post("/deleteUser", userController.deleteUser);
router.get("/getAllUsers", userController.getAllUsers);

export default router;