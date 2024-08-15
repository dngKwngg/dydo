import React from "react";

const MenuItem = ({ name, number, onClick}) => {
	return <div className="menu-item" id={number} onClick={onClick}>{name}</div>;
};
export default MenuItem;