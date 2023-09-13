import React from "react";
import { Form, Input } from "antd";

function NewQuestion() {
	return (
		<div>
			<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
				<Form.Item label="Question" rules={[{ required: true, message: "Please enter question name" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="Option 1" rules={[{ required: true, message: "You must enter at least two options" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="Option 2" rules={[{ required: true, message: "You must enter at least two options" }]}>
					<Input />
				</Form.Item>
			</Form>
		</div>
	);
}

export default NewQuestion;
