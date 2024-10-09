const connection = require("../config/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    // Check if user exists
    connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "Failed", error: err });
            }
            if (!result[0]) {
                return res
                    .status(404)
                    .json({ status: "Failed", message: "User not found" });
            }

            // Generate OTP
            const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
            const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

            // Update user's record with the OTP and expiry time
            connection.query(
                "UPDATE users SET otp = ?, otp_expires = ? WHERE email = ?",
                [otp, otpExpires, email],
                (err, updateResult) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ status: "Failed", error: err });
                    }

                    // Configure Nodemailer to send email
                    const transporter = nodemailer.createTransport({
                        host: "sandbox.smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                            user: process.env.MAILTRAP_USER,
                            pass: process.env.MAILTRAP_PASS,
                        },
                    });


                    // Email message
                    const mailOptions = {
                        from: "no-reply@mailtrap.io",
                        to: email,
                        subject: "Password Reset OTP",
                        text: `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
                    };

                    // Send email
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return res.status(500).json({
                                status: "Failed",
                                error: "Failed to send email",
                            });
                        }

                        // OTP email sent successfully
                        return res.status(200).json({
                            status: "Success",
                            message: "OTP sent to email successfully",
                        });
                    });
                }
            );
        }
    );
};

exports.verifyOtpAndResetPassword = (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Check if user exists and OTP matches
    connection.query(
        "SELECT * FROM users WHERE email = ? AND otp = ?",
        [email, otp],
        (err, result) => {
            if (err) {
                return res.status(500).json({ status: "Failed", error: err });
            }
            if (!result[0]) {
                return res
                    .status(400)
                    .json({ status: "Failed", message: "Invalid OTP" });
            }

            // Check if OTP has expired
            if (Date.now() > result[0].otp_expires) {
                return res
                    .status(400)
                    .json({ status: "Failed", message: "OTP has expired" });
            }

            // Hash the new password
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ status: "Failed", error: err });
                }

                // Update user's password and clear OTP
                connection.query(
                    "UPDATE users SET password = ?, otp = NULL, otp_expires = NULL WHERE email = ?",
                    [hashedPassword, email],
                    (err, updateResult) => {
                        if (err) {
                            return res
                                .status(500)
                                .json({ status: "Failed", error: err });
                        }

                        // Password updated successfully
                        return res.status(200).json({
                            status: "Success",
                            message: "Password has been reset successfully",
                        });
                    }
                );
            });
        }
    );
};
