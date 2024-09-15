import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./../styles/screens/adminMenuManager.css";
const { Option } = Select;
const AdminMenuManagerScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const changeSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Edit successful",
		});
	};

	const deleteSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Delete successful",
		});
	};

	const [allMenu, setAllMenu] = useState([]);
	// trạng thái modal edit
	const [isModalVisible, setIsModalVisible] = useState(false);
	// item hiện tại đang được chọn để edit
	const [editingItem, setEditingItem] = useState(null);
	// các giá trị của form edit
	const [editedValues, setEditedValues] = useState({
		item_id: "",
		item_name: "",
		type: "",
		price: "",
	});
	const columns = [
		{
			title: "Item ID",
			dataIndex: "item_id",
			key: "item_id",
			width: 150,
		},
		{
			title: "Image",
			dataIndex: "src",
			key: "src",
			render: (image) => (
				<img
					src={image}
					style={{ width: 100, height: 100, borderRadius: "4px" }}
				/>
			),
			width: 150,
		},
		{
			title: "Item Name",
			dataIndex: "item_name",
			key: "item_name",
			width: 400,
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			width: 300,
			filters: [
				{
					text: "Đồ uống",
					value: "Đồ uống",
				},
				{
					text: "Đồ nướng than hoa",
					value: "Đồ nướng than hoa",
				},
				{
					text: "Lẩu Thái Tomyum",
					value: "Lẩu Thái Tomyum",
				},
			],
			onFilter: (value, record) => record.type.indexOf(value) === 0,
		},

		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (price) => new Intl.NumberFormat("vi-VN").format(price),
			width: 250,
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

					<Button
						type="primary"
						danger
						icon={<DeleteOutlined />}
						onClick={() => {
							deleteMenuItem(record.item_id);
						}}
					/>
				</div>
			),
		},
	];

	// Fetch menu data on table
	const fetchMenu = async () => {
		const response = await fetch("http://localhost:8080/menu/listMenu", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		const data = await response.json();
		setAllMenu(data.data);
	};
	useEffect(() => {
		fetchMenu();
	}, []);
	const showEditModal = (item) => {
		setEditingItem(item);
		setEditedValues({
			item_id: item.item_id,
			item_name: item.item_name,
			type: item.type,
			price: item.price,
		});
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const handleOk = async () => {
		const response = await fetch(
			`http://localhost:8080/menu/updateInfoMenu`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
				body: JSON.stringify({
					item_id: editedValues.item_id,
					item_name: editedValues.item_name,
					type: editedValues.type,
					price: editedValues.price,
				}),
			}
		);
		if (response.ok) {
			await fetchMenu();
			setIsModalVisible(false);
			changeSuccess();
			console.log(`editedValues`, editedValues);
		}
	};

	// Delete Menu Item
	const deleteMenuItem = async (item_id) => {
		const response = await fetch(
			`http://localhost:8080/menu/deleteMenuItem`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
				body: JSON.stringify({
					item_id: item_id,
				}),
			}
		);
		if (response.ok) {
			await fetchMenu();
			deleteSuccess();
		}
	};
	const handleInputChange = (e) => {
		console.log(`target`, e.target.name);
		setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
	};
	const handleSelectChange = (value) => {
		setEditedValues({ ...editedValues, type: value });
	};
	return (
		<div className="admin-menu-screen">
			<AdminHeader label="menuManager" />
			<Table
				dataSource={allMenu}
				columns={columns}
				rowKey="item_id"
				pagination={{ pageSize: 7 }}
			/>
			{contextHolder}
			<Modal
				title="Edit Menu Item"
				open={isModalVisible}
				onCancel={handleCancel}
				onOk={handleOk}
			>
				<div>
					<label>Item Name:</label>
					<Input
						name="item_name"
						value={editedValues.item_name}
						onChange={handleInputChange}
					/>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Type:</label>
					<Select
						value={editedValues.type}
						onChange={handleSelectChange}
						style={{ width: "100%" }}
					>
						<Option value="Đồ uống">Đồ uống</Option>
						<Option value="Đồ nướng than hoa">
							Đồ nướng than hoa
						</Option>
						<Option value="Lẩu Thái Tomyum">Lẩu Thái Tomyum</Option>
					</Select>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Price:</label>
					<Input
						name="price"
						type="number"
						value={editedValues.price}
						onChange={handleInputChange}
					/>
				</div>
			</Modal>
		</div>
	);
};
export default AdminMenuManagerScreen;
