const connection = require("../config/connection");

//{
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

// {
//     "item_id": "39"
// }
//Xóa món ăn khỏi menu
exports.deleteMenuItem = async (req, res) => {
	const { item_id } = req.body;
	//Kiểm tra item_id có phải là số nguyên hay không
	if (isNaN(item_id)) {
		return RegExp.status(400).json({
			status: "Failed",
			message: "Item ID must be an integer",
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
				`DELETE FROM menu WHERE item_id = ?`,
				[item_id],
				(err_delete, result_delete, fields_delete) => {
					if (err_delete) {
						return res.status(500).json({
							status: "Failed",
							error: err_delete,
						});
					} else {
						return res.status(200).json({
							status: "Success",
							message: "Done delete",
						});
					}
				}
			);
		}
	);
};
