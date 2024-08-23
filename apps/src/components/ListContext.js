// ListContext.js
import React, { createContext, useState, useEffect } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
	const [list, setList] = useState(() => {
		const saveList = localStorage.getItem("list");
		return saveList !== null ? JSON.parse(saveList) : [];
	});

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);

	return (
		<ListContext.Provider value={{ list, setList }}>
			{children}
		</ListContext.Provider>
	);
};
