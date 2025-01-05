import express from "express";
import orderController from "../controllers/orderController.js";
import authController from "../controllers/authController.js";
const router = express.Router();


// Protected routes (with authentication)
router.post(
	"/create",
	authController.authenticateToken,
	orderController.createOrder
);
router.post(
	"/createCashOrder",
	authController.authenticateToken,
	orderController.createCashOrder
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

export default router;