import React from 'react';
import "./../styles/homeScreen.css";
import Header from './../components/header';
import { useActive } from "./../components/ActiveContext";

const HomeScreen = () => {
    const { active } = useActive(); // Truy cập trạng thái active

    return (
        <div className="home-screen">
            <Header />
            {/* Nội dung khác của HomeScreen */}
            <p>Trạng thái hiện tại của tab là: {active}</p>
        </div>
    );
}

export default HomeScreen;
