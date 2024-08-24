import React, { useState } from "react";
import CounterItem from "./counterItem";
import "./../styles/components/menuItem.css";
const MenuItem = ({ item }) => {
	return (
		<div key={item.id} className="menu-item">
			<div className="image">
				<img src={item.src} alt="" />
			</div>
			<div className="item-info">
				<div className="info">
					<h3>{item.item_name}</h3>
					<p>
						{new Intl.NumberFormat("vi-VN").format(item.price)}
					</p>
				</div>
				<div className="count-quantity">
					<CounterItem item={item} />
				</div>
			</div>
		</div>
	);
};
export default MenuItem;
