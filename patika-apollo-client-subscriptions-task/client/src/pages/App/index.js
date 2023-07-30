import React from "react";
import styles from "./styles.module.css";
import Title from "antd/es/typography/Title";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Event from "../Event";
import EventList from "../EventList";
import Nav from "../../components/Nav";
import FormComponent from "../../components/FormComponent";

function App() {
	return (
		<div className={styles.container}>
			<Title>Events Sync</Title>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<EventList />} />
					<Route path="/createEvent" element={<FormComponent />} />
					<Route path="/event/:id" element={<Event />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
