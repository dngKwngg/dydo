const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const addNewRestaurant = require("../controllers/restaurantController");
const authController = require("../controllers/authController");

router.use(authController.authenticateToken);
router.post("/addNewRestaurant", restaurantController.addNewRestaurant);
router.get("/closeRestaurant", restaurantController.closeRestaurant);
module.exports = router;