import React from "react";
import "./../styles/components/service.css";
const Service = () => {
	return (
		<div className="service-section">
			<div className="service-section-title">
				<p className="title">Dịch vụ của chúng tôi</p>
				<p className="subtitle">
					Với niềm đam mê, chúng tôi tạo ra những trải nghiệm ẩm thực
					khó quên và cung cấp dịch vụ tuyệt vời, kết hợp nghệ thuật
					ẩm thực với sự hiếu khách ấm áp.
				</p>
			</div>
			<div className="service-section-content">
				<div className="service-content-row">
					<div className="row-item">
						<img
							src={`${process.env.PUBLIC_URL}/images/food.png`}
						></img>
						<p>Món ăn đa dạng</p>
					</div>
					<div className="row-item">
						<img
							src={`${process.env.PUBLIC_URL}/images/wash.png`}
						></img>
						<p>Quy trình vệ sinh</p>
					</div>
				</div>
				<div className="service-content-row">
					<div className="row-item">
						<img
							src={`${process.env.PUBLIC_URL}/images/pay.png`}
						></img>
						<p>Thanh toán thuận tiện</p>
					</div>
					<div className="row-item">
						<img
							src={`${process.env.PUBLIC_URL}/images/staff.png`}
						></img>
						<p>Nhân viên tâm huyết</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Service;
