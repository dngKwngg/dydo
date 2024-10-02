import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import "./../styles/screens/adminHomeScreen.css";
import { useNavigate } from "react-router-dom";
import { Column } from "@ant-design/plots";

const AdminHomeScreen = () => {
	const navigate = useNavigate();
	const [revenueByMonth, setRevenueByMonth] = useState([]);
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getAllRevenueByMonthForAdmin",
					{
						
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
						
					}
				);
				const data = await response.json();
				setRevenueByMonth(data.data);
				// console.log("revenue", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	if (loadingLogin) {
		return <div></div>;
	}

	const config = {
		data: revenueByMonth, // Changed `data` to `revenue`
		xField: "month",
		yField: "revenue",
		onReady: ({ chart }) => {
			try {
				const { height } = chart._container.getBoundingClientRect();
				const tooltipItem =
					revenueByMonth[Math.floor(Math.random() * revenueByMonth.length)]; // Use `revenue` here
				chart.on(
					"afterrender",
					() => {
						chart.emit("tooltip:show", {
							data: {
								data: tooltipItem,
							},
							offsetY: height / 2 - 60,
						});
					},
					true
				);
			} catch (e) {
				console.error(e);
			}
		},
	};

	return (
		<div className="admin-home-screen">
			<AdminHeader label="admin" />
			<div>
				<Column {...config} />
			</div>
		</div>
	);
};

export default AdminHomeScreen;
