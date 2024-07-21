const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/updatePrice", orderController.updatePrice);

module.exports = router;
