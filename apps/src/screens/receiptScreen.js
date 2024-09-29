import React, { useState, useEffect, useContext } from "react";
import "./../styles/screens/receiptScreen.css";
import Header from "../components/header";
import { ListContext } from "../components/ListContext";
import MenuItem from "../components/menuItem";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import create from "@ant-design/icons/lib/components/IconFont";
const ReceiptScreen = () => {
	const navigate = useNavigate();
	const { list, setList } = useContext(ListContext);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [listItem, setListItem] = useState([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	// const [orderCode, setOrderCode] = useState(0);
	const [check, setCheck] = useState(false);
	const [loadingLogin, setLoadingLogin] = useState(true);

	const createOrder = async (orderCode) => {
		try {
			const response = await fetch("http://localhost:8080/order/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " + localStorage.getItem("accessToken"),
				},
				body: JSON.stringify({
					order_code: orderCode, // Pass the PayOS order code here
					table_id: 1,
					items: list,
					total: total,
				}),
			});

			const data = await response.json();
			console.log("data", data);
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const createPayOsPayment = async () => {
		try {
			const response = await fetch(
				"http://localhost:8080/order/createPayOs",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " + localStorage.getItem("accessToken"),
						x_api_key: "5eb6c214-a000-4a68-822f-196ae5944255",
						x_client_id: "d36013e9-561f-477a-bad3-e09eef407cca",
					},
					body: JSON.stringify({
						amount: total,
						description: `Thanh toan hoa don`,
						cancelUrl: "http://localhost:3000/cancel",
						returnUrl: "http://localhost:3000/success",
					}),
				}
			);

			if (response.ok) {
				const data = await response.json();
				if (data.data && data.data.orderCode) {
					return {
						orderCode: data.data.orderCode,
						checkoutUrl: data.data.checkoutUrl,
					};
				} else {
					console.error("Order code not found in response");
					return null;
				}
			}
		} catch (error) {
			console.error("Error creating PayOS payment:", error);
			throw error;
		}
	};

	const handleCheckout = async () => {
		try {
			const payOsResult = await createPayOsPayment(); // Get the order code and checkout URL from PayOS
			if (payOsResult && payOsResult.orderCode) {
				await createOrder(payOsResult.orderCode); // Pass the order code to your system
				window.location.href = payOsResult.checkoutUrl; // Redirect to the checkout URL for payment
			}
		} catch (error) {
			console.error("Error during checkout process:", error);
		}
	};

	useEffect(() => {
		// Gọi API để lấy dữ liệu
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		const fetchData = async () => {
			await delay(1000);
			try {
				console.log("listItem: ", listItem);
				const response = await fetch(
					"http://localhost:8080/menu/listFoodById",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
						body: JSON.stringify({ list_item: list }),
					}
				);
				const data = await response.json();
				setListItem(data.data);

				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [list]);

	useEffect(() => {
		const getPrice = async () => {
			let current_price = 0;
			if (listItem == undefined) {
				return;
			}
			if (listItem.length > 0) {
				listItem.forEach(async (item) => {
					list.forEach(async (element) => {
						if (item.item_id === element.item_id) {
							current_price += item.price * element.quantity;
						}
					});
				});
			}
			setTotal(current_price);
		};
		console.log("listItem", listItem);
		getPrice();
	}, [list, []]);
	if (loadingLogin) {
		return <div></div>;
	}
	return (
		<div>
			<Header label="receipt" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="receipt-container">
					{list.length === 0 ? (
						<div className="receipt">
							<h2>Không có món ăn nào được chọn</h2>
						</div>
					) : (
						listItem.map((item) => {
							return (
								<div className="receipt">
									<MenuItem item={item} />
								</div>
							);
						})
					)}
					<div className="total">
						<h2>
							Tổng số tiền:{" "}
							{new Intl.NumberFormat("vi-VN").format(total)}
						</h2>
					</div>
					{/* Add button to checkout */}
					<div className="checkout-btn">
						<Button type="primary" onClick={handleCheckout}>
							Checkout
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReceiptScreen;
