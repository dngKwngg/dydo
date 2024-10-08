import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select, Input, message } from "antd";
import "./../styles/screens/adminUserScreen.css";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
const AdminUserScreen = () => {
	const navigate = useNavigate();
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in
	const [users, setUsers] = useState([]);
	const [centres, setCentres] = useState([]);
	const [filterCentre, setFilterCentre] = useState([]);
	const [formValues, setFormValues] = useState({
		centre_id: "",
		role: "",
		email: "",
		password: "",
		confirm_password: "",
	});
	const [messageApi, contextHolder] = message.useMessage();
	const addFailed = () => {
		messageApi.open({
			type: "error",
			content: "You need to fill out the form",
		});
	};
	const addFailedPassword = () => {
		messageApi.open({
			type: "error",
			content: "Password is not match",
		});
	};
	const addSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Add user successful",
		});
	};
	const deleteSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Delete user successful",
		});
	};
	const [isModalAddVisible, setIsModalAddVisible] = useState(false);
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
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
			render: (_, record) => (
				<Button
					type="primary"
					danger
					icon={<DeleteOutlined />}
					onClick={() => {
						showDeleteModal(record);
					}}
				/>
			),
		},
	];
	const showAddModal = () => {
		setFormValues({
			centre_id: "",
			role: "",
			email: "",
			password: "",
			confirm_password: "",
		});
		setIsModalAddVisible(true);
		console.log("form", formValues);
	};
	const handleAddOk = async () => {
		//kiểm tra xem có thuộc tính nào của formValues trống không
		const hasEmptyField = Object.values(formValues).some(
			(value) => value === ""
		);
		console.log(formValues.confirm_password);
		console.log(formValues.password);
		if (hasEmptyField) {
			addFailed();
		} else if (formValues.confirm_password !== formValues.password) {
			addFailedPassword();
		} else {
			const response = await fetch(`http://localhost:8080/user/addUser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
				body: JSON.stringify({
					centre_id: formValues.centre_id,
					role: formValues.role,
					email: formValues.email,
					password: formValues.password,
				}),
			});

			if (response.ok) {
				await fetchAllUsers();
				setIsModalAddVisible(false);
				addSuccess();
			}
		}
	};
	const handleAddCancel = () => {
		setIsModalAddVisible(false);
	};
	const showDeleteModal = (record) => {
		setFormValues({ email: record.email });
		setIsModalDeleteVisible(true);
	};
	const handleDeleteOk = async () => {
		const response = await fetch(`http://localhost:8080/user/deleteUser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
			body: JSON.stringify({
				email: formValues.email,
			}),
		});
		if (response.ok) {
			await fetchAllUsers();
			setIsModalDeleteVisible(false);
			deleteSuccess();
		}
	};
	const handleDeleteCancel = () => {
		setIsModalDeleteVisible(false);
	};
	const fetchAllUsers = async () => {
		const response = await fetch("http://localhost:8080/auth/getAllUsers", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		});
		const data = await response.json();
		setUsers(data.data);
		const responseCentre = await fetch(
			`http://localhost:8080/restaurant/getAllRestaurant`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			}
		);
		const dataCentre = await responseCentre.json();
		// lấy ra các centre_id khác nhau
		const centreIds = [
			...new Set(dataCentre.data.map((user) => user.centre_id)),
		];
		setCentres(centreIds);
		// tạo ra các filter cho centre_id
		const filters = centreIds.map((id) => ({ text: id, value: id }));
		setFilterCentre(filters);
	};
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		fetchAllUsers();
	}, []);
	// xử lý cho nhập input trong modal edit
	const handleAddInputChange = (e) => {
		// console.log(e.target.value)
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};
	//xử lý cho select centre_id  trong modal edit
	const handleAddSelectCentreChange = (value) => {
		setFormValues({ ...formValues, centre_id: value });
	};
	const handleAddSelectRoleChange = (value) => {
		setFormValues({ ...formValues, role: value });
	};
	if (loadingLogin) {
		return <div></div>;
	}
	return (
		<div className="admin-user-screen">
			{contextHolder}
			<AdminHeader label="user" />
			<div className="admin-user-content">
				<div className="add-user-btn">
					<Button
						onClick={() => {
							showAddModal();
						}}
					>
						Add User
					</Button>
					<Modal
						title="Add User"
						open={isModalAddVisible}
						onOk={handleAddOk}
						onCancel={handleAddCancel}
					>
						<div>
							<label>Centre ID: </label>
							<Select
								value={formValues.centre_id}
								onChange={handleAddSelectCentreChange}
								style={{ width: 100 }}
							>
								{centres.map((centre) => (
									<Select.Option key={centre} value={centre}>
										{centre}
									</Select.Option>
								))}
							</Select>
						</div>
						<div>
							<label>Role: </label>
							<Select
								value={formValues.role}
								onChange={handleAddSelectRoleChange}
								style={{ width: 100 }}
							>
								<Select.Option value="admin">
									admin
								</Select.Option>
								<Select.Option value="staff">
									staff
								</Select.Option>
							</Select>
						</div>
						<div>
							<label>Email: </label>
							<Input
								type="text"
								name="email"
								value={formValues.email}
								onChange={handleAddInputChange}
							/>
						</div>
						<div>
							<label>Password: </label>
							<Input.Password
								name="password"
								placeholder="input password"
								value={formValues.password}
								onChange={handleAddInputChange}
							/>
						</div>
						<div>
							<label>Confirm Password: </label>
							<Input.Password
								name="confirm_password"
								placeholder="input password"
								value={formValues.confirm_password}
								onChange={handleAddInputChange}
							/>
						</div>
					</Modal>
				</div>
				<Table
					dataSource={users}
					columns={columns}
					rowKey="user_id"
					pagination={{ pageSize: 5 }}
				/>
				<Modal
					title="Confirm Delete ?"
					open={isModalDeleteVisible}
					onOk={handleDeleteOk}
					onCancel={handleDeleteCancel}
				>
					<p>Are you sure you want to delete this user?</p>
					<div>
						<label>Email: </label>
					</div>
				</Modal>
			</div>
			<Footer />
		</div>
	);
};
export default AdminUserScreen;
