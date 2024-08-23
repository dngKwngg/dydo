import React, { useState, useEffect, useContext } from "react";
import { Button } from "antd";
import { ListContext } from "./ListContext";
const ResetButton = () => {
	const { list, setList } = useContext(ListContext);
	const reset = () => {
		localStorage.removeItem("list");
		setList([]);
	};
	return (
		<div className="reset-button">
			<Button onClick={reset}>Reset ALL</Button>
		</div>
	);
};
export default ResetButton;
