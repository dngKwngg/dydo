import React from "react";
import { Button, Card } from "antd";
import "./../styles/components/homeBanner.css"

const HomeBanner = () => {
	return (
        <div className="home-banner">
            <div className="home-banner-content">
                <h1 className="home-banner-title">
                    Thưởng thức tinh hoa ẩm thực đỉnh cao
                </h1>
                <p className="home-banner-subtitle">
                    Mỗi món ăn là một câu chuyện về sự tinh tế và tâm huyết của
                    người đầu bếp
                </p>
                <div className="home-banner-btns">
                    <Button type="primary" size="large">
                        Thưởng thức ngay
                    </Button>
                    <Button type="default" size="large">
                        Khám phá menu
                    </Button>
                </div>
            </div>
            <div className="home-banner-picture">
                <div className="home-banner-img">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/home-dishes.png`}
                        alt="Dishes"
                    />
                </div>
                <div className="home-banner-options">
                    <Card title="" size="small">
                        <img src="https://hotel84.com/hotel84-images/news/photo/bo-nuong-than-hoa-a-choen.jpg"></img>
                        <div className="options-content">
                            <h3>Bò nướng DYDO</h3>
                            <span>89.000 VND</span>
                        </div>
                    </Card>
                    <Card title="" size="small">
                        <img src="https://gofood.vn//upload/r/tong-hop-tin-tuc/huong-dan-mon-ngon/lau-thai-tomyum-gofood-anh-3.jpg"></img>
                        <div className="options-content">
                            <h3>Lẩu thái Tomyum</h3>
                            <span>169.000 VND</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;