import prisma from "../shared/prisma.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

const generateAccessToken = (user, res) => {
	const accessToken = jwt.sign(
		{ id: user.user_id, role: user.role }, // dữ liệu được mã hóa
		process.env.JWT_SECRET, // mã bí mật
		{
			expiresIn: process.env.JWT_EXPIRES_TIME, // thời gian hết hạn
		}
	);
	const cookieOptions = {
		exrires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME,
		),
		httpOnly: true,
	};
	res.cookie("jwt", accessToken, cookieOptions);
	return accessToken;
};
// http://localhost:8080/auth/login
// "email" : "staffbadinh3@gmail.com",
//     "password" : "123456"
const login = async (req, res) => {
	try {
		const user = await prisma.users.findMany({
			where: { email: req.body.email },
		});

		if (user.length === 0) {
			return res.status(400).json({
				status: "Failed",
				error: "User not found",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user[0].password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({
				status: "Failed",
				error: "Invalid password",
			});
		}

		const accessToken = generateAccessToken(user[0], res);
		return res.status(200).json({
			status: "Success",
			data: {
				user,
				accessToken,
			},
		});
	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

const authenticateToken = async (req, res, next) => {
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
		const currentUser = await prisma.users.findUnique({
			where: { user_id: decode.id },
		});

		if (!currentUser) {
			return res.status(401).json({
				status: "Failed",
				error: "User not found",
			});
		} else {
			const currentTime = Math.floor(Date.now() / 1000);
			if (decode.exp < currentTime) {
				return res.status(401).json({
					status: "Failed",
					error: "Token has expired",
				});
			}
		}

		req.user = currentUser;
		next();

	} catch (e) {
		console.log(222222);
		let statusCode = 500 || e.statusCode;
		return res.status(statusCode).json({
			status: "Failed",
			error: e,
		});
	}
};

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await prisma.users.findMany({
			where: { email },
		});

		if (user.length === 0) {
			return res.status(404).json({
				status: "Failed",
				error: "User not found",
			});
		}

		// Generate OTP
		const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
		const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

		await prisma.users.update({
			where: { email },
			data: { otp, otp_expires: otpExpires },
		})

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
	} catch (err) {
		return res.status(500).json({ status: "Failed", error: err });
	}
};

const verifyOtpAndResetPassword = async (req, res) => {
	const { email, otp, newPassword } = req.body;

	try {
		const user = await prisma.users.findMany({
			where: { email },
		});

		if (user.length === 0 || user.otp !== otp) {
			return res.status(404).json({
				status: "Failed",
				error: "User not found or invalid OTP",
			});
		}

		if (Date.now() > user[0].otp_expires) {
			return res.status(400).json({
				status: "Failed",
				error: "OTP has expired",
			});
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.users.update({
			where: { email },
			data: { password: hashedPassword, otp: null, otp_expires: null },
		});

		return res.status(200).json({
			status: "Success",
			message: "Password reset successfully",
		});

	} catch (err) {
		return res.status(500).json({
			status: "Failed",
			error: err,
		});
	}
};

export default {
    generateAccessToken,
    login,
    authenticateToken,
    forgotPassword,
    verifyOtpAndResetPassword,
};

