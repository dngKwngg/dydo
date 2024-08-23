import React, { useState, useEffect } from "react";
import "./../styles/screens/drinkScreen.css";
import MenuItem from "../components/menuItem";
import Header from "./../components/header";
import ResetButton from "../components/resetButton";
import Loading from "./../components/loading";
const DrinkScreen = () => {
	const [drinks, setDrinks] = useState([]);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// Gọi API để lấy dữ liệu
		const fetchData = async () => {
			await delay(500);
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listDrink"
				);
				const data = await response.json();
				setDrinks(data.data);
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
			<Header label="drink" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="drink-menu drink-category">
					{drinks.map((drink) => {
						return <MenuItem key={drink.id} item={drink} />;
					})}
				</div>
			)}
			<ResetButton />
		</div>
	);
};

export default DrinkScreen;
