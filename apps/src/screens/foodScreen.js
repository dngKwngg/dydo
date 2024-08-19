import React, { useState } from 'react';
import "./../styles/homeScreen.css";
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import Header from './../components/header';
import HomeScreen from './homeScreen';
const FoodScreen = () => {
    return (
		<div>
			<Header/>
		</div>
	);
}

export default FoodScreen;
