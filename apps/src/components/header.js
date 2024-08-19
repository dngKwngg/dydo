import React, { useState } from 'react';
import "./../styles/header.css";
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import MenuItem from './../components/menuItem';

import { useActive } from './ActiveContext';
const Header = () => {
	const navigate = useNavigate();
    const { active, setActive } = useActive();
	const menu_labels = [ 
		{
			name: "Đồ ăn",
			navigate: "/food"
		},
		{
			name: "Đồ uống",
			navigate: "/drink"
		},
		{
			name: "Hóa đơn",
			navigate: "/receipt"
		},
		{
			name: "Lịch sử",
			navigate: "/history"
		}
	];
    return (
		<div className="home-container">
			<div className="home-header">
				<div className='logo'>
					<a href="/" className="main-logo">
						DYDO
					</a>
				</div>
				{
					menu_labels.map((item, index) => {
						return (
							<MenuItem 
								number={index + 1} 
								name={item.name} 
								onClick={() => {
                                    navigate(item.navigate)
									setActive(index + 1);
								}}
								isActive={active === index + 1}
							></MenuItem>
						);
					})
				}
					<div className='log-out'>Đăng xuất</div>
				
			</div>
		</div>
	);
}

export default Header;
