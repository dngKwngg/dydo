import React from "react";
import "./../styles/screens/loginScreen.css";
import { Typography, Input, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const LoginScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const loginFailed = () => {
		messageApi.open({
			type: "error",
			content: "Wrong Username or Password ",
		});
	};

	const navigate = useNavigate();
	const onFinish = async (values) => {
		console.log("Success:", values);
		console.log(JSON.stringify(values));

		// Fetch data
		try {
			const response = await fetch(`http://localhost:8080/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const res = await response.json();
			console.log(res.status);
			// console.log(res.user.role);
			if (res.status == "Success") {
				localStorage.setItem("user", JSON.stringify(res.user));
				localStorage.setItem("accessToken", res.token);
				if (res.user.role === "admin") {
					navigate("/admin");
				} else {
					navigate("/home");
				}
			} else {
				loginFailed();
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
			{contextHolder}
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

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>

					<div className="login-footer">
						<a href="/forgot-password">
							<p>Quên mật khẩu?</p>
						</a>
					</div>
				</div>
				<div className="login-crediental">
					<p>© 2024 DyDo Restaurant</p>
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
