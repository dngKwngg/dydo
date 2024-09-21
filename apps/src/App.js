import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";
import FoodScreen from "./screens/foodScreen";
import DrinkScreen from "./screens/drinkScreen";
import HistoryScreen from "./screens/historyScreen";
import ReceiptScreen from "./screens/receiptScreen";
import AdminHomeScreen from "./screens/adminHomeScreen";
import AdminIncomeScreen from "./screens/adminIncomeScreen";
import AdminMenuManagerScreen from "./screens/adminMenuManager";
import AdminRestaurantScreen from "./screens/adminRestaurantScreen";
import AdminUserScreen from "./screens/adminUserScreen";
import {  ListProvider } from "./components/ListContext";
const App = () => {
	return (
		<BrowserRouter>
			<ListProvider>
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/home" element={<HomeScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/food" element={<FoodScreen />} />
					<Route path="/drink" element={<DrinkScreen />} />
					<Route path="/history" element={<HistoryScreen />} />
					<Route path="/receipt" element={<ReceiptScreen />} />
					<Route path="/admin" element={<AdminHomeScreen />} />
					<Route path="/income" element={<AdminIncomeScreen />} />
					<Route path="/menuManager" element={<AdminMenuManagerScreen />} />
					<Route path="/restaurant" element={<AdminRestaurantScreen />} />
					<Route path="/user" element={<AdminUserScreen />} />
				</Routes>
			</ListProvider>
		</BrowserRouter>
	);
};

export default App;
