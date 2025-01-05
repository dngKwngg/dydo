import express from "express";

import restaurantController from "../controllers/restaurantController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.use(authController.authenticateToken);
router.post("/addNewRestaurant", restaurantController.addNewRestaurant);
router.post("/editRestaurant", restaurantController.editRestaurant);
router.get("/getAllRestaurant", restaurantController.getAllRestaurant);
router.get("/getRestaurant", restaurantController.getRestaurant);

export default router;