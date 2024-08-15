import React from "react";
import "./../styles/loginScreen.css";
import { Typography, Input, Button, Form, Checkbox } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom"
const { Text } = Typography;

const LoginScreen = () => {
	const navigate = useNavigate()
	const onFinish = async (values) => {
		console.log("Success:", values);
		console.log(JSON.stringify(values))
		
		// Fetch data
		try {
			const response = await fetch(`http://localhost:8080/auth/login`,
				{
					method: "POST",
					headers: {
                        "Content-Type": "application/json",
                    },
					body: JSON.stringify(values)
				}
			);

			const res = await response.json();
			console.log(res.status);
			// console.log(res.user.role);
			if (res.status == "Success") {
				navigate('/')
			}

		} catch (e) {
			console.error(e);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<div className="container">
			<div className="form">
				<div className="login-header">
					<h1>Welcome to DYDO!</h1>
					<p>Nhập thông tin đăng nhập</p>
				</div>
				<div className="login-form">
					
					<Form
						name="basic"
						
						wrapperCol={{
							span: 16,
						}}
						style={{
							maxWidth: 600,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Username"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						{/* <Form.Item
							name="remember"
							valuePropName="checked"
						>
							<Checkbox>Remember me</Checkbox>
						</Form.Item> */}

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>

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
