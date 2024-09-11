import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal } from "antd";
const AdminIncomeScreen = ({label}) => {
	const [allHistory, setAllHistory] = useState([]);
	const [modalsState, setModalsState] = useState({});
	const [detail, setDetail] = useState([]);
	const fetchDataDetail = async (orders_id) => {
		try {
			const response = await fetch(
				"http://localhost:8080/order/getOrderDetail",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer " + localStorage.getItem("accessToken"),
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
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getAllOrderHistory",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
				);
				const data = await response.json();
				setAllHistory(data.data);
				console.log(data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	const columns = [
		{
			title: "Order ID",
			dataIndex: "orders_id",
			key: "orders_id",
		},
		{
			title: "Centre ID",
			dataIndex: "centre_id",
			key: "centre_id",
		},
		{
			title: "Table ID",
			dataIndex: "table_id",
			key: "table_id",
		},
		{
			title: "Total Cost",
			dataIndex: "total_cost",
			key: "total_cost",
			render: (total_cost) =>
				new Intl.NumberFormat("vi-VN").format(total_cost),
		},
		{
			title: "Order Date",
			dataIndex: "date_order",
			key: "date_order",
			render: (date_order) =>
				new Date(date_order).toLocaleDateString("vi-VN", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
		},
		{
			title: "Order Time",
			dataIndex: "date_order",
			key: "order_time",
			render: (date_order) =>
				new Date(date_order).toLocaleTimeString("vi-VN", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button
					type="primary"
					onClick={() => showModal(record.orders_id)}
				>
					Xem chi tiết tại đây
				</Button>
			),
		},
	];
	return (
		<div>
			<AdminHeader label="income" />
			<Table
				dataSource={allHistory}
				columns={columns}
				rowKey="orders_id"
				pagination={{ pageSize: 5 }}
			/>
			<div className="home-container">
				{allHistory.map((item) => (
					<Modal
						key={item.orders_id}
						title={`Table ${item.table_id} of Centre ${item.centre_id}`}
						open={modalsState[item.orders_id] || false}
						onCancel={() => handleCancel(item.orders_id)}
						footer={[
							<Button
								key="back"
								onClick={() => handleCancel(item.orders_id)}
							>
								Close
							</Button>,
						]}
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
												Quantity: {item_detail.quantity}
											</h3>
										</div>
									</div>
								</div>
							</div>
						))}
					</Modal>
				))}
			</div>
		</div>
	);
};
export default AdminIncomeScreen;
