import express from "express";

import authController from "../controllers/authController.js";

const router = express.Router();
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.verifyOtpAndResetPassword);

export default router;