import React from "react";

const MenuHeader = ({ name, number, onClick, isActive }) => {
	return (
		<div
			className={`menu-header ${isActive ? "active" : ""}`}
			id={number}
			onClick={onClick}
		>
			<div className="menu-header-name">{name}</div>
		</div>
	);
};
export default MenuHeader;
