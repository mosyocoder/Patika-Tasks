import { Spin } from "antd";
import React from "react";

function Loading() {
	return (
		<Spin tip="Loading" size="large">
			<div className="content" />
		</Spin>
	);
}

export default Loading;
