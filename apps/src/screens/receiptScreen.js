import React, { useState, useEffect, useContext } from "react";
import "./../styles/screens/homeScreen.css";
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
		
			
useEffect(() => {
	// Gọi API để lấy dữ liệu
	const fetchData = async () => {
		await delay(1000);
		try {
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
			setListItem(data.data);
			// console.log(data.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	fetchData();
}, []);
	
	return (
		<div>
			<Header label="receipt" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div>
					{list.length === 0 ? (
						<div className="receipt">
							<h2>Không có món ăn nào được chọn</h2>
						</div>
					) : (
						listItem.map((item) => {
							
							return (
								<div>
									<div className="receipt">
										<MenuItem item={item} />
										
									</div>
								</div>
							);
						})
						
					)}
				</div>
			  )} 
			
		</div>
	);
};

export default ReceiptScreen;
