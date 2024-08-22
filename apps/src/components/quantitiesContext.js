// src/context/QuantitiesContext.js
import React, { createContext, useState, useContext } from "react";

const QuantitiesContext = createContext();

export const QuantitiesProvider = ({ children }) => {
	const [quantities, setQuantities] = useState({});

	const updateQuantity = (id, quantity) => {
		setQuantities((prevQuantities) => ({
			...prevQuantities,
			[id]: quantity,
		}));
	};

	return (
		<QuantitiesContext.Provider value={{ quantities, updateQuantity }}>
			{children}
		</QuantitiesContext.Provider>
	);
};

export const useQuantities = () => useContext(QuantitiesContext);
