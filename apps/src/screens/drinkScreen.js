import React, { useState, useEffect } from 'react';
import "./../styles/screens/drinkScreen.css";
import MenuItem from '../components/menuItem';
import Header from './../components/header';
const DrinkScreen = () => {
    const [drinks, setDrinks] = useState([]);

	useEffect(() => {
		// Gọi API để lấy dữ liệu
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listDrink"
				);
				const data = await response.json();
				setDrinks(data.data);
				console.log(data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<Header label="drink" />
			<div className="drink-menu drink-category">
				{drinks.map((drink) => {
					return (
						<MenuItem item= {drink} />
					);
				})}
			</div>
		</div>
	);
}

export default DrinkScreen;
