const connection = require("../config/connection");

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
	const { centre_id } = req.user;
	const { table_id, items } = req.body;
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

		if (orders.length === 0 || isAvailableTable(orders)) {
			await queryDatabase(
				`INSERT INTO orders (orders_id, table_id, centre_id)
					SELECT COALESCE(MAX(orders_id), 0) + 1, ?, ?
					FROM orders`,
				[table_id, centre_id]
			);
		}

		// Tạo mảng chứa các trường tương đương 1 hàng trong orders_items
		const itemPrices = await Promise.all(
			items.map(async (item) => {
				const price = await getPrice(item.item_id);
				return [
					centre_id,
					table_id,
					item.item_id,
					item.quantity,
					price,
				];
			})
		);
		// Tạo các bản ghi trong orders_items
		await queryDatabase(
			`INSERT INTO order_item (centre_id, table_id, item_id, quantity, price_item)
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
	console.log('req', req);
	console.log('req.user', req.user);
	const {centre_id} = req.user;
	try {
		const result = await queryDatabase(`SELECT * FROM orders WHERE centre_id = ?`, [centre_id]);
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
