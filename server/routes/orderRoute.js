const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.use(authController.authenticateToken);
router.post("/create", orderController.createOrder);
router.get("/getOrderHistory", orderController.getOrderHistory);
router.post("/getOrderDetail", orderController.getOrderDetail);
router.get("/getAllOrderHistory", orderController.getAllOrderHistory);
module.exports = router;
