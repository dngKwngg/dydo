import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import "./../styles/screens/adminHomeScreen.css";
import { useNavigate } from "react-router-dom";
const AdminHomeScreen = () => {
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
	},[]);
	if (loadingLogin) {
		return <div></div>;
	}
	return (
		<div className="admin-home-screen">
			<AdminHeader label="admin" />
			<div>
				
			</div>
		</div>
	);
};
export default AdminHomeScreen;
