import React from "react";
import styles from "./style.module.css";
import { Button, Form, Input } from "antd";

function FormComponent() {
	return (
		<Form className={styles.form} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
			<Form.Item label="Title">
				<Input />
			</Form.Item>
			<Form.Item label="Description">
				<Input />
			</Form.Item>
			<Form.Item label="Event Date">
				<Input />
			</Form.Item>
			<Form.Item style={{ margin: 0 }} wrapperCol={{ offset: 11, span: 16 }}>
				<Button htmlType="submit">Add Event</Button>
			</Form.Item>
		</Form>
	);
}

export default FormComponent;
