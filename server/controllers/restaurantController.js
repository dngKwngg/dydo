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
// "name" : "Chùa",
// "address" : "Láng Hạ",
// "area" : "Láng",
// "hotline": "0123456890",
// "opening_month": 12,
// "opening_year": 2022,
// "quantity_table": 30

// }

//http://localhost:8080/restaurant/addNewRestaurant
//thêm cơ sở mới
exports.addNewRestaurant = async (req, res) => {
	const {
		name,
		address,
		area,
		hotline,
		opening_month,
		opening_year,
		quantity_table,
	} = req.body;
	function isValidHotline(hotline) {
		for (let i of hotline) {
			if (i < "0" || i > "9") return false;
		}
		return true;
	}
	if (!isValidHotline(hotline) || !(hotline.length === 10)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter hotline",
		});
	}
	if (
		!Number.isInteger(opening_month) ||
		!(opening_month > 0 && opening_month < 13)
	) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter opening_month",
		});
	}
	if (!Number.isInteger(opening_year) || !(opening_year > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter opening_year",
		});
	}
	if (!Number.isInteger(quantity_table) || !(quantity_table > 0)) {
		return res.status(400).json({
			status: "Failed",
			message: "Re-enter quantity_table",
		});
	}

	try {
		await queryDatabase(
			`INSERT INTO restaurant_centre (name, address, area, hotline, opening_month, opening_year, quantity_table) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				name,
				address,
				area,
				hotline,
				opening_month,
				opening_year,
				quantity_table,
			]
		);
		return res.status(200).json({
			status: "Success",
			message: "Done add new restaurant",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};
//http://localhost:8080/restaurant/closeRestaurant
//update một cơ sở không còn hoạt động 
exports.closeRestaurant = async (req, res) => {
	const centre_id = req.body.centre_id; 
	// connection.query(
	//
	// 	(err, result, fields) => {
	// 		if (err) {
	// 			return res.status(400).json({
	// 				status: "Failed",
	// 				error: err,
	// 			});
	// 		}
	// 		return res.status(200).json({
	// 			status: "Success",
	// 			message: "Done close this restaurant",
	// 		});
	// 	}
	// );
	try {
		await queryDatabase(
			`UPDATE restaurant_centre SET active = 0 WHERE centre_id = ?`,
			[centre_id]
		);
		return res.status(200).json({
			status: "Success",
			message: "Done close this restaurant",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};
