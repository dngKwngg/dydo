import React, { useState, useEffect, useContext } from "react";
import "./../styles/screens/receiptScreen.css";
import Header from "../components/header";
import { ListContext } from "../components/ListContext";
import MenuItem from "../components/menuItem";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Select, message, Input } from "antd";
import create from "@ant-design/icons/lib/components/IconFont";
import Footer from "../components/footer";
const ReceiptScreen = () => {
	const navigate = useNavigate();
	const { list, setList } = useContext(ListContext);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [listItem, setListItem] = useState([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	const [isModalCheckOutVisible, setIsModalCheckOutVisible] = useState(false);
	// const [orderCode, setOrderCode] = useState(0);
	const [isCashConfirmModalVisible, setCashConfirmModalVisible] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("");
	const [loadingLogin, setLoadingLogin] = useState(true);
	const [tableId, setTableId] = useState(0);
	const [quantity_table, setQuantityTable] = useState(0);
	const [messageApi, contextHolder] = message.useMessage();
	const addSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Add order successful",
		});
	};
	const failedTableId = () => {
		messageApi.open({
			type: "error",
			content: "Failed to create order. Please check table ID",
		});
	};
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
					table_id: tableId,
					items: list,
					total_cost: total,
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
						x_api_key: "51bb8fc5-f2eb-45b7-a989-109e8fcb9f73",
						x_client_id: "0a26f586-a386-4a6e-9f84-b2eb6571a1a0",
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
	const createCashOrder = async () => {
		try {
			const response = await fetch("http://localhost:8080/order/createCashOrder", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer " + localStorage.getItem("accessToken"),
				},
				body: JSON.stringify({
					order_code: 0, // Pass the PayOS order code here
					table_id: tableId,
					items: list,
					total_cost: total,
					
				}),
			});


			
			console.log("dataaaaa", tableId);
		} catch (error) {
			console.error("Error creating order:", error);
		}
	}
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
		const fetchQuantityTable = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/restaurant/getRestaurant",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
				);
				const data = await response.json();
				// console.log(data.data[0].quantity_table);
				setQuantityTable(data.data[0].quantity_table);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchQuantityTable();
	}, []);
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
	const showCheckoutModal = () => {	
		setIsModalCheckOutVisible(true);
	};
	const handleCancelCheckout = () => {
		setIsModalCheckOutVisible(false);
	};
	const handleOkCheckout = () => {
		if(paymentMethod === "cash") {
			if(tableId <= 0 || tableId > parseInt(quantity_table)) {
			failedTableId();
			setIsModalCheckOutVisible(false);
		} else {
			setIsModalCheckOutVisible(false);
			showConfirmCheckoutModal(); 
		}
			
		}
		else if (paymentMethod === "QR") {
			if(tableId <= 0 || tableId > parseInt(quantity_table)) {
			failedTableId();
			setIsModalCheckOutVisible(false);
		} else {
			handleCheckout();
			setIsModalCheckOutVisible(false);
		}
		}
		setPaymentMethod("");
	};
	const showConfirmCheckoutModal = () => {
		setCashConfirmModalVisible(true);
	};
	const handleCancelConfirmCheckout = () => {
		setCashConfirmModalVisible(false);
	};
	const handleOkConfirmCheckout = () => {
		setCashConfirmModalVisible(false);
		
			createCashOrder();
			setList([]);
			// navigate("/food");
			setTableId(0);
			addSuccess();
		
	};
	const handleSelectChange = (value) => {
		setPaymentMethod(value);
	};
	const handleInputChange = (e) => {
		setTableId(e.target.value);
	};
	return (
		<div className="receipt-screen">
			{contextHolder}
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
					<div className="table-input">
						<label>Table ID:</label>
						<Input
							name="tableId"
							value={tableId}
							onChange={handleInputChange}
						/>
					</div>
					<div className="total">
						<h2>
							Tổng số tiền:{" "}
							{new Intl.NumberFormat("vi-VN").format(total)} VND
						</h2>
					</div>
					{/* Add button to checkout */}

					<div className="checkout-btn">
						<Button
							type="primary"
							onClick={() => {
								showCheckoutModal();
							}}
						>
							Checkout
						</Button>
						<Modal
							title="Xác nhận thanh toán"
							open={isModalCheckOutVisible}
							onOk={handleOkCheckout}
							onCancel={handleCancelCheckout}
						>
							<div>
								<label>Chọn phương thức thanh toán:</label>
								<Select
									value={paymentMethod}
									onChange={handleSelectChange}
									style={{ width: "100%" }}
								>
									<Select.Option value="cash">
										Tiền mặt
									</Select.Option>

									<Select.Option value="QR">
										Quét QR
									</Select.Option>
								</Select>
							</div>
						</Modal>
						<Modal
							title="Xác nhận thanh toán tiền mặt"
							open={isCashConfirmModalVisible}
							onOk={handleOkConfirmCheckout}
							onCancel={handleCancelConfirmCheckout}
						>
							<div>
								<h3>Đã thanh toán bằng tiền mặt?</h3>
							</div>
						</Modal>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default ReceiptScreen;
