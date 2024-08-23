import React, { useState, useEffect, useContext } from "react";
import "./../styles/screens/homeScreen.css";
import Header from "../components/header";
import { ListContext } from "../components/ListContext";
import MenuItem from "../components/menuItem";
import Loading from "../components/loading";
const ReceiptScreen = () => {
	const { list, setList } = useContext(ListContext);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [foods, setFoods] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// Gọi API để lấy dữ liệu
		const fetchData = async () => {
			await delay(1000);
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listFood"
				);
				const data = await response.json();
				setFoods(data.data);
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
						list.map((item) => {
							return (
								<div className="receipt">
									<h2>Item ID: {item.id}</h2>
									<h2>Quantity: {item.quantity}</h2>
									
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
