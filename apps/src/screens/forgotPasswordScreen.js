import React from "react";
import { Form, Input, Button, message } from "antd";
import "./../styles/screens/forgotPasswordScreen.css";
import { useNavigate } from "react-router-dom";
const ForgotPasswordScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	
	const onFinish = async (values) => {
        console.log(values);
		console.log(JSON.stringify(values));
		
		try {
			const response = await fetch(`http://localhost:8080/auth/forgot-password`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values)
				}
			);

			const res = await response.json();
			if (res.status === "Success") {
                navigate(`/reset-password?email=${encodeURIComponent(values.email)}`); // Pass email as URL parameter
            } else {
                const error = () => {
                    messageApi.open({
                        type: "error",
                        content: `${res.message}. Please try again!`,
                    });
                };
                error();
            }
		} catch (e) {
			console.error(e);
		}
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
	return (
		<div className = "forgot-password-screen" >
			{contextHolder}
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/images/dydo.png`}></img>
            </div>
            <div className="forgot-password-description">
                <p>
                    Enter the email address associated with your account and
                    we'll send you an OTP to reset your password
                </p>
            </div>
            <div className="forgot-password-form">
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
			</div>
			<div className="forgot-password-route">
				<p>
					Already have an account?{" "}
					<a href="/login">Login</a>
				</p>
			</div>
			<div className="forgot-password-copyright">
				<p>© 2024 DyDo Restaurant</p>
			</div>
        </div>
    );
}

export default ForgotPasswordScreen;