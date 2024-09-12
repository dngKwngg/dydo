import React from "react";
import { useNavigate } from "react-router-dom";
import MenuHeader from "./menuHeader";
import "./../styles/components/adminHeader.css";
const AdminHeader = ({ label }) => {
	const navigate = useNavigate();
	const menu_labels_admin = [
		{
			name: "Quản lý hóa đơn",
			navigate: "income",
		},
		{
			name: "Quản lý tài khoản",
			navigate: "user",
		},
		{
			name: "Quản lý menu",
			navigate: "menuManager",
		},
		{
			name: "Quản lý nhà hàng",
			navigate: "restaurant",
		},
	];
	return (
		<div className="admin-header">
			<div className="home-header">
				<div className="logo">
					<a href="/admin" className="main-logo">
						DYDO
					</a>
				</div>
				{menu_labels_admin.map((item, index) => {
					return (
						<MenuHeader
							number={index + 1}
							name={item.name}
							onClick={() => {
								navigate(`/${item.navigate}`);
							}}
							isActive={item.navigate === label}
						></MenuHeader>
					);
				})}
				<div
					className="log-out"
					onClick={() => {
						localStorage.removeItem("accessToken");
						navigate(`/login`);
					}}
				>
					Đăng xuất
				</div>
			</div>
			
		</div>
	);
};
export default AdminHeader;
