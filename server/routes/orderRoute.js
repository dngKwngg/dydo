const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.use(authController.authenticateToken);
router.post("/create", orderController.createOrder);

module.exports = router;
