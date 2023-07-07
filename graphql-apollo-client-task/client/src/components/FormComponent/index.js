import React from "react";
import styles from "./style.module.css";
import { Form, Input } from "antd";

function FormComponent() {
	return (
		<Form className={styles.form} style={{ width: 600 }}>
			<Form.Item label="Title">
				<Input />
			</Form.Item>
			<Form.Item label="Description">
				<Input />
			</Form.Item>
			<Form.Item label="Event Date">
				<Input />
			</Form.Item>
		</Form>
	);
}

export default FormComponent;
