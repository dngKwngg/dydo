import React from "react";

const MenuItem = ({ name, number, onClick, isActive}) => {
	return <div className={`menu-item ${isActive ? "active" : ""}`}
		id={number} 
		onClick={onClick}>{name}</div>;
};
export default MenuItem;