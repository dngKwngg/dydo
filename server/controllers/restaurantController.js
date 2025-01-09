import prisma from "../shared/prisma.js";

// Prisma ignore fields in data object with value is undefined

//http://localhost:8080/restaurant/addNewRestaurant
//thêm cơ sở mới
const addNewRestaurant = async (req, res) => {
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
		await prisma.restaurant_centre.create({
			data: {
				name,
				address,
				area,
				hotline,
				opening_month,
				opening_year,
				quantity_table,
			},
		})
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
const editRestaurant = async (req, res) => {
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
		await prisma.restaurant_centre.update({
			where: {centre_id},
			// Field with value undefined will not be updated
			data: {
				name,
				address,
				area,
				hotline,
				opening_month,
				opening_year,
				active,
				quantity_table,
			},
		});
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
const getAllRestaurant = async (req, res) => {
	try {
		const result = await prisma.restaurant_centre.findMany();
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
const getRestaurant = async (req, res) => {
	const { centre_id } = req.user;
	try {
		const result = await prisma.restaurant_centre.findUnique({
			where: {centre_id}
		})
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

export default {
	addNewRestaurant,
	editRestaurant,
	getAllRestaurant,
	getRestaurant
}