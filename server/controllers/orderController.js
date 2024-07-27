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
	// kiểm tra xem table_id tại centre_id có phải là một bàn đang trống hay không
	function isAvailableTable(result) {
		for (let i of result) {
			if (i.active === 1) return false;
		}
		return true;
	}
	function getPrice(item_id) {
		connection.query(
			`SELECT * FROM menu WHERE item_id = ?`,
			[item_id],
			(err, result, fields) => {
				if (err) {
					console.log("Error: ", err);
					return res.status(500).json({
						status: "Failed",
						error: err,
					});
				}
				if (result.length === 0) {
					console.log("No menu item found");
					return res.status(404).json({
						status: "Failed",
						message: "No menu item found",
						data: result,
					});
				}
				console.log(result[0].price);
				// console.log(typeof result[0]);
				return result[0].price;
			}
		);
		// return 100;
	}

	console.log("Price: ", getPrice(11));
	// kiem tra xem table_id có kha dung hay khong
	connection.query(
		`SELECT * FROM restaurant_centre WHERE centre_id = ?`,
		[centre_id],
		(err, result, fields) => {
			// neu xay ra loi
			if (err) {
				return res.status(500).json({
					status: "Failed",
					error: err,
				});
			}

			// Kiểm tra nếu không tìm thấy bản ghi phù hợp
			if (result.length === 0) {
				return res.status(404).json({
					status: "Failed",
					message: "No restaurant centre found",
					data: result,
				});
			}

			const table_quantity = result[0].quantity_table;
			// khong tim thay ban phu hop
			if (table_id > table_quantity) {
				return res.status(404).json({
					status: "Failed",
					message: "No active tables available",
				});
			}
			// tìm thấy bản ghi phù hợp
			// tạo bản ghi bảng orders
			connection.query(
				`SELECT * FROM orders WHERE table_id = ? AND centre_id = ?`,
				[table_id, centre_id],
				(err, result, fields) => {
					if (err) {
						return res.status(500).json({
							status: "Failed",
							error: err,
						});
					}

					//Kiểm tra nếu không tìm thấy bản ghi phù hợp
					if (result.length === 0 || isAvailableTable(result)) {
						connection.query(
							`INSERT INTO orders (orders_id, table_id, centre_id)
					SELECT COALESCE(MAX(orders_id), 0) + 1, ?, ?
					FROM orders`,
							[table_id, centre_id],
							(err_orders, result_orders, fields_orders) => {
								if (err_orders) {
									return res.status(500).json({
										status: "Failed",
										error: err_orders,
									});
								}
							}
						);
					}
					const values = items.map((item) => [
						centre_id,
						table_id,
						item.item_id,
						item.quantity,
						getPrice(item.item_id),
					]);
					//tạo bản ghi bảng order_item
					connection.query(
						`INSERT INTO order_item (centre_id, table_id, item_id, quantity, price_item)
						VALUES ?`,
						[values],
						(
							err_order_item,
							result_order_item,
							fields_order_item
						) => {
							if (err_order_item) {
								return res.status(500).json({
									status: "Failed",
									error: err_order_item,
								});
							} else {
								return res.status(200).json({
									status: "Success",
									message: "Done create",
								});
							}
						}
					);
				}
			);
		}
	);
};

