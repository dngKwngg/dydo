import React, { useState, useEffect } from "react";
import AdminHeader from "../components/adminHeader";
import { Table, Button, Modal, Select } from "antd";
import "./../styles/screens/adminHomeScreen.css";
const AdminMenuManagerScreen = () => {
	return (
		<div className="admin-home-screen">
			<AdminHeader label="menuManager" />
		</div>
	);
};
export default AdminMenuManagerScreen;
