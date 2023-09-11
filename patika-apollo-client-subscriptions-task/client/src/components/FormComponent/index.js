import React from "react";
import { Button, DatePicker, Form, Input, Row, Select, TimePicker, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";

import styles from "./style.module.css";
import { CREATE_EVENT, GET_LOCATIONS, GET_USERS } from "./queries";
import { useNavigate } from "react-router-dom";
import { GET_EVENTS } from "../../pages/EventList/queries";

function FormComponent() {
	const navigate = useNavigate();

	const { loading: locationsLoading, error: locationsError, data: locationsData } = useQuery(GET_LOCATIONS);
	const locationsArray = [];
	if (!locationsLoading && !locationsError && locationsData) {
		locationsData.locations.forEach((item) => {
			const data = {
				value: item._id,
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
				value: item._id,
				label: item.fullname,
				title: "user_id",
			};
			usersArray.push(data);
		});
	}

	const disabledDate = (current) => {
		return current && current <= moment().startOf("day");
	};

	const [form] = Form.useForm();

	const [createEvent] = useMutation(CREATE_EVENT);

	const handleFormSubmit = async (values) => {
		const val = {
			title: values.title,
			desc: values.desc,
			date: `${values.date.$y}-${values.date.$M + 1}-${values.date.$D}`,
			from: `${values.hours[0].$H < 9 ? "0" + values.hours[0].$H : values.hours[0].$H}:${values.hours[0].$m < 9 ? "0" + values.hours[0].$m : values.hours[0].$m}`,
			to: `${values.hours[1].$H < 9 ? "0" + values.hours[1].$H : values.hours[1].$H}:${values.hours[1].$m < 9 ? "0" + values.hours[1].$m : values.hours[1].$m}`,
			location: values.location,
			user: values.user,
		};
		try {
			await createEvent({
				variables: {
					data: val,
				},
				update: (cache, { data: { createEvent } }) => {
					const events = cache.readQuery({ query: GET_EVENTS });
					cache.writeQuery({
						query: GET_EVENTS,
						data: { events: [...events.events, createEvent] },
					});
				},
				onCompleted: navigate("/"),
			});
			message.success("Post Saved...!");
		} catch (e) {
			console.log(e);
			message.error("Post not saved...!");
		}
	};

	return (
		<Row>
			<Form className={styles.form} labelCol={{ span: 4 }} wrapperCol={{ span: 24 }} form={form} onFinish={handleFormSubmit}>
				<Form.Item label="Title" name="title" required rules={[{ required: true, message: "Please enter title" }]}>
					<Input placeholder="Please enter title" />
				</Form.Item>
				<Form.Item label="Description" name="desc" required rules={[{ required: true, message: "Please enter description" }]}>
					<Input.TextArea placeholder="Please enter description" />
				</Form.Item>
				<Form.Item label="Date" name="date" required rules={[{ required: true, message: "Please enter date" }]}>
					<DatePicker placeholder="Please select a date" style={{ width: "100%" }} disabledDate={disabledDate} />
				</Form.Item>
				<Form.Item name="hours" label="Event Hours" required>
					<TimePicker.RangePicker style={{ width: "100%" }} placeholder={["Select start time", "Select end time"]} format={"HH:mm"} />
				</Form.Item>
				<Form.Item label="Location" name="location" required rules={[{ required: true, message: "Please select a location" }]}>
					<Select placeholder="Please select a location" options={locationsArray} />
				</Form.Item>
				<Form.Item label="User" name="user" required rules={[{ required: true, message: "Please select a user" }]}>
					<Select placeholder="Please select a user" options={usersArray} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
}

export default FormComponent;
