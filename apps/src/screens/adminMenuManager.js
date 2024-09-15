import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./../styles/screens/adminMenuManager.css";
const { Option } = Select;
const AdminMenuManagerScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const addSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Add item successful",
		});
	};

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
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);
	// state modal add item
	const [isModalAddVisible, setIsModalAddVisible] = useState(false);
	// modal xác nhận xóa item
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	// các giá trị của form edit
	const [editedValues, setEditedValues] = useState({
		item_id: "",
		item_name: "",
		type: "",
		price: "",
		src:"",
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
							showDeleteModal(record);
							// console.log(record)
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
		setEditedValues({
			item_id: item.item_id,
			item_name: item.item_name,
			type: item.type,
			price: item.price,
		});
		setIsModalEditVisible(true);
	};
	const showAddModal = () => {
		setIsModalAddVisible(true);
	};

	const showDeleteModal = (item) => {
		setEditedValues({
			item_id: item.item_id
		})
		setIsModalDeleteVisible(true);
		// deleteMenuItem(item.item_id);
	}
	const handleCancelEdit = () => {
		setIsModalEditVisible(false);
	};
	const handleCancelAdd = () => {
		setIsModalAddVisible(false);
	};
	const handleCancelDelete = () => {
		setIsModalDeleteVisible(false);
	}
	const handleOkEdit = async () => {
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
			setIsModalEditVisible(false);
			changeSuccess();
			console.log(`editedValues`, editedValues);
		}
	};
	const handleOkAdd = async () => {
		const response = await fetch(`http://localhost:8080/menu/addMenuItem`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({
				item_name: editedValues.item_name,
				type: editedValues.type,
				price: editedValues.price,
				src: editedValues.src,
			}),
		});
		if (response.ok) {
			await fetchMenu();
			setIsModalAddVisible(false);
			addSuccess();
			console.log(`editedValues`, editedValues);
		}
	};

	const handleOkDelete = async () => {
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
					item_id: editedValues.item_id,
				}),
			}
		);
		if (response.ok) {
			await fetchMenu();
			setIsModalDeleteVisible(false)
			deleteSuccess();
		}
	}

	// xử lý cho nhập input trong modal edit
	const handleEditInputChange = (e) => {
		console.log(`target`, e.target.name);
		setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select trong modal edit
	const handleEditSelectChange = (value) => {
		setEditedValues({ ...editedValues, type: value });
	};
	// xử lý cho nhập input trong modal add
	const handleAddInputChange = (e) => {
		console.log(`target`, e.target.name);
		setEditedValues({ ...editedValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select trong modal add
	const handleAddSelectChange = (value) => {
		setEditedValues({ ...editedValues, type: value });
	};
	
	return (
		<div className="admin-menu-screen">
			<AdminHeader label="menuManager" />
			<Button
				onClick={() => {
					showAddModal();
				}}
			>
				Add Item
			</Button>
			<Modal
				title="Add Menu Item"
				open={isModalAddVisible}
				onCancel={handleCancelAdd}
				onOk={handleOkAdd}
			>
				<div>
					<label>Item Name:</label>
					<Input
						name="item_name"
						value={editedValues.item_name}
						onChange={handleAddInputChange}
					/>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Type:</label>
					<Select
						value={editedValues.type}
						onChange={handleAddSelectChange}
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
						onChange={handleAddInputChange}
					/>
				</div>
				<div>
					<label>Image Link: </label>
					<Input
						name="src"
						value={editedValues.src}
						onChange={handleAddInputChange}
					/>
				</div>
			</Modal>
			<Table
				dataSource={allMenu}
				columns={columns}
				rowKey="item_id"
				pagination={{ pageSize: 7 }}
			/>
			{contextHolder}
			<Modal
				title="Edit Menu Item"
				open={isModalEditVisible}
				onCancel={handleCancelEdit}
				onOk={handleOkEdit}
			>
				<div>
					<label>Item Name:</label>
					<Input
						name="item_name"
						value={editedValues.item_name}
						onChange={handleEditInputChange}
					/>
				</div>
				<div style={{ marginTop: 10 }}>
					<label>Type:</label>
					<Select
						value={editedValues.type}
						onChange={handleEditSelectChange}
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
						onChange={handleEditInputChange}
					/>
				</div>
			</Modal>
			<Modal
				title="Confirm Delete ?"
				open={isModalDeleteVisible}
				onCancel={handleCancelDelete}
				onOk={handleOkDelete}
			></Modal>
		</div>
	);
};
export default AdminMenuManagerScreen;
