import React from "react";
import { Spin } from "antd";
import "./../styles/components/loading.css";
const Loading = ({ loading }) => {
    return (
    <div className="loading-container">
		<Spin spinning={loading} size="large" />
	</div>
    )
}
export default Loading;