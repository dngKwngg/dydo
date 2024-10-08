import React, { useEffect, useState } from "react";
import "./../styles/components/specialDishes.css";
import { Carousel } from "antd";
import SpecialDishesItem from "./specialDishesItem";
const SpecialDishes = () => {
	const [highlightMenu, setHighlightMenu] = useState([]);
	useEffect(() => {
		const getHighlightMenu = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/menu/highlightMenu",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
				);
				const data = await response.json();
				setHighlightMenu(data.data);
			} catch (error) {
				console.log("error", error);
			}
		};
		getHighlightMenu();
	}, []);
	return (
		<div className="special-dishes">
			<div className="special-dishes-title">
				<p>Món ăn nổi bật</p>
			</div>
			<div className="special-dishes-carousel">
				<Carousel
					autoplay
					slidesToShow={3}
					draggable="true"
					adaptiveHeight="true"
				>
					{highlightMenu.map((item, index) => {
						return (
							<SpecialDishesItem
								key={index}
								name={item.item_name}
								price={item.price}
								src={item.src}
							/>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
};
export default SpecialDishes;
