import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";
import FoodScreen from "./screens/foodScreen";
import DrinkScreen from "./screens/drinkScreen";
import HistoryScreen from "./screens/historyScreen";
import ReceiptScreen from "./screens/receiptScreen";
import {  ListProvider } from "./components/ListContext";
const App = () => {
	return (
		<BrowserRouter>
			<ListProvider>
				<Routes>
					<Route path="" element={<HomeScreen />} />
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/food" element={<FoodScreen />} />
					<Route path="/drink" element={<DrinkScreen />} />
					<Route path="/history" element={<HistoryScreen />} />
					<Route path="/receipt" element={<ReceiptScreen />} />
				</Routes>
			</ListProvider>
		</BrowserRouter>
	);
};

export default App;
