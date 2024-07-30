const connection = require("../config/connection");

//Tạo một order
//done

// {
//   "table_id": 1,
//   "centre_id": 1,
//   "items": [
//     {"item_id": 101, "quantity": 2},
//     {"item_id": 102, "quantity": 1}
//   ]
// }
// kiểm tra xem table_id tại centre_id có phải là một bàn đang trống hay không

async function queryDatabase(query, params) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, result, fields) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}
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
	const { centre_id } = req.body;
	const { table_id, items } = req.body;
	//Kiem tra  table_id co phai dang so nguyen hay khong
	if (!Number.isInteger(table_id) || table_id <= 0) {
		return res.status(400).json({
			status: "Failed",
			message: "Table ID must be an integer greater than 0",
		});
	}

	try {
		// kiem tra centre_if cos hop le khong
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
