import prisma from "../shared/prisma.js";
import bcrypt from "bcrypt";
async function queryDatabase(query, params) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, result, fields) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}
//http://localhost:8080/user/addUser
const addUser = async (req, res) => {
	const { centre_id, role, email, password } = req.body;
	const bcryptPassword = bcrypt.hashSync(password, 10);
	try {
		await queryDatabase(
			`INSERT INTO users (centre_id, role, email, password) VALUES (?, ?, ?, ?)`,
			[centre_id, role, email, bcryptPassword]
		);
		return res.status(200).json({
			status: "Success",
			message: "User added",
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};
const deleteUser = async (req, res) => {
	const { email } = req.body;
	try {
		await queryDatabase(`DELETE FROM users WHERE email = ?`, [email]);
		res.status(200).json({
			status: "Success",
			message: "User deleted",
		});
	} catch (err) {
		res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

const getAllUsers = async (req, res) => {
	connection.query("SELECT * FROM users", (err, result, fields) => {
		if (err) {
			return res.status(500).json({
				status: "Failed",
				error: err,
			});
		}
		return res.status(200).json({
			status: "Success",
			data: result,
		});
	});
};

export default {
	addUser,
	deleteUser,
	getAllUsers,
}