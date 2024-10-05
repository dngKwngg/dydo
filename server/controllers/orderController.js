const connection = require("../config/connection");
const payOS = require("../utils/payos");

//Tạo một order
//done
// http://localhost:8080/order/create
// {
//   "table_id": 1,
//   "items": [
//     {"item_id": 101, "quantity": 2},
//     {"item_id": 102, "quantity": 1}
//   ]
// }

async function queryDatabase(query, params) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, result, fields) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}
// kiểm tra xem table_id tại centre_id có phải là một bàn đang trống hay không
function isAvailableTable(result) {
	for (let i of result) {
		if (i.active === 1) return false;
	}
	return true;
}
async function getPrice(item_id) {
	const result = await queryDatabase(
		"SELECT price FROM menu WHERE item_id = ?",
		[item_id]
	);
	if (result.length === 0) {
		throw new Error("No menu item found");
	}
	return result[0].price;
}
exports.createOrder = async (req, res) => {
	console.log(req.body);
	const { centre_id } = req.user;
	const { order_code, table_id, items, total } = req.body;
	//Kiem tra  table_id co phai dang so nguyen hay khong
	if (!Number.isInteger(table_id) || table_id <= 0) {
		return res.status(400).json({
			status: "Failed",
			message: "Table ID must be an integer greater than 0",
		});
	}

	try {
		// kiem tra centre_if co hop le khong
		const centres = await queryDatabase(
			`SELECT * FROM restaurant_centre WHERE centre_id = ?`,
			[centre_id]
		);
		if (centres.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No restaurant_centre found",
			});
		}
		const table_quantity = centres[0].quantity_table;
		if (table_id > table_quantity) {
			return res.status(400).json({
				status: "Failed",
				message: "Table ID is invalid",
			});
		}
		// tìm thấy bản ghi phù hợp
		// tạo bản ghi bảng orders
		const orders = await queryDatabase(
			`SELECT * FROM orders WHERE table_id = ? AND centre_id = ?`,
			[table_id, centre_id]
		);

		await queryDatabase(
			`INSERT INTO orders (orders_id, order_code, table_id, centre_id, total_cost)
					SELECT COALESCE(MAX(orders_id), 0) + 1, ?, ?, ?, ?
					FROM orders`,
			[order_code, table_id, centre_id, total]
		);

		// Tạo mảng chứa các trường tương đương 1 hàng trong orders_items
		const itemPrices = await Promise.all(
			items.map(async (item) => {
				const price = await getPrice(item.item_id);
				// Fetch the max orders_id from the orders table
				const [orderIdResult] = await queryDatabase(
					`SELECT COALESCE(MAX(orders_id), 0) as maxOrderId FROM orders`
				);
				const orders_id = orderIdResult.maxOrderId;

				return [
					orders_id,
					centre_id,
					table_id,
					item.item_id,
					item.quantity,
					price,
				];
			})
		);

		// Insert into order_item table
		await queryDatabase(
			`INSERT INTO order_item (orders_id, centre_id, table_id, item_id, quantity, price_item)
	VALUES ?`,
			[itemPrices]
		);

		return res.status(200).json({
			status: "Success",
			message: "Done add",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};

// lấy ra lịch sử đơn hàng theo centre_id
// http://localhost:8080/order/getOrderHistory
exports.getOrderHistory = async (req, res) => {
	console.log("req", req);
	console.log("req.user", req.user);
	const { centre_id } = req.user;
	try {
		const result = await queryDatabase(
			`SELECT * FROM orders WHERE centre_id = ?`,
			[centre_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No order found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};

// lấy ra chi tiết đơn hàng của 1 bàn
// http://localhost:8080/order/getOrderDetail
exports.getOrderDetail = async (req, res) => {
	const { orders_id } = req.body;
	try {
		const result = await queryDatabase(
			`SELECT *
				FROM order_item oi
				inner join menu m on oi.item_id = m.item_id
 				WHERE orders_id = ? `,
			[orders_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No order found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
// lấy ra tất cả lịch sử đơn hàng
// http://localhost:8080/order/getAllOrderHistory
exports.getAllOrderHistory = async (req, res) => {
	try {
		const result = await queryDatabase(`SELECT * FROM orders `);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No order found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};

// Add payOs to order

exports.createPayOsOrder = async (req, res) => {
	const { description, returnUrl, cancelUrl, amount } = req.body;
	const body = {
		orderCode: Number(String(new Date().getTime()).slice(-6)),
		amount,
		description,
		cancelUrl,
		returnUrl,
	};

	try {
		const paymentLinkRes = await payOS.createPaymentLink(body);

		return res.json({
			error: 0,
			message: "Success",
			data: {
				bin: paymentLinkRes.bin,
				checkoutUrl: paymentLinkRes.checkoutUrl,
				accountNumber: paymentLinkRes.accountNumber,
				accountName: paymentLinkRes.accountName,
				amount: paymentLinkRes.amount,
				description: paymentLinkRes.description,
				orderCode: paymentLinkRes.orderCode,
				qrCode: paymentLinkRes.qrCode,
			},
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: -1,
			message: "fail",
			data: null,
		});
	}
};

exports.getPayOsOrderInfo = async (req, res) => {
	try {
		const order = await payOS.getPaymentLinkInformation(req.params.orderId);
		if (!order) {
			return res.json({
				error: -1,
				message: "failed",
				data: null,
			});
		}
		return res.json({
			error: 0,
			message: "ok",
			data: order,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: -1,
			message: "failed",
			data: null,
		});
	}
};

exports.cancelPayOsOrder = async (req, res) => {
	try {
		const { orderId } = req.params;
		const body = req.body;
		const order = await payOS.cancelPaymentLink(
			orderId,
			body.cancellationReason
		);
		if (!order) {
			return res.json({
				error: -1,
				message: "failed",
				data: null,
			});
		}
		return res.json({
			error: 0,
			message: "ok",
			data: order,
		});
	} catch (error) {
		console.error(error);
		return res.json({
			error: -1,
			message: "failed",
			data: null,
		});
	}
};

exports.confirmPayOsWebhook = async (req, res) => {
	const { webhookUrl } = req.body;
	try {
		await payOS.confirmWebhook(webhookUrl);
		return res.json({
			error: 0,
			message: "ok",
			data: null,
		});
	} catch (error) {
		console.error(error);
		return res.json({
			error: -1,
			message: "failed",
			data: null,
		});
	}
};
//ox-peaceful-rightly.ngrok-free.app
https: exports.receiveWebhook = async (req, res) => {
	console.log("Webhook data: ", req.body);
	const orderCode = req.body.data.orderCode;

	// Update the order status in the database
	await queryDatabase(
		// update status to paid in order table if order_code equal to orderCode
		`UPDATE orders SET status = 'PAID' WHERE order_code = ?`,
		[orderCode]
	);
	return res.json({
		error: 0,
		message: "ok",
		data: req.body,
	});
};

exports.updateFailedOrderStatus = async (req, res) => {
	const { orderCode, status } = req.body;

	try {
		// Update the order status in the database
		await queryDatabase(
			`UPDATE orders SET status = ? WHERE order_code = ?`,
			[status, orderCode]
		);

		return res.json({
			error: 0,
			message: "Order status updated successfully",
		});
	} catch (error) {
		console.error("Error updating order status:", error);
		return res.status(500).json({
			error: 1,
			message: "Failed to update order status",
		});
	}
};

//done - admin
// lấy ra doanh thu của các centre_id tháng này
// http://localhost:8080/order/getRevenueByMonthForAdmin
exports.getRevenueByMonthForAdmin = async (req, res) => {
	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                    YEAR(date_order) as year, 
                    MONTH(date_order) as month, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE status = 'PAID' 
			 	AND MONTH(date_order) = MONTH(CURRENT_DATE()) 
			 	AND YEAR(date_order) = YEAR(CURRENT_DATE())
             GROUP BY centre_id, year, month
             ORDER BY centre_id ASC`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - admin
//lấy ra tổng doanh thu theo tháng và năm (all centre)
// http://localhost:8080/order/getAllRevenueByMonthForAdmin
exports.getAllRevenueByMonthForAdmin = async (req, res) => {
	try {
		const result = await queryDatabase(
			`SELECT 
					CONCAT(MONTH(date_order), '-', YEAR(date_order)) as month_year,
					YEAR(date_order) as year, 
					MONTH(date_order) as month, 
					SUM(total_cost) as revenue
			 FROM orders 
			 WHERE status = 'PAID'
			 GROUP BY year, month
			 ORDER BY year DESC, month DESC
			 LIMIT 10`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		const reversedResult = result.reverse();
		return res.status(200).json({
			status: "Success",
			data: reversedResult,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - admin
// lấy ra doanh thu của các centre_id theo hôm nay
// http://localhost:8080/order/getRevenueByDateForAdmin
exports.getRevenueByDateForAdmin = async (req, res) => {

	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                     DATE_FORMAT(date_order, '%Y-%m-%d') as order_day, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE status = 'PAID' AND DATE(date_order) = DATE(CURRENT_DATE())
             GROUP BY centre_id, order_day
             ORDER BY centre_id ASC`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - admin
// lấy ra tổng doanh thu theo ngày tháng năm (all centre)
// http://localhost:8080/order/getAllRevenueByDateForAdmin
exports.getAllRevenueByDateForAdmin = async (req, res) => {
	try {
		const result = await queryDatabase(
			//sử dụng date format để lấy ngày tháng năm mà không bị ảnh hưởng bới múi giờ
			`SELECT 
				DATE_FORMAT(date_order, '%d-%m-%Y') as order_day,
				SUM(total_cost) as revenue
			FROM orders 
			WHERE status = 'PAID'
			GROUP BY order_day
			ORDER BY MAX(date_order) DESC
			LIMIT 10;
			`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result.reverse(),
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - admin
// lấy ra doanh thu theo centre_id năm nay
// http://localhost:8080/order/getRevenueByYearForAdmin
exports.getRevenueByYearForAdmin = async (req, res) => {
	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                    YEAR(date_order) as year, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE status = 'PAID' AND YEAR(date_order) = YEAR(CURRENT_DATE())
             GROUP BY centre_id, year
             ORDER BY centre_id ASC`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - admin
//lấy ra tổng doanh thu theo năm (all centre)
// http://localhost:8080/order/getAllRevenueByYearForAdmin
exports.getAllRevenueByYearForAdmin = async (req, res) => {
	try {
		const result = await queryDatabase(
			`SELECT 
			YEAR(date_order) as year, 
					SUM(total_cost) as revenue
			 FROM orders 
			 WHERE status = 'PAID'
			 GROUP BY year
			 ORDER BY year ASC
			 LIMIT 10`
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - staff
// lấy ra doanh thu của centre staff đang làm việc theo tháng và năm
// http://localhost:8080/order/getRevenueByMonthForStaff
exports.getRevenueByMonthForStaff = async (req, res) => {
	const { centre_id } = req.user;
	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                    YEAR(date_order) as year, 
                    MONTH(date_order) as month, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE centre_id = ? and status = 'PAID'
             GROUP BY centre_id, year, month
             ORDER BY year DESC, month DESC`,
			[centre_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - staff
// lấy ra doanh thu của centre mà staff đang làm việc theo năm
// http://localhost:8080/order/getRevenueByYearForStaff
exports.getRevenueByYearForStaff = async (req, res) => {
	const { centre_id } = req.user;
	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                    YEAR(date_order) as year, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE centre_id = ? and status = 'PAID'
             GROUP BY centre_id, year
             ORDER BY year DESC`,
			[centre_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
//done - staff
// lấy ra doanh thu của centre mà staff đang làm việc theo ngày tháng năm
// http://localhost:8080/order/getRevenueByDateForStaff
exports.getRevenueByDateForStaff = async (req, res) => {
	const { centre_id } = req.user;
	try {
		const result = await queryDatabase(
			`SELECT centre_id, 
                     DATE_FORMAT(date_order, '%Y-%m-%d') as order_day, 
                    SUM(total_cost) as revenue
             FROM orders 
             WHERE centre_id = ? and status = 'PAID'
             GROUP BY centre_id, order_day
             ORDER BY order_day DESC`,
			[centre_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No revenue found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err.message,
		});
	}
};
