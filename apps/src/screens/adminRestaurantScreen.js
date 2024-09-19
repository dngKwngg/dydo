import React, { useState, useEffect, act } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Badge, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;
const AdminRestaurantScreen = () => {
	const [allRestaurant, setAllRestaurant] = useState([]);
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);
	// các giá trị của form edit
	const [editedValues, setEditedValues] = useState({
		centre_id: "",
		name: "",
		address: "",
		area: "",
		hotline: "",
		opening_month: "",
		opening_year: "",
		active: "",
		quantity_table: "",
	});
	const columns = [
		{
			title: "Centre ID",
			dataIndex: "centre_id",
			key: "centre_id",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Area",
			dataIndex: "area",
			key: "area",
		},
		{
			title: "Hotline",
			dataIndex: "hotline",
			key: "hotline",
			render: (hotline) =>
				hotline.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3"),
		},
		{
			title: "Opening ",
			key: "opening",
			render: (_, record) =>
				`${record.opening_month} / ${record.opening_year}`,
		},

		{
			title: "Active",
			dataIndex: "active",
			key: "active",
			render: (active) => (
				<Badge
					status={active ? "success" : "error"}
					text={active ? "Đang hoạt động" : "Đã đóng cửa"}
				/>
			),
		},
		{
			title: "Quantity Table",
			dataIndex: "quantity_table",
			key: "quantity_table",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				// console.log(`record`, record),
				<div className="menu-table-action">
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => {
							showEditModal(record);
						}}
					/>
				</div>
			),
		},
	];
	const showEditModal = (record) => {
		setEditedValues({
			centre_id: record.centre_id,
			name: record.name,
			address: record.address,
			area: record.area,
			hotline: record.hotline,
			opening_month: record.opening_month,
			opening_year: record.opening_year,
			active: record.active,
			quantity_table: record.quantity_table,
		});
		setIsModalEditVisible(true);
	};
	const handleEditOk = async() => {
		const response = await fetch(`http://localhost:8080/restaurant/editRestaurant`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: JSON.stringify({
					centre_id: editedValues.centre_id,
					name: editedValues.name,
					address: editedValues.address,
					area: editedValues.area,
					hotline: editedValues.hotline,
					opening_month: editedValues.opening_month,
					opening_year: editedValues.opening_year,
					active: editedValues.active,
					quantity_table: editedValues.quantity_table,
				}),
			}
		);
		if(response.ok){
			await fetchRestaurant();
			setIsModalEditVisible(false);
		}
		
	};
	const handleEditCancel = () => {
		setIsModalEditVisible(false);
	};
	// xử lý cho nhập input trong modal edit
	const handleEditInputChange = (e) => {
		setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select opening_month trong modal edit
	const handleEditMonthSelectChange = (value) => {
		setEditedValues({ ...editedValues, opening_month: value });
	};
	//xử lý cho select active trong modal edit
	const handleEditActiveSelectChange = (value) => {
		setEditedValues({ ...editedValues, active: value });
	};
	const fetchRestaurant = async () => {
		const response = await fetch(
			"http://localhost:8080/restaurant/getAllRestaurant",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		const data = await response.json();
		setAllRestaurant(data.data);
	};
	useEffect(() => {
		fetchRestaurant();
	}, []);
	return (
		<div className="admin-restaurant-screen">
			<AdminHeader label="restaurant" />
			<Table
				columns={columns}
				dataSource={allRestaurant}
				rowKey="centre_id"
				pagination={{ pageSize: 5 }}
			/>
			<Modal
				title="Edit Restaurant"
				open={isModalEditVisible}
				onOk={handleEditOk}
				onCancel={handleEditCancel}
			>
				<div>
					<label>Centre ID: {editedValues.centre_id}</label>
				</div>
				<div>
					<label>Name:</label>
					<Input
						name="name"
						value={editedValues.name}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Address:</label>
					<Input
						name="address"
						value={editedValues.address}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Area:</label>
					<Input
						name="area"
						value={editedValues.area}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Hotline:</label>
					<Input
						name="hotline"
						type="number"
						value={editedValues.hotline}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Opening_month: </label>
					<Select
						value={editedValues.opening_month}
						style={{ width: 120 }}
						onChange={handleEditMonthSelectChange}
					>
						{[...Array(12).keys()].map((month) => (
							<Option key={month} value={month + 1}>
								{month + 1}
							</Option>
						))}
					</Select>
				</div>
				<div>
					<label>Opening_year:</label>
					<Input
						name="opening_year"
						type="number"
						value={editedValues.opening_year}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Active: </label>
					<Select
						value={
							editedValues.active
								? "Đang hoạt động"
								: "Đã đóng cửa"
						}
						onChange={handleEditActiveSelectChange}
					>
						<Option value={true}>Đang hoạt động</Option>
						<Option value={false}>Đã đóng cửa</Option>
					</Select>
				</div>
				<div>
					<label>Area:</label>
					<Input
						name="area"
						value={editedValues.area}
						onChange={handleEditInputChange}
					/>
				</div>
				<div>
					<label>Quantity Table:</label>
					<Input
						name="quantity_table"
						type="number"
						value={editedValues.quantity_table}
						onChange={handleEditInputChange}
					/>
				</div>
			</Modal>
		</div>
	);
};
export default AdminRestaurantScreen;
