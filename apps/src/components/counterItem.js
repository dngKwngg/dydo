// src/CounterItem.js
import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { ListContext } from "./ListContext";
const CounterItem = ({ item }) => {
	// const [list, setList] = useState(()=>{
	// 	const saveList = localStorage.getItem("list");
	// 	return saveList !== null ? JSON.parse(saveList) : [];
	// });
	// useEffect(()=>{
	// 	localStorage.setItem("list", JSON.stringify(list));
	// }, [list]);

	// const clearList = () => {
	// 	setList([]); // Cập nhật state với mảng rỗng
	// };

	const { list, setList } = useContext(ListContext);
	const increment = () => {
		if (list.length === 0) {
			let storeData = JSON.parse(localStorage.getItem("list")) || [];
			storeData.push({ id: item.item_id, quantity: 1 });
			setTimeout(() => {
				localStorage.setItem("list", JSON.stringify(storeData));
			}, 0);
			setList([...storeData]);
		} else {
			const index = list.findIndex(
				(element) => element.id === item.item_id
			);
			if (index === -1) {
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData.push({ id: item.item_id, quantity: 1 });
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);
				setList([...storeData]);
			} else {
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData[index].quantity++;
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);

				setList([...storeData]);
			}
		}
		// clearList();
	};
	const decrement = () => {
		if (list.length === 0) {
			return;
		} else {
			const index = list.findIndex(
				(element) => element.id === item.item_id
			);
			if (index === -1) {
				return;
			} else {
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData[index].quantity--;
				if (storeData[index].quantity === 0) {
					storeData.splice(index, 1);
				}
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);
				setList([...storeData]);
			}
		}
	};
	const printQuantity = () => {
		const index = list.findIndex((element) => element.id === item.item_id);
		if (index === -1) {
			return 0;
		} else {
			return list[index].quantity;
		}
	};
	const resetItem = () => {
		const index = list.findIndex((element) => element.id === item.item_id);
		if (index === -1) {
			return;
		} else {
			let storeData = JSON.parse(localStorage.getItem("list")) || [];
			storeData.splice(index, 1);
			setTimeout(() => {
				localStorage.setItem("list", JSON.stringify(storeData));
			}, 0);
			setList([...storeData]);
		}
	};
	const reset = () => {
		localStorage.removeItem("list");
		setList([]);
	};
	return (
		<>
			<Button onClick={decrement} icon={<MinusOutlined />} />
			<p>{printQuantity()}</p>
			<Button onClick={increment} icon={<PlusOutlined />} />
			<Button onClick={resetItem}>Reset</Button>
		</>
	);
};

export default CounterItem;
