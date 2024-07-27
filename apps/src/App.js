import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";

const App = () => {
	return (
			<BrowserRouter>
				<Routes>
          <Route path="" element={<HomeScreen/>} />
					<Route path="/login" element={<LoginScreen />} />
				</Routes>
			</BrowserRouter>
	);
};

export default App;
