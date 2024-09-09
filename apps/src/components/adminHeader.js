import React from "react";
import { useNavigate } from "react-router-dom";
import MenuHeader from "./menuHeader";
const AdminHeader = ({ label }) => {
	const navigate = useNavigate();
	const menu_labels = [
		{
			name: "Doanh thu",
			navigate: "income",
		},
		{
			name: "Quản lý tài khoản",
			navigate: "user",
		},
		{
			name: "Quản lý menu",
			navigate: "receipt",
		},
		{
			name: "Quản lý nhà hàng",
			navigate: "restaurant",
		},
	];
	return (
		<div>
			<h1>Admin</h1>
		</div>
	);
};
export default AdminHeader;
