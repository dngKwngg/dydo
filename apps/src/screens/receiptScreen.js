import React, { useState, useEffect, useContext } from "react";
import "./../styles/screens/receiptScreen.css";
import Header from "../components/header";
import { ListContext } from "../components/ListContext";
import MenuItem from "../components/menuItem";
import Loading from "../components/loading";
const ReceiptScreen = () => {
	const { list, setList } = useContext(ListContext);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [listItem, setListItem] = useState([]);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	const [check, setCheck] = useState(false);
			
useEffect(() => {
	// Gọi API để lấy dữ liệu
	
	const fetchData = async () => {
		await delay(1000);
		try {
			console.log(listItem);
			const response = await fetch(
				"http://localhost:8080/menu/listFoodById",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({list_item: list}),
				}
			);
			const data = await response.json();
			// if (arraysAreEqual(listItem, data.data)) {
			// 	setCheck(true);
			// } else {
			// 	setListItem(data.data);
			// 	setCheck(false);
			// }
			setListItem(data.data);

			// console.log(data.data);
			setLoading(false);
			
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	

	fetchData();
	
}, [list]);

	useEffect(() => {
		const getPrice =  async () => {
			let current_price = 0;
			if (listItem.length > 0) {
				listItem.forEach( async (item) => {
					list.forEach( async (element) => {
						if(item.item_id === element.item_id) {
							current_price += item.price * element.quantity;
						}
					})
				})
			}
			setTotal(current_price);
		}
		getPrice();
	}, [list]);
	return (
		<div>
			<Header label="receipt" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="receipt-container">
					{list.length === 0 ? (
						<div className="receipt">
							<h2>Không có món ăn nào được chọn</h2>
						</div>
					) : (
						
						listItem.map((item) => {
							
							return (
									<div className="receipt">
										<MenuItem item={item} />
									</div>
							);
						})
						
					)}
					<h2>Tiền: {total}</h2>
				</div>
			  )} 
			
		</div>
	);
};

export default ReceiptScreen;
