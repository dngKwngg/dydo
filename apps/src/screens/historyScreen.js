import React, { useState, useEffect } from "react";
import "./../styles/screens/historyScreen.css";
import { Modal, Button } from "antd";
import Header from "./../components/header";
const HistoryScreen = () => {
	const [modalsState, setModalsState] = useState({}); // Trạng thái để quản lý các modal
	const [history, setHistory] = useState([]);
	const [detail, setDetail] = useState([]);
	
	const fetchDataDetail = async (orders_id) => {
		try {
			const response = await fetch(
				"http://localhost:8080/order/getOrderDetail",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ orders_id: orders_id }),
				}
			);
			const data = await response.json();
			setDetail(data.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const showModal = async (id) => {
		await fetchDataDetail(id);
		setModalsState((prevState) => ({ ...prevState, [id]: true }));
	};

	const handleOk = (id) => {
		setModalsState((prevState) => ({ ...prevState, [id]: false }));
	};

	const handleCancel = (id) => {
		setModalsState((prevState) => ({ ...prevState, [id]: false }));
	};

	useEffect(() => {
		const fetchDataHistory = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getOrderHistory"
				);
				const data = await response.json();
				setHistory(data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		
		fetchDataHistory();
		
	}, []);
	
	return (
		<div>
			<Header label="history" />
			<div>
				{history.map((item) => (
					<div key={item.orders_id} className="order_history">
						<div className="image">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIlY-6UaLf1GL1WWyRGkfMfIcISuWlpnMyw&s"
								alt=""
							/>
						</div>
						<div className="order_info">
							<h2>Item orders_id: {item.orders_id}</h2>
							<h2>Table_id: {item.table_id}</h2>
							<h2>
								Total_cost:{" "}
								{new Intl.NumberFormat("vi-VN").format(
									item.total_cost
								)}
							</h2>
							<h2>Order_date: {item.date_order}</h2>
						</div>

						<Button
							type="primary"
							onClick={() => showModal(item.orders_id)}
						>
							Xem chi tiết tại đây
						</Button>
						<Modal
							title={`Table ${item.table_id}`}
							open={modalsState[item.orders_id] || false} // Mở modal nếu trạng thái tương ứng là true
							onOk={() => handleOk(item.orders_id)}
							onCancel={() => handleCancel(item.orders_id)}
						>
							{detail.map((item_detail) => (
								<div key={item_detail.id}>
									<div className="menu-item">
										<div className="image">
											<img src={item_detail.src} alt="" />
										</div>
										<div className="item-info">
											<div className="info">
												<h3>{item_detail.item_name}</h3>
												<p>
													{new Intl.NumberFormat(
														"vi-VN"
													).format(item_detail.price)}
												</p>
											</div>
											<div className="count-quantity">
												<h3>
													Quantity:{" "}
													{item_detail.quantity}
												</h3>
											</div>
										</div>
									</div>
								</div>
							))}
						</Modal>
					</div>
				))}
			</div>
		</div>
	);
};

export default HistoryScreen;
