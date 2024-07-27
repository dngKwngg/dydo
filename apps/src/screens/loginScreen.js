import React from "react";
import "./../styles/loginScreen.css";
import { Typography, Input, Button, Image } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
const { Text } = Typography;

const LoginScreen = () => {
	return (
		<div className="container">
			<div className="form">
				<div className="login-header">
					<h1>Welcome to DYDO!</h1>
					<p>Nhập thông tin đăng nhập</p>
				</div>
				<div className="login-form">
					<div className="login-input">
						<div className="input-email">
							<Text type="secondary">Email</Text>
							<Input
								size="large"
								placeholder="Nhập email"
								prefix={<UserOutlined />}
							/>
						</div>
						<div className="input-password">
							<Text type="secondary">Mật khẩu</Text>
							<Input.Password
								size="large"
								placeholder="Nhập mật khẩu"
								iconRender={(visible) =>
									visible ? (
										<EyeTwoTone />
									) : (
										<EyeInvisibleOutlined />
									)
								}
								prefix={<LockOutlined />}
							/>
						</div>
					</div>
					<div className="login-button">
						<Button type="primary" size="large" shape="round">
							Đăng nhập
						</Button>
					</div>
					<div className="login-footer">
						<p>Quên mật khẩu?</p>
					</div>
				</div>
			</div>

			<div className="image">
				<img
					src="https://static.vinwonders.com/production/lau-nuong-ha-noi-banner.jpg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default LoginScreen;
