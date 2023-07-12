import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, DatePicker, Form, Input, Row, Select, TimePicker } from "antd";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS, GET_USERS } from "../../queries";

function FormComponent() {
	const [inputs, setInputs] = useState({
		title: "",
		desc: "",
		date: "",
		from: "",
		to: "",
		location_id: "",
		user_id: "",
	});

	const handleClick = () => {
		console.log("dsaw");
	};

	const { loading, error, data } = useQuery(GET_LOCATIONS);
	const locationsArray = [];
	if (!loading && !error && data) {
		data.locations.forEach((item) => {
			const data = {
				value: item.id,
				label: item.name,
				title: "location_id",
			};
			locationsArray.push(data);
		});
	}

	const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USERS);
	const usersArray = [];
	if (!userLoading && !userError && userData) {
		userData.users.forEach((item) => {
			const data = {
				value: item.id,
				label: item.username,
				title: "user_id",
			};
			usersArray.push(data);
		});
	}

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSelect = (value) => {
		setInputs((prev) => ({
			...prev,
			[value.title]: value.value,
		}));
	};

	const handleDate = (e) => {
		console.log(e.$D + "-" + (e.$M + 1) + "-" + e.$y);
	};

	console.log(inputs);

	return (
		<Row>
			<Form className={styles.form} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
				<Form.Item label="Title">
					<Input name="title" onChange={handleChange} />
				</Form.Item>
				<Form.Item label="Description">
					<Input name="desc" onChange={handleChange} />
				</Form.Item>
				<Form.Item label="Location">
					<Select title="fwas" options={locationsArray} labelInValue onChange={handleSelect} />
				</Form.Item>
				<Form.Item label="User">
					<Select title="user_id" options={usersArray} labelInValue onChange={handleSelect} />
				</Form.Item>
				<Form.Item label="Event Date">
					<DatePicker name="date" onChange={handleDate} format={"DD/MM/YYYY"} />
				</Form.Item>
				<Form.Item label="Event Hours">
					<TimePicker name="from" placeholder="Start Time" onChange={handleChange} />
					<span> </span>
					<TimePicker name="to" placeholder="Finish Time" onChange={handleChange} />
				</Form.Item>
				<Form.Item style={{ margin: 0 }} wrapperCol={{ offset: 11, span: 16 }}>
					<Button htmlType="submit" onClick={() => handleClick()}>
						Add Event
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
}

export default FormComponent;
