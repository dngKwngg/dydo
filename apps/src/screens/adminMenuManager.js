import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./../styles/screens/adminMenuManager.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
const { Option } = Select;
const AdminMenuManagerScreen = () => {
	const navigate = useNavigate();
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in
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
	const addFailed = () => {
		messageApi.open({
			type: "error",
			content: "You need to fill out the form",
		});
	};
	const [allMenu, setAllMenu] = useState([]);
	// trạng thái modal edit
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);
	// state modal add item
	const [isModalAddVisible, setIsModalAddVisible] = useState(false);
	// modal xác nhận xóa item
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
	// các giá trị của form
	const [formValues, setFormValues] = useState({
		item_id: "",
		item_name: "",
		type: "",
		price: "",
		src: "",
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
			onFilter: (value, record) => record.type === value,
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
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		fetchMenu();
	}, []);
	const showEditModal = (item) => {
		setFormValues({
			item_id: item.item_id,
			item_name: item.item_name,
			type: item.type,
			price: item.price,
			src: item.src,
		});
		setIsModalEditVisible(true);
	};
	const showAddModal = () => {
		setFormValues({
			item_id: "",
			item_name: "",
			type: "",
			price: "",
			src: "",
		});
		setIsModalAddVisible(true);
		console.log("form", formValues);
	};

	const showDeleteModal = (item) => {
		setFormValues({
			item_id: item.item_id,
		});
		setIsModalDeleteVisible(true);
		// deleteMenuItem(item.item_id);
	};
	const handleCancelEdit = () => {
		setIsModalEditVisible(false);
	};
	const handleCancelAdd = () => {
		setIsModalAddVisible(false);
	};
	const handleCancelDelete = () => {
		setIsModalDeleteVisible(false);
	};
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
					item_id: formValues.item_id,
					item_name: formValues.item_name,
					type: formValues.type,
					price: formValues.price,
					src: formValues.src,
				}),
			}
		);
		if (response.ok) {
			await fetchMenu();
			setIsModalEditVisible(false);
			changeSuccess();
			console.log(`formValues`, formValues);
		}
	};
	const handleOkAdd = async () => {
		const hasEmptyField = Object.entries(formValues).some(
			([key, value]) => key !== "item_id" && value === ""
		);

		if (hasEmptyField) {
			addFailed();
		} else {
			const response = await fetch(
				`http://localhost:8080/menu/addMenuItem`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
					body: JSON.stringify({
						item_name: formValues.item_name,
						type: formValues.type,
						price: formValues.price,
						src: formValues.src,
					}),
				}
			);
			if (response.ok) {
				await fetchMenu();
				setIsModalAddVisible(false);
				addSuccess();
				console.log(`formValues`, formValues);
			}
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
					item_id: formValues.item_id,
				}),
			}
		);
		if (response.ok) {
			await fetchMenu();
			setIsModalDeleteVisible(false);
			deleteSuccess();
		}
	};

	// xử lý cho nhập input trong modal
	const handleInputChange = (e) => {
		console.log(`target`, e.target.name);
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select trong modal
	const handleSelectChange = (value) => {
		setFormValues({ ...formValues, type: value });
	};
	if (loadingLogin) {
		return <div></div>;
	}
	return (
        <div className="admin-menu-screen">
            <AdminHeader label="menuManager" />
            <div className="admin-menu-content">
                <div className="add-item-btn">
                    <Button
                        onClick={() => {
                            showAddModal();
                        }}
                    >
                        Add Item
                    </Button>
                </div>
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
                            value={formValues.item_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Type:</label>
                        <Select
                            value={formValues.type}
                            onChange={handleSelectChange}
                            style={{ width: "100%" }}
                        >
                            <Option value="Đồ uống">Đồ uống</Option>
                            <Option value="Đồ nướng than hoa">
                                Đồ nướng than hoa
                            </Option>
                            <Option value="Lẩu Thái Tomyum">
                                Lẩu Thái Tomyum
                            </Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Price:</label>
                        <Input
                            name="price"
                            type="number"
                            value={formValues.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Image Link: </label>
                        <Input
                            name="src"
                            value={formValues.src}
                            onChange={handleInputChange}
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
                            value={formValues.item_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Type:</label>
                        <Select
                            value={formValues.type}
                            onChange={handleSelectChange}
                            style={{ width: "100%" }}
                        >
                            <Option value="Đồ uống">Đồ uống</Option>
                            <Option value="Đồ nướng than hoa">
                                Đồ nướng than hoa
                            </Option>
                            <Option value="Lẩu Thái Tomyum">
                                Lẩu Thái Tomyum
                            </Option>
                        </Select>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label>Price:</label>
                        <Input
                            name="price"
                            type="number"
                            value={formValues.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Image Link: </label>
                        <Input
                            name="src"
                            value={formValues.src}
                            onChange={handleInputChange}
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
			<Footer />
        </div>
    );
};
export default AdminMenuManagerScreen;
