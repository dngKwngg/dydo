import React, { useState, useEffect } from "react";
import "./../styles/screens/foodScreen.css";
import Header from "./../components/header";
import MenuItem from "../components/menuItem";
import Loading from "./../components/loading";

const FoodScreen = () => {
	const [foods, setFoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
		
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
	//Tách món ăn
	const lauFoods = foods.filter((food) => food.type === "Lẩu Thái Tomyum");
	const nuongFoods = foods.filter(
		(food) => food.type === "Đồ nướng than hoa"
	);
	return (
		<div>
			<Header label="food" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="food-menu">
					<h2 className="type-food">Đồ nướng than hoa</h2>
					<div className="food-category">
						{nuongFoods.map((food) => {
							return <MenuItem item={food} />;
						})}
					</div>
					<h2 className="type-food">Lẩu thái Tomyum</h2>
					<div className="food-category">
						{lauFoods.map((food) => {
							return <MenuItem item={food} />;
						})}
					</div>
				</div>
			)}
			{/* <div className="footer">
				<Button onClick={reset}>Reset</Button>
			</div> */}
		</div>
	);
};

export default FoodScreen;
