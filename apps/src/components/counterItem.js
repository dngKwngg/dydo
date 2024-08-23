// src/CounterItem.js
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const CounterItem = ({ item }) => {
	
	const [list, setList] = useState(()=>{
		const saveList = localStorage.getItem("list");
		return saveList !== null ? JSON.parse(saveList) : [];
	});
	
	useEffect(()=>{
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);
	const clearList = () => {
		setList([]); // Cập nhật state với mảng rỗng
	};
	
	
	const increment = () => {
		if(list.length === 0){
			let storeData = JSON.parse(localStorage.getItem("list")) || [];
			storeData.push({ id: item.item_id, quantity: 1 });
			localStorage.setItem("list", JSON.stringify(storeData));
			setList([...storeData]);
		}
		else{
			const index = list.findIndex((element) => element.id === item.item_id);
			if(index === -1){
				setList([...list, { id: item.item_id, quantity: 1 }]);
			}
			else{
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData[index].quantity++;
				localStorage.setItem("list", JSON.stringify(storeData));
				setList([...storeData]);

				
			}
		}
		// clearList();

		
	};
	const decrement = () => {
		if(list.length === 0){
			return;
		}
		else{
			const index = list.findIndex((element) => element.id === item.item_id);
			if(index === -1){
				return;
			}
			else{
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData[index].quantity--;
				if(storeData[index].quantity === 0){
					storeData.splice(index, 1);
				}
				localStorage.setItem("list", JSON.stringify(storeData));
				setList([...storeData]);

			}
		}
	};
	const printQuantity = () => {
		const index = list.findIndex((element) => element.id === item.item_id);
		if(index === -1){
			return 0;
		}
		else{
			return list[index].quantity;
		}
	};
	const resetItem = () => {
		const index = list.findIndex((element) => element.id === item.item_id);
			if(index === -1){
				return;
			}
			else{
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				storeData.splice(index, 1);
				localStorage.setItem("list", JSON.stringify(storeData));
				setList([...storeData]);
			}
	}
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
