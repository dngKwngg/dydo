import React from "react";

const MenuHeader = ({ name, number, onClick, isActive}) => {
	return <div className={`menu-header ${isActive ? "active" : ""}`}
		id={number} 
		onClick={onClick}>{name}</div>;
};
export default MenuHeader;