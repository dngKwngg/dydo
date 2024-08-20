import React, { useState, useEffect } from "react";
import "./../styles/foodScreen.css";

import Header from "./../components/header";

const FoodScreen = () => {
	const [foods, setFoods] = useState([]);

	useEffect(() => {
		// Gọi API để lấy dữ liệu
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listFood"
				);
				const data = await response.json();
				setFoods(data.data);
				console.log(data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);
	//Tách món ăn
	const lauFoods = foods.filter((food) => food.type === "Lẩu Thái Tomyum");
	const nuongFoods = foods.filter((food) => food.type === "Đồ nướng than hoa");
	return (
		<div>
			<Header label="food" />
			<div className="food-menu">
				<h2 className="type-food">Đồ nướng than hoa</h2>
				{nuongFoods.map((food) => {
					return (
						<div key={food.id} className="food-item">
							<div className="food-image">
								<img src={food.src} alt="" />
							</div>
							<div className="food-info">
								<h3>{food.item_name}</h3>
								<p>Price: {food.price}</p>
							</div>
						</div>
					);
				})}
				<h2 className="type-food">Lẩu thái Tomyum</h2>
				{lauFoods.map((food) => {
					return (
						<div key={food.id} className="food-item">
							<div className="food-image">
								<img src={food.src} alt="" />
							</div>
							<div className="food-info">
								<h3>{food.item_name}</h3>
								<p>Price: {food.price}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FoodScreen;
