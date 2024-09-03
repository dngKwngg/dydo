// src/CounterItem.js
import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { ListContext } from "./ListContext";
const CounterItem = ({ item }) => {
	const { list, setList } = useContext(ListContext);
	const increment = () => {
		// nếu list rỗng thì thêm vào list
		if (list.length === 0) {
			// sao chép bản sao của list từ localStorage gán vào storeData
			let storeData = JSON.parse(localStorage.getItem("list")) || [];
			// thêm item vào list với số lượng là 1
			storeData.push({ item_id: item.item_id, quantity: 1 });
			// cập nhật storeData vào localStorage
			setTimeout(() => {
				localStorage.setItem("list", JSON.stringify(storeData));
			}, 0);
			// cập nhật list
			setList([...storeData]);
		} else {
			// nếu list không rỗng
			// tìm xem item đã có trong list chưa
			const index = list.findIndex(
				(element) => element.item_id === item.item_id
			);
			//nếu chưa có thì thêm vào list với số lượng là 1
			if (index === -1) {
				// sao chép bản sao của list từ localStorage gán vào storeData
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				// thêm item vào list với số lượng là 1
				storeData.push({ item_id: item.item_id, quantity: 1 });
				// cập nhật storeData vào localStorage
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);
				// cập nhật list
				setList([...storeData]);
			} else {
				// nếu đã có thì tăng số lượng lên 1
				// sao chép bản sao của list từ localStorage gán vào storeData
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				//tăng số lượng của item đó lên 1
				storeData[index].quantity++;
				// cập nhật storeData vào localStorage
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);
				// cập nhật list
				setList([...storeData]);
			}
		}
		
	};
	const decrement = () => {
		// nếu list rỗng thì không làm gì cả
		if (list.length === 0) {
			return;
		} else {
			// nếu list không rỗng
			// tìm xem item đã có trong list chưa
			const index = list.findIndex(
				(element) => element.item_id === item.item_id
			);
			//nếu chưa có thì không làm gì cả
			if (index === -1) {
				return;
			} else {
				// nếu đã có thì giảm số lượng đi 1
				// sao chép bản sao của list từ localStorage gán vào storeData
				let storeData = JSON.parse(localStorage.getItem("list")) || [];
				// giảm số lượng của item đó đi 1
				storeData[index].quantity--;
				// nếu số lượng bằng 0 thì xóa item đó khỏi list
				if (storeData[index].quantity === 0) {
					storeData.splice(index, 1);
				}
				// cập nhật storeData vào localStorage
				setTimeout(() => {
					localStorage.setItem("list", JSON.stringify(storeData));
				}, 0);
				// cập nhật list
				setList([...storeData]);
			}
		}
	};
	// lấy số lượng của item
	const getQuantity = () => {
		// lấy index của item trong list
		const index = list.findIndex((element) => element.item_id === item.item_id);
		// nếu không tìm thấy thì không làm gì cả
		if (index === -1) {
			return 0;
		} else {
			// nếu tìm thấy thì trả về số lượng
			return list[index].quantity;
		}
	};
	// xóa item khỏi list
	const resetItem = () => {
		// tìm index của item trong list
		const index = list.findIndex((element) => element.item_id === item.item_id);
		// nếu không tìm thấy thì không làm gì cả
		if (index === -1) {
			return;
		} else {
			// nếu tìm thấy thì xóa item đó khỏi list
			// sao chép bản sao của list từ localStorage gán vào storeData
			let storeData = JSON.parse(localStorage.getItem("list")) || [];
			// xóa item khỏi list
			storeData.splice(index, 1);
			// cập nhật storeData vào localStorage
			setTimeout(() => {
				localStorage.setItem("list", JSON.stringify(storeData));
			}, 0);
			// cập nhật list
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
			<p>{getQuantity()}</p>
			<Button onClick={increment} icon={<PlusOutlined />} />
			{/* <Button onClick={resetItem}>Reset</Button> */}
		</>
	);
};

export default CounterItem;
