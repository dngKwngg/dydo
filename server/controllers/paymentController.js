import prisma from "../shared/prisma";
const payOS = require("../utils/payos");

exports.verifyPayOsWebhookData = async function (req, res) {
	// console.log("payment handler");
	// console.log(req.body);
	const webhookData = payOS.verifyPaymentWebhookData(req.body);

	if (
		["Thanh toan don hanggg", "VQRIO123"].includes(webhookData.description)
	) {
		return res.json({
			error: 0,
			message: "Ok",
			data: webhookData,
		});
	}

	// Source code uses webhook data

	return res.json({
		error: 0,
		message: "Ok",
		data: webhookData,
	});
};

exports.createPayOsPaymentPage = async function (req, res) {
	// console.log(req.body);
	const YOUR_DOMAIN = "http://localhost:3000";
	const body = {
		orderCode: Number(String(Date.now()).slice(-6)),
		amount: 2000,
		description: "Thanh toan don hang",
		returnUrl: `${YOUR_DOMAIN}/success.html`,
		cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
	};

	try {
		const paymentLinkResponse = await payOS.createPaymentLink(body);
		console.log(paymentLinkResponse);
		res.redirect(paymentLinkResponse.checkoutUrl);
	} catch (error) {
		console.error(error);
		res.send("Something went error");
	}
};
