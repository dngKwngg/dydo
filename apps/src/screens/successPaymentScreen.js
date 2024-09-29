import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../components/ListContext";
const SuccessPaymentScreen = () => {
	const { list, setList } = useContext(ListContext);
	useEffect(() => {
		setList([]);
	}, []);

	return (
		<div>
			<h4 class="payment-titlte">
				Thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ của payOS
				và DYDO!
			</h4>
			<p>
				Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{" "}
				<a href="mailto:support@payos.vn">support@payos.vn</a>
			</p>
			<a href="/home" id="return-page-btn">
				Trở về trang chủ
			</a>
		</div>
	);
};

export default SuccessPaymentScreen;
