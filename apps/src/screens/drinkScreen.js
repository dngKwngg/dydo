import React, { useState, useEffect } from 'react';
import "./../styles/drinkScreen.css";

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
			<div className="drink-menu">
				{drinks.map((drink) => {
					return (
						<div key={drink.id} className="drink-item">
							<div className="drink-image">
								<img src={drink.src} alt="" />
							</div>
							<div className="drink-info">
								<h3>{drink.item_name}</h3>
								<p>Price: {drink.price}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default DrinkScreen;
