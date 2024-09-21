import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select } from "antd";

const AdminUserScreen = () => {
	const [users, setUsers] = useState([]);
    const [centres, setCentres] = useState([]);
    const [filterCentre, setFilterCentre] = useState([]);
	const columns = [
		{
			title: "User ID",
			dataIndex: "user_id",
			key: "user_id",
			width: 150,
		},
		{
			title: "Centre ID",
			dataIndex: "centre_id",
			key: "centre_id",
			width: 150,
			filters: filterCentre,
			onFilter: (value, record) => record.centre_id === value,
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			width: 150,
			filters: [
				{
					text: "admin",
					value: "admin",
				},
				{
					text: "staff",
					value: "staff",
				},
			],
			onFilter: (value, record) => record.role === value,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: 300,
		},
		{
			title: "Password",
			dataIndex: "password",
			key: "password",
			width: 600,
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Button type="primary" onClick={() => {}}>
					Edit
				</Button>
			),
		},
	];
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"http://localhost:8080/auth/getAllUsers",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			const data = await response.json();
			setUsers(data.data);
            const centreIds = [...new Set(data.data.map((user) => user.centre_id))];
            setCentres(centreIds);
            const filters = centreIds.map((id) => ({ text: id, value: id }));
			setFilterCentre(filters);
            console.log(`centres_id: ${filterCentre}`);
            
		};
		fetchData();
	}, []);
	return (
		<div className="admin-user-screen">
			<AdminHeader label="user" />
			<Table
				dataSource={users}
				columns={columns}
				rowKey="user_id"
				pagination={{ pageSize: 5 }}
			/>
		</div>
	);
};
export default AdminUserScreen;
