import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Loading() {
	return (
		<div>
			<Spin delay={300} indicator={<LoadingOutlined style={{ fontSize: 32, marginTop: 125 }} spin />} />
		</div>
	);
}

export default Loading;
