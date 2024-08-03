const connection = require("../config/connection");
async function queryDatabase(query, params) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, result, fields) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}
// {
// "item_id" : 1,
// "price" : 15000
// }
// sửa giá menu
//http://localhost:8080/menu/updatePrice
exports.updatePrice = async (req, res) => {
	const { item_id, price } = req.body;
	//Kiểm tra item_id có phải là số nguyên lớn hơn 0 hay không
	if (!Number.isInteger(item_id) || item_id <= 0) {
		return res.status(400).json({
			status: "Failed",
			message: "Item ID must be an integer greater than 0",
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

	try {
		const result = await queryDatabase(
			`SELECT * FROM menu WHERE item_id = ?`,
			[item_id]
		);
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No menu item found",
			});
		}
		await queryDatabase(`UPDATE menu SET price = ? WHERE item_id = ?`, [
			price,
			item_id,
		]);
		return res.status(200).json({
			status: "Success",
			message: "Done update",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

// {
// "type" : "Đồ uống",
// "item_name": "Apple meo meo",
// "price": "50000"
// }
// Thêm một món ăn vào menu
//http://localhost:8080/menu/addMenuItem

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
	// connection.query(
	// 	`INSERT INTO menu (type, item_name, price)
	// 	VALUES (?, ?, ?)`,
	// 	[type, item_name, price],
	// 	(err, result, fields) => {
	// 		if (err) {
	// 			return res.status(500).json({
	// 				status: "Failed",
	// 				error: err,
	// 			});
	// 		} else {
	// 			return res.status(200).json({
	// 				status: "Success",
	// 				message: "Done add",
	// 			});
	// 		}
	// 	}
	// );
	try {
		await queryDatabase(
			`INSERT INTO menu (type, item_name, price) VALUES (?, ?, ?)`,
			[type, item_name, price]
		);
		return res.status(200).json({
			status: "Success",
			message: "Done add",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

// {
//     "item_id": 15
// }
//Xóa món ăn khỏi menu
// http://localhost:8080/menu/deleteMenuItem
exports.deleteMenuItem = async (req, res) => {
	const { item_id } = req.body;
	//Kiểm tra item_id có phải là số nguyên lớn hơn 0 hay không
	if (!Number.isInteger(item_id) || item_id <= 0) {
		return RegExp.status(400).json({
			status: "Failed",
			message: "Item ID must be an integer greater than 0",
		});
	}
	try {
		//Kiểm tra item_id có tồn tại hay không
		const result = await queryDatabase(
			`SELECT * FROM menu WHERE item_id = ?`,
			[item_id]
		);
		//Kiểm tra nếu không tìm thấy bản ghi phù hợp
		if (result.length === 0) {
			return res.status(404).json({
				status: "Failed",
				message: "No menu item found",
			});
		}
		await queryDatabase(`DELETE FROM menu WHERE item_id = ?`, [item_id]);
		return res.status(200).json({
			status: "Success",
			message: "Done delete",
		});
	} catch {
		return res.status(500).json({
			status: "Failed",
			error: err_delete,
		});
	}
};
