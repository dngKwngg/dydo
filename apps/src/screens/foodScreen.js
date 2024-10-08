import React, { useState, useEffect, useContext} from "react";
import "./../styles/screens/foodScreen.css";
import Header from "./../components/header";
import MenuItem from "../components/menuItem";
import Loading from "./../components/loading";
import ResetButton from "../components/resetButton";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
const FoodScreen = () => {
	const navigate = useNavigate();
	const [foods, setFoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		// Gọi API để lấy dữ liệu
		const fetchData = async () => {
			await delay(1000);
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listFood",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
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
		if (loadingLogin) {
			return <div></div>;
		}
	return (
		<div className="food-screen">
			<Header label="food" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="food-menu">
					<ResetButton />
					<div className="food-section">
						<h2 className="type-food nuong">Đồ nướng than hoa</h2>
						<div className="food-category">
							{nuongFoods.map((food) => {
								return <MenuItem item={food} />;
							})}
						</div>
					</div>
					<div className="food-section">
						<h2 className="type-food lau">Lẩu thái Tomyum</h2>
						<div className="food-category">
							{lauFoods.map((food) => {
								return <MenuItem item={food} />;
							})}
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default FoodScreen;
