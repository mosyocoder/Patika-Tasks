import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Row, Select, TimePicker } from "antd";
import { useMutation, useQuery } from "@apollo/client";

import styles from "./style.module.css";
import { CREATE_EVENT, GET_LOCATIONS, GET_USERS } from "./queries";

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

    const [addEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

    const handleClick = async () => {
		await addEvent({
			variables: {
				data: inputs,
			},
		});
    };

    const { loading: locationsLoading, error: locationsError, data: locationsData } = useQuery(GET_LOCATIONS);
    const locationsArray = [];
    if (!locationsLoading && !locationsError && locationsData) {
		locationsData.locations.forEach((item) => {
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

    const handleDate = (e, title) => {
		setInputs((prev) => ({
			...prev,
			date: title,
		}));
    };

    const handleHour = (e, title, name) => {
		name === "from"
			? setInputs((prev) => ({
					...prev,
					from: title,
			  }))
			: setInputs((prev) => ({
					...prev,
					to: title,
			  }));
    };

    return (
		<Row>
			<Form className={styles.form} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }} requiredMark>
				<Form.Item label="Title">
					<Input name="title" disabled={loading} onChange={handleChange} />
				</Form.Item>
				<Form.Item label="Description">
					<Input name="desc" disabled={loading} onChange={handleChange} />
				</Form.Item>
				<Form.Item label="Location">
					<Select title="fwas" disabled={loading} options={locationsArray} labelInValue onChange={handleSelect} />
				</Form.Item>
				<Form.Item label="User">
					<Select title="user_id" disabled={loading} options={usersArray} labelInValue onChange={handleSelect} />
				</Form.Item>
				<Form.Item label="Event Date">
					<DatePicker name="date" disabled={loading} onChange={(e, title) => handleDate(e, title)} format={"DD/MM/YYYY"} />
				</Form.Item>
				<Form.Item label="Event Hours">
					<TimePicker title="from" disabled={loading} placeholder="Start Time" format="HH:mm" onChange={(e, title, name = "from") => handleHour(e, title, name)} clearIcon={false} />
					<span> </span>
					<TimePicker name="to" disabled={loading} placeholder="Finish Time" format="HH:mm" onChange={(e, title, name = "to") => handleHour(e, title, name)} clearIcon={false} />
				</Form.Item>
				<Form.Item style={{ margin: 0 }} wrapperCol={{ offset: 11, span: 16 }}>
					<Button htmlType="submit" disabled={loading} loading={loading} onClick={() => handleClick()}>
						Add Event
					</Button>
				</Form.Item>
			</Form>
		</Row>
    );
}

export default FormComponent;
