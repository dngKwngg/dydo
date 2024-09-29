const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

// Protected routes (with authentication)
router.post(
	"/create",
	authController.authenticateToken,
	orderController.createOrder
);
router.get(
	"/getOrderHistory",
	authController.authenticateToken,
	orderController.getOrderHistory
);
router.post(
	"/getOrderDetail",
	authController.authenticateToken,
	orderController.getOrderDetail
);
router.get(
	"/getAllOrderHistory",
	authController.authenticateToken,
	orderController.getAllOrderHistory
);
router.post(
	"/createPayOs",
	authController.authenticateToken,
	orderController.createPayOsOrder
);
router.get(
	"/getPayOsOrder/:orderId",
	authController.authenticateToken,
	orderController.getPayOsOrderInfo
);
router.put(
	"/cancelPayOsOrder/:orderId",
	authController.authenticateToken,
	orderController.cancelPayOsOrder
);
router.post(
	"/confirmPayOsWebhookData",
	authController.authenticateToken,
	orderController.confirmPayOsWebhook
);

// Unprotected route (no authentication for receiveHook)
router.post("/receiveHook", orderController.receiveWebhook);
router.post("/updateFailedStatus", orderController.updateFailedOrderStatus);


router.post("/getRevenueByMonth", authController.authenticateToken, orderController.getRevenueByMonth);
router.get("/getAllRevenueByMonth", authController.authenticateToken, orderController.getAllRevenueByMonth);
router.post("/getRevenueByDate", authController.authenticateToken, orderController.getRevenueByDate);
router.get("/getAllRevenueByDate", authController.authenticateToken, orderController.getAllRevenueByDate);
router.post("/getRevenueByYear", authController.authenticateToken, orderController.getRevenueByYear);
router.get("/getAllRevenueByYear", authController.authenticateToken, orderController.getAllRevenueByYear);
module.exports = router;
