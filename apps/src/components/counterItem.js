// src/CounterItem.js
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { SearchOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const CounterItem = () => {
	const [count, setCount] = useState(() => {
		//
		const savedCount = localStorage.getItem("count");
		return savedCount !== null ? parseInt(savedCount, 10) : 0;
	});
	useEffect(() => {
		localStorage.setItem("count", count);
	}, [count]);
	//
	const increment = () => setCount((prevCount) => prevCount + 1);
	const decrement = () => setCount((prevCount) => prevCount - 1);
	const reset = () => setCount(0);

	return (
		<>
			<Button onClick={decrement} icon={<MinusOutlined />} />
			<p> {count}</p>
			<Button onClick={increment} icon={<PlusOutlined />} />
		</>
	);
};

export default CounterItem;
