import React from "react";
import { Form, Input, Button, message } from "antd";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./../styles/screens/resetPasswordScreen.css";

const ResetPasswordScreen = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
	const email = queryParams.get("email"); // Get email from query parameters
	console.log(email);
    const onFinish = async (values) => {
        console.log(values);
        console.log(JSON.stringify(values));

        try {
            const response = await fetch(
                `http://localhost:8080/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
					body: JSON.stringify({
						email: email,
						otp: values.otp,
						newPassword: values.newPassword
					})
                }
            );

            const res = await response.json();
            if (res.status == "Success") {
                const success = () => {
                    messageApi.open({
                        type: "success",
                        content: "Reset successful",
                    });
                };
				success();
				setTimeout(() => {
					navigate(`/login`);
				}, 2000);
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
        <div className="reset-password-screen">
            {contextHolder}
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/images/dydo.png`}></img>
            </div>
            <div className="reset-password-description">
                <p>
                    Verify OTP sent to {email}. Enter your new password below.
                </p>
            </div>
            <div className="reset-password-form">
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
                        label="OTP"
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: "Please type your otp!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please type your new password!",
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
            </div>
            <div className="reset-password-route">
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
            <div className="reset-password-copyright">
                <p>© 2024 DyDo Restaurant</p>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
