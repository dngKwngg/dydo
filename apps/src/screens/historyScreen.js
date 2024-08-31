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
					
					<div key={item.orders_id}>
						<h2>Item orders_id: {item.orders_id}</h2>
						<h2>Table_id: {item.table_id}</h2>
						<h2>Total_cost: {item.total_cost}</h2>
						<Button
							type="primary"
							onClick={() => showModal(item.orders_id)}
						>
							Xem chi tiết
						</Button>
						<Modal
							title={`Modal for Order ${item.orders_id}`}
							open={modalsState[item.orders_id] || false} // Mở modal nếu trạng thái tương ứng là true
							onOk={() => handleOk(item.orders_id)}
							onCancel={() => handleCancel(item.orders_id)}
						>
							{
							detail.map((item_detail) => (
							<div key={item_detail.id}>
								<h2>Orders_id: {item_detail.orders_id}</h2>
								<h2>Table_id: {item_detail.table_id}</h2>
								<h2>id: {item_detail.id}</h2>
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
