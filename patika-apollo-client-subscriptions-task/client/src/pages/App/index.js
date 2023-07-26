import React from "react";
import styles from "./styles.module.css";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import EventList from "../EventList";
import Event from "../Event";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className={styles.container}>
			<Title>Events Sync</Title>
			<Divider />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<EventList />} />
					<Route path="/event/:id" element={<Event />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
