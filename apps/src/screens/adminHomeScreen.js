import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import "./../styles/screens/adminHomeScreen.css";
import { useNavigate } from "react-router-dom";
import { Column } from "@ant-design/plots";

const AdminHomeScreen = () => {
	const navigate = useNavigate();
	const [revenueByMonth, setRevenueByMonth] = useState([]);
	const [revenueByYear, setRevenueByYear] = useState([]);
	const [revenueByDate, setRevenueByDate] = useState([]);
	const [loadingLogin, setLoadingLogin] = useState(true); // True if user is logged in

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token === null) {
			console.log("token is null");
			navigate("/login");
		} else {
			setLoadingLogin(false);
		}
		const fetchDataMonth = async () => {
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
				console.log("data", data.data);
				data.data.forEach(el => {
					el.revenue = parseInt(el.revenue);
				})
				setRevenueByMonth(data.data);
				// console.log("revenue", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchDataYear = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getAllRevenueByYearForAdmin",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
				);
				const data = await response.json();
				console.log("data", data.data);
				data.data.forEach((el) => {
					el.revenue = parseInt(el.revenue);
				});
				setRevenueByYear(data.data);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchDataDate = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getAllRevenueByDateForAdmin",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + localStorage.getItem("accessToken"),
						},
					}
				);
				const data = await response.json();
				console.log("data", data.data);
				data.data.forEach((el) => {
					el.revenue = parseInt(el.revenue);
				});
				setRevenueByDate(data.data);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchDataMonth();
		fetchDataYear();
		fetchDataDate();
	}, []);

	if (loadingLogin) {
		return <div></div>;
	}

	const month_chart = {
		data: revenueByMonth, // Changed `data` to `revenue`
		xField: "month_year",
		yField: "revenue",
	};
	const year_chart = {
		data: revenueByYear, // Changed `data` to `revenue`
		xField: "year",
		yField: "revenue",
	};
		const date_chart = {
			data: revenueByDate, // Changed `data` to `revenue`
			xField: "order_day",
			yField: "revenue",
		};

	return (
		<div className="admin-home-screen">
			<AdminHeader label="admin" />
			<div className="all-centre-date-chart">
				all-centre-date-chart
				<Column {...date_chart} />
			</div>
			<div className="all-centre-month-chart">
				all-centre-month-chart
				<Column {...month_chart} />
			</div>
			<div className="all-centre-year-chart">
				all-centre-year-chart
				<Column {...year_chart} />
			</div>
		</div>
	);
};

export default AdminHomeScreen;
