import React, { useState, useEffect, act } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Badge, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./../styles/screens/adminRestaurantScreen.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
const { Option } = Select;
const AdminRestaurantScreen = () => {
	const navigate = useNavigate();
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in
	const [messageApi, contextHolder] = message.useMessage();
	const addSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Add restaurant successful",
		});
	};
	const changeSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Edit successful",
		});
	};
	const addFailed = () => {
		messageApi.open({
			type: "error",
			content: "You need to fill out the form",
		});
	};
	const [allRestaurant, setAllRestaurant] = useState([]);
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);
	const [isModalAddVisible, setIsModalAddVisible] = useState(false);
	// các giá trị của form
	const [formValues, setFormValues] = useState({
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
			width: 100,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			width: 200,
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
			width: 300,
		},
		{
			title: "Area",
			dataIndex: "area",
			key: "area",
			width: 200,
		},
		{
			title: "Hotline",
			dataIndex: "hotline",
			key: "hotline",
			render: (hotline) =>
				hotline.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3"),
			width: 150,
		},
		{
			title: "Opening ",
			key: "opening",
			render: (_, record) =>
				`${record.opening_month} / ${record.opening_year}`,
			width: 100,
		},

		{
			title: "Active",
			dataIndex: "active",
			key: "active",
			render: (active) => (
				console.log(`active`, active),
				(
					<Badge
						status={active ? "success" : "error"}
						text={active ? "Đang hoạt động" : "Đã đóng cửa"}
					/>
				)
			),
			width: 150,
			filters: [
				{
					text: "Đang hoạt động",
					value: 1,
				},
				{
					text: "Đã đóng cửa",
					value: 0,
				},
			],
			onFilter: (value, record) => record.active === value,
		},
		{
			title: "Quantity Table",
			dataIndex: "quantity_table",
			key: "quantity_table",
			width: 150,
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
		setFormValues({
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
	const showAddModal = () => {
		setFormValues({
			name: "",
			address: "",
			area: "",
			hotline: "",
			opening_month: "",
			opening_year: "",
			active: "1",
			quantity_table: "",
		});
		setIsModalAddVisible(true);
	};
	const handleEditOk = async () => {
		const response = await fetch(
			`http://localhost:8080/restaurant/editRestaurant`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
				body: JSON.stringify({
					centre_id: formValues.centre_id,
					name: formValues.name,
					address: formValues.address,
					area: formValues.area,
					hotline: formValues.hotline,
					opening_month: formValues.opening_month,
					opening_year: formValues.opening_year,
					active: formValues.active,
					quantity_table: formValues.quantity_table,
				}),
			}
		);
		if (response.ok) {
			await fetchRestaurant();
			setIsModalEditVisible(false);
			changeSuccess();
		}
	};
	const handleAddOk = async () => {
		// kiểm tra xem có thuộc tính nào của formValues trống không
		const hasEmptyField = Object.values(formValues).some(
			(value) => value === ""
		);
		if (hasEmptyField) {
			addFailed();
		} else {
			const response = await fetch(
				`http://localhost:8080/restaurant/addNewRestaurant`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
					body: JSON.stringify({
						name: formValues.name,
						address: formValues.address,
						area: formValues.area,
						hotline: formValues.hotline,
						opening_month: formValues.opening_month,
						opening_year: formValues.opening_year,
						active: formValues.active,
						quantity_table: formValues.quantity_table,
					}),
				}
			);
			if (response.ok) {
				await fetchRestaurant();
				setIsModalAddVisible(false);
				addSuccess();
			}
		}
	};
	const handleEditCancel = () => {
		setIsModalEditVisible(false);
	};
	const handleAddCancel = () => {
		setIsModalAddVisible(false);
	};
	// xử lý cho nhập input trong modal edit
	const handleEditInputChange = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select opening_month trong modal edit
	const handleEditMonthSelectChange = (value) => {
		setFormValues({ ...formValues, opening_month: value });
	};
	//xử lý cho select active trong modal edit
	const handleEditActiveSelectChange = (value) => {
		setFormValues({ ...formValues, active: value });
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
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		fetchRestaurant();
	}, []);
	if (loadingLogin) {
		return <div></div>;
	}
	return (
        <div className="admin-restaurant-screen">
            {contextHolder}
            <AdminHeader label="restaurant" />
            <div className="admin-restaurant-content">
                <div className="add-restaurant-btn">
                    <Button
                        onClick={() => {
                            showAddModal();
                        }}
                    >
                        Add Restaurant
                    </Button>
                    <Modal
                        title="Add Restaurant"
                        open={isModalAddVisible}
                        onCancel={handleAddCancel}
                        onOk={handleAddOk}
                    >
                        <div>
                            <label>Name:</label>
                            <Input
                                name="name"
                                value={formValues.name}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <Input
                                name="address"
                                value={formValues.address}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div>
                            <label>Area:</label>
                            <Input
                                name="area"
                                value={formValues.area}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div>
                            <label>Hotline:</label>
                            <Input
                                name="hotline"
                                type="number"
                                value={formValues.hotline}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div>
                            <label>Opening_month: </label>
                            <Select
                                value={formValues.opening_month}
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
                                value={formValues.opening_year}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <div>
                            <label>Active: </label>
                            <Select
                                value={
                                    formValues.active
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
                            <label>Quantity Table:</label>
                            <Input
                                name="quantity_table"
                                type="number"
                                value={formValues.quantity_table}
                                onChange={handleEditInputChange}
                            />
                        </div>
                    </Modal>
                </div>
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
                        <label>Centre ID: {formValues.centre_id}</label>
                    </div>
                    <div>
                        <label>Name:</label>
                        <Input
                            name="name"
                            value={formValues.name}
                            onChange={handleEditInputChange}
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <Input
                            name="address"
                            value={formValues.address}
                            onChange={handleEditInputChange}
                        />
                    </div>
                    <div>
                        <label>Area:</label>
                        <Input
                            name="area"
                            value={formValues.area}
                            onChange={handleEditInputChange}
                        />
                    </div>
                    <div>
                        <label>Hotline:</label>
                        <Input
                            name="hotline"
                            type="number"
                            value={formValues.hotline}
                            onChange={handleEditInputChange}
                        />
                    </div>
                    <div>
                        <label>Opening_month: </label>
                        <Select
                            value={formValues.opening_month}
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
                            value={formValues.opening_year}
                            onChange={handleEditInputChange}
                        />
                    </div>
                    <div>
                        <label>Active: </label>
                        <Select
                            value={
                                formValues.active
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
                        <label>Quantity Table:</label>
                        <Input
                            name="quantity_table"
                            type="number"
                            value={formValues.quantity_table}
                            onChange={handleEditInputChange}
                        />
                    </div>
                </Modal>
            </div>
            <Footer />
        </div>
    );
};
export default AdminRestaurantScreen;
