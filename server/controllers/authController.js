const connection = require("../config/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateAccessToken = (user, res) => {
	const accessToken = jwt.sign(
		{ id: user.user_id, role: user.role }, // dữ liệu được mã hóa
		process.env.JWT_SECRET, // mã bí mật
		{
			expiresIn: process.env.JWT_EXPIRES_TIME * 60 * 60 * 1000, // thời gian hết hạn
		}
	);
	const cookieOptions = {
		exrires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	res.cookie('jwt', accessToken, cookieOptions);
	return accessToken;
};
// http://localhost:8080/auth/login
// "email" : "staffbadinh3@gmail.com",
//     "password" : "123456"
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
						} 
						 if (!same) {
							return res.status(400).json({
								status: "Failed",
								message: "Incorrect email or password",
							});
						} 
						 token = generateAccessToken(result[0], res);
							return res.status(200).json({
								status: "Success",
								message: "Login successfully",
								token,
								user: result[0],
								
							});
						
					}
				);
			}
		}
	);
};
exports.authenticateToken = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		console.log(req.headers);
		if (!token) {
			return res.status(401).json({
				status: "Failed",
				error: "No token provided. Please login",
			});
		}
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decode);

		connection.query(
			`SELECT * FROM users WHERE user_id = ${decode.id}`,
			(err, currentUser, fields) => {
				if (currentUser.length == 0) {
					return res.status(401).json({
						status: "Failed",
						error: "User not found",
					});
				}

				if (currentUser[0].last_change_password_date) {
					console.log(
						"check",
						decode.iat,
						parseInt(
							currentUser[0].last_change_password_date.getTime() /
								1000,
							10
						)
					);
					// check if user is using old token which was generated before changing password
					if (
						decode.iat <
						parseInt(
							currentUser[0].last_change_password_date.getTime() /
								1000,
							10
						)
					) {
						return res.status(400).json({
							status: "Failed",
							error: "Your password has changed, please login again!",
						});
					}

					const currentTime = new Date(
						new Date().setTime(
							new Date().getTime() + 7 * 60 * 60 * 1000
						)
					);
					// check if token's expired date > current date
					if (decode.exp < parseInt(currentTime / 1000, 10)) {
						return res.status(400).json({
							status: "Failed",
							error: "Your token is expired!",
						});
					}
				}

				req.user = currentUser[0];
				console.log("auth success");
				next();
			}
		);
	} catch (e) {
		statusCode = 500 || e.statusCode;
		return res.status(statusCode).json({
			status: "Failed",
			error: e,
		});
	}
};

//lấy ra danh sách user	
// http://localhost:8080/auth/getAllUsers
exports.getAllUsers = async (req, res) => {
	connection.query(
		"SELECT * FROM users",
		(err, result, fields) => {
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
		}
	);
}