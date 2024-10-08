import React, { useState, useEffect } from "react";
import "./../styles/screens/homeScreen.css";
import Header from "./../components/header";
import { useNavigate } from "react-router-dom";
import HomeBanner from "../components/homeBanner";
import Category from "../components/category";
import SpecialDishes from "../components/specialDishes";
import Service from "../components/service";
import Footer from "../components/footer";

const HomeScreen = () => {
	const navigate = useNavigate();
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
	}, []);
	if (loadingLogin) {
		return <div></div>;
	}
	return (
		<div className="home-screen">
			<Header />
			{/* Nội dung khác của HomeScreen */}
			<HomeBanner />
			<Category />
			<SpecialDishes />
			<Service />
			<Footer />
		</div>
	);
};

export default HomeScreen;
