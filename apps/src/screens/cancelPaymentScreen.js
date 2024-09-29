import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CancelPaymentScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const orderCode = params.get("orderCode");
		const status = params.get("status");
		const cancel = params.get("cancel");

		if (cancel === "true" && status === "CANCELLED") {
			// Update the order status to failed in the backend
			const updateOrderStatus = async () => {
				try {
					const response = await fetch(
						`http://localhost:8080/order/updateFailedStatus`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								Authorization:
									"Bearer " +
									localStorage.getItem("accessToken"),
							},
							body: JSON.stringify({
								orderCode,
								status: "FAILED",
							}),
						}
					);
					const data = await response.json();
					if (data.error === 0) {
						console.log("Order status updated successfully");
						// navigate("/"); // Redirect to an order summary page or any other page
					} else {
						console.error(
							"Error updating order status:",
							data.message
						);
					}
				} catch (error) {
					console.error("Error:", error);
				}
			};

			updateOrderStatus();
		}
	}, [location, navigate]);

	return (
		<div>
			<h4 class="payment-titlte">
				Thanh toán thất bại. Cảm ơn bạn đã sử dụng dịch vụ của payOS và
				DYDO!
			</h4>
			<p>
				Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
				<a href="mailto:support@payos.vn">support@payos.vn</a>
			</p>
			<a href="/receipt" id="return-page-btn">
				Trở về trang chủ
			</a>
		</div>
	);
};

export default CancelPaymentScreen;
