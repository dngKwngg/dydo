const connection = require("../config/connection");

const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
	connection.query(
		"SELECT * FROM users WHERE email = ?",
		[req.body.email],
		(err, result, fields) => {
			// neu co loi xay ra
			if (err) {
				return res.status(500).json({
					status: "Failed",
					error: err,
				});
			}
			// khong co user nao duoc tim thay
			else if (!result[0]) {
				return res.status(404).json({
					status: "Failed",
					message: "User not found",
				});
			}
			// tim thay user
			else {
				console.log(result[0]);
				// so sanh password
				bcrypt.compare(
					req.body.password,
					result[0].password,
					(error, same) => {
						if (error) {
							return res.status(500).json({
								status: "Failed",
								error: error,
							});
						} else if (!same) {
							return res.status(400).json({
								status: "Failed",
								message: "Password is incorrect",
							});
						} else {
							return res.status(200).json({
								status: "Success",
								message: "Login successfully",
								user: result[0],
							});
						}
					}
				);
			}
		}
	);
};
