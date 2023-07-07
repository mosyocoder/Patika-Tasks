import React from "react";
import styles from "./styles.module.css";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import Form from "../FormComponent";

function App() {
	return (
		<div className={styles.container}>
			<Title>Events Sync</Title>
			<Divider />
			<Form />
		</div>
	);
}

export default App;
