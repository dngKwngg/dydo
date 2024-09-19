const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const addNewRestaurant = require("../controllers/restaurantController");
const authController = require("../controllers/authController");

router.use(authController.authenticateToken);
router.post("/addNewRestaurant", restaurantController.addNewRestaurant);
router.post("/editRestaurant", restaurantController.editRestaurant);
router.get("/getAllRestaurant", restaurantController.getAllRestaurant);
module.exports = router;