import React, { useState, useContext, useEffect } from "react";
import "./../styles/components/header.css";
import { useNavigate } from "react-router-dom";
import MenuHeader from "./menuHeader";
import { ListContext } from "./ListContext";
const Header = ({ label }) => {
	const navigate = useNavigate();
	const { list, setList } = useContext(ListContext);
	const menu_labels = [
		{
			name: "Đồ ăn",
			navigate: "food",
		},
		{
			name: "Đồ uống",
			navigate: "drink",
		},
		{
			name: "Hóa đơn",
			navigate: "receipt",
		},
		{
			name: "Lịch sử",
			navigate: "history",
		},
	];
	const reset = () => {
		// localStorage.removeItem("list");
		setList([]);
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
	};

	return (
		<div className="home-header">
			<div className="logo">
				<a href="/home" className="main-logo">
					<img
						src={`${process.env.PUBLIC_URL}/images/dydo.png`}
					></img>
				</a>
			</div>
			<div className="menu-header-btns">
				{menu_labels.map((item, index) => {
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
						reset();
						navigate(`/login`);
					}}
				>
					Đăng xuất
				</div>
			</div>
		</div>
	);
};

export default Header;
