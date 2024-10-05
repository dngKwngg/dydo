import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import "./../styles/screens/adminHomeScreen.css";
import { useNavigate } from "react-router-dom";
import { Column, Pie } from "@ant-design/plots";

const AdminHomeScreen = () => {
	const navigate = useNavigate();
	const [revenueAllCentreByMonth, setRevenueAllCentreByMonth] = useState([]);
	const [revenueAllCentreByYear, setRevenueAllCentreByYear] = useState([]);
	const [revenueAllCentreByDate, setRevenueAllCentreByDate] = useState([]);
	const [revenueCentreByYear, setRevenueCentreByYear] = useState([]);
	const [revenueCentreByMonth, setRevenueCentreByMonth] = useState([]);
	const [revenueCentreByDate, setRevenueCentreByDate] = useState([]);
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
				setRevenueAllCentreByMonth(data.data);
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
				setRevenueAllCentreByYear(data.data);
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
				setRevenueAllCentreByDate(data.data);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchDataYearByCentre = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getRevenueByYearForAdmin",
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
				setRevenueCentreByYear(data.data);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchDataMonthByCentre = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getRevenueByMonthForAdmin",
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
				setRevenueCentreByMonth(data.data);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchDataDateByCentre = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/order/getRevenueByDateForAdmin",
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
				
				const centreIds = [1, 2, 3, 4, 5];

				// Create the new data array
				const updatedRevenueData = centreIds.map((id) => {
					const foundData = data.data.find(
						(item) => item.centre_id === id
					);
					return {
						centre_id: id,
						revenue: foundData
							? parseInt(foundData.revenue, 10)
							: 0, // Set revenue to 0 if not found
					};
				});
				setRevenueCentreByDate(updatedRevenueData);
				console.log("revenue_y", data.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchDataMonth();
		fetchDataYear();
		fetchDataDate();
		fetchDataYearByCentre();
		fetchDataMonthByCentre();
		fetchDataDateByCentre();
	}, []);

	if (loadingLogin) {
		return <div></div>;
	}

	const all_centre_month_chart = {
		data: revenueAllCentreByMonth, // Changed `data` to `revenue`
		xField: "month_year",
		yField: "revenue",
	};
	const all_centre_year_chart = {
		data: revenueAllCentreByYear, // Changed `data` to `revenue`
		angleField: "revenue",
		colorField: "year",
	};
	const all_centre_date_chart = {
			data: revenueAllCentreByDate, // Changed `data` to `revenue`
			xField: "order_day",
			yField: "revenue",
	};
	const centre_year_chart = {
		data: revenueCentreByYear, // Changed `data` to `revenue`
		angleField: "revenue",
		colorField: "centre_id",
	};
	const centre_month_chart = {
		data: revenueCentreByMonth, // Changed `data` to `revenue`
		xField: "centre_id",
		yField: "revenue",
	};
	const centre_date_chart = {
		data: revenueCentreByDate, // Changed `data` to `revenue`
		xField: "centre_id",
		yField: "revenue",
	};
	return (
		<div className="admin-home-screen">
			<AdminHeader label="admin" />
			<div className="all-centre-date-chart">
				all-centre-date-chart
				<Column {...all_centre_date_chart} />
			</div>
			<div className="all-centre-month-chart">
				all-centre-month-chart
				<Column {...all_centre_month_chart} />
			</div>
			<div className="all-centre-year-chart">
				all-centre-year-chart
				<Pie {...all_centre_year_chart} />
			</div>
			<div className="centre-year-chart">
				centre-year-chart
				<Pie {...centre_year_chart} />
			</div>
			<div className="centre-month-chart">
				centre-month-chart
				<Column {...centre_month_chart} />
			</div>
			<div className="centre-date-chart">
				centre-date-chart
				<Column {...centre_date_chart} />
			</div>
		</div>
	);
};

export default AdminHomeScreen;
