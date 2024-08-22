// src/CounterItem.js
import React, { useState } from "react";
import { Button } from "antd";
import {SearchOutlined, PlusOutlined, MinusOutlined} from "@ant-design/icons"

const CounterItem = () => {
	const [count, setCount] = useState(0);

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
