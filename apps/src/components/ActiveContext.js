import React, { createContext, useState, useContext } from 'react';

// Tạo context
const ActiveContext = createContext();

// Tạo provider
export const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState(0);

    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    );
};

// Hook để dễ dàng sử dụng context
export const useActive = () => useContext(ActiveContext);
