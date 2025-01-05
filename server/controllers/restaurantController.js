import prisma from "../shared/prisma";

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

//http://localhost:8080/restaurant/editRestaurant
//edit restaurant
exports.editRestaurant = async (req, res) => {
	const {
		centre_id,
		name,
		address,
		area,
		hotline,
		opening_month,
		opening_year,
		active,
		quantity_table,
	} = req.body;
	
	try {
		if(name !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET name = ? WHERE centre_id = ?`,
				[name, centre_id]
			);
		}
		if(address !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET address = ? WHERE centre_id = ?`,
				[address, centre_id]
			);
		}
		if(area !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET area = ? WHERE centre_id = ?`,
				[area, centre_id]
			);
		}
		if(hotline !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET hotline = ? WHERE centre_id = ?`,
				[hotline, centre_id]
			);
		}
		if(opening_month !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET opening_month = ? WHERE centre_id = ?`,
				[opening_month, centre_id]
			);
		}
		if(opening_year !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET opening_year = ? WHERE centre_id = ?`,
				[opening_year, centre_id]
			);
		}
		if(active !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET active = ? WHERE centre_id = ?`,
				[active, centre_id]
			);
		}
		if(quantity_table !== undefined){
			await queryDatabase(
				`UPDATE restaurant_centre SET quantity_table = ? WHERE centre_id = ?`,
				[quantity_table, centre_id]
			);
		}
		return res.status(200).json({
			status: "Success",
			message: "Done edit this restaurant",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

//http://localhost:8080/restaurant/getAllRestaurant
exports.getAllRestaurant = async (req, res) => {
	try {
		const result = await queryDatabase(`SELECT * FROM restaurant_centre`);
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

//http://localhost:8080/restaurant/getRestaurant
exports.getRestaurant = async (req, res) => {
	const { centre_id } = req.user;
	try {
		const result = await queryDatabase(`SELECT * FROM restaurant_centre WHERE centre_id = ?`, [centre_id]);
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};
