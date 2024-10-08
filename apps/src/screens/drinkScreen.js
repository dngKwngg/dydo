import React, { useState, useEffect } from "react";
import "./../styles/screens/drinkScreen.css";
import MenuItem from "../components/menuItem";
import Header from "./../components/header";
import ResetButton from "../components/resetButton";
import Loading from "./../components/loading";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
const DrinkScreen = () => {
	const navigate = useNavigate();
	const [drinks, setDrinks] = useState([]);
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	const [loading, setLoading] = useState(true);
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
			await delay(500);
			try {
				const response = await fetch(
					"http://localhost:8080/menu/listDrink",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
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
	if (loadingLogin) {
		return <div></div>;
	}
	return (
		<div>
			<Header label="drink" />
			{loading ? (
				<Loading loading={loading} />
			) : (
				<div className="drink-section">
					<div className="drink-category">
						<ResetButton />
						{drinks.map((drink) => {
							return <MenuItem key={drink.id} item={drink} />;
						})}
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default DrinkScreen;
