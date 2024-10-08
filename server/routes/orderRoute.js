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

router.get(
	"/getRevenueByMonthForAdmin",
	authController.authenticateToken,
	orderController.getRevenueByMonthForAdmin
);
router.get(
	"/getAllRevenueByMonthForAdmin",
	authController.authenticateToken,
	orderController.getAllRevenueByMonthForAdmin
);
router.get(
	"/getRevenueByDateForAdmin",
	authController.authenticateToken,
	orderController.getRevenueByDateForAdmin
);
router.get(
	"/getAllRevenueByDateForAdmin",
	authController.authenticateToken,
	orderController.getAllRevenueByDateForAdmin
);
router.get(
	"/getRevenueByYearForAdmin",
	authController.authenticateToken,
	orderController.getRevenueByYearForAdmin
);
router.get(
	"/getAllRevenueByYearForAdmin",
	authController.authenticateToken,
	orderController.getAllRevenueByYearForAdmin
);
router.get(
	"/getRevenueByMonthForStaff",
	authController.authenticateToken,
	orderController.getRevenueByMonthForStaff
);
router.get(
	"/getRevenueByYearForStaff",
	authController.authenticateToken,
	orderController.getRevenueByYearForStaff
);
router.get(
	"/getRevenueByDateForStaff",
	authController.authenticateToken,
	orderController.getRevenueByDateForStaff
);
module.exports = router;
