import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

function Nav() {
	const items = [
		{
			key: "/",
			label: <Link to="/">Home</Link>,
		},
		{
			key: "/createEvent",
			label: <Link to="/createEvent">Create Event</Link>,
		},
	];
	return <Menu className={styles.menu} mode="horizontal" items={items}></Menu>;
}

export default Nav;
