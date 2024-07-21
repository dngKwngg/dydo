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
	// const table_id = req.body.table_id;
	// const centre_id = req.body.centre_id;
	// const item_id = req.body.item_id;
	// const quantity = req.body.quantity;
	// const { table_id, centre_id, item_id, quantity } = req.body;
	const { centre_id } = req.body;
	const { table_id, items } = req.body;
	//Kiem tra  table_id co phai dang so nguyen hay khong
	if (isNaN(table_id)) {
		return res.status(400).json({
			status: "Failed",
			message: "Table ID must be an integer",
		});
	}
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

					const values = items.map((item) => [
						centre_id,
						table_id,
						item.item_id,
						item.quantity,
					]);
					//tạo bản ghi bảng order_item
					connection.query(
						`INSERT INTO order_item (centre_id, table_id, item_id, quantity)
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



// {
//     "item_id" : "1",
//     "price" : "15000"
// }
// sửa giá menu
exports.updatePrice = async (req, res) => {
	const { item_id, price } = req.body;
	//Kiểm tra item_id có phải là số nguyên hay không
	if (isNaN(item_id)) {
		return res.status(400).json({
			status: "Failed",
			message: "Item ID must be an integer",
		});
	}
	//Kiểm tra price có phải là số thực hay không
	if (isNaN(price)) {
		return res.status(400).json({
			status: "Failed",
			message: "Price must be a float",
		});
	}
	//Kiểm tra price có lớn hơn 0 hay không
	if (!(price > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Price must be greater than 0",
		});
	}
	//Kiểm tra item_id có tồn tại hay không
	connection.query(
		`SELECT * FROM menu WHERE item_id = ?`,
		[item_id],
		(err, result, fields) => {
			if (err) {
				return res.status(500).json({
					status: "Failed",
					error: err,
				});
			}
			//Kiểm tra nếu không tìm thấy bản ghi phù hợp
			if (result.length === 0) {
				return res.status(404).json({
					status: "Failed",
					message: "No menu item found",
					data: result,
				});
			}
			//Tìm thấy bản ghi phù hợp
			connection.query(
				`UPDATE menu SET price = ? WHERE item_id = ?`,
				[price, item_id],
				(err_update, result_update, fields_update) => {
					if (err_update) {
						return res.status(500).json({
							status: "Failed",
							error: err_update,
						});
					} else {
						return res.status(200).json({
							status: "Success",
							message: "Done update",
						});
					}
				}
			);
		}
	);
};


// {
//     "type" : "Đồ uống",
//     "item_name": "Apple meo meo",
//     "price": "50000"
// }
// Thêm một món ăn vào menu
exports.addMenuItem = async (req, res) => {
	const { type, item_name, price } = req.body;
	//Kiểm tra type có phải là chuỗi hay không
	if (typeof type !== "string") {
		return res.status(400).json({
			status: "Failed",
			message: "Type must be a string",
		});
	}
	//Kiểm tra item_name có phải là chuỗi hay không
	if (typeof item_name !== "string") {
		return res.status(400).json({
			status: "Failed",
			message: "Item name must be a string",
		});
	}
	//Kiểm tra price có phải là số thực hay không
	if (isNaN(price)) {
		return res.status(400).json({
			status: "Failed",
			message: "Price must be a float",
		});
	}
	//Kiểm tra price có lớn hơn 0 hay không
	if (!(price > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Price must be greater than 0",
		});
	}
	//Thêm một món ăn vào menu
	connection.query(
		`INSERT INTO menu (type, item_name, price)
		VALUES (?, ?, ?)`,
		[type, item_name, price],
		(err, result, fields) => {
			if (err) {
				return res.status(500).json({
					status: "Failed",
					error: err,
				});
			} else {
				return res.status(200).json({
					status: "Success",
					message: "Done add",
				});
			}
		}
	);
};
