import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_EVENT } from "../../queries";
import styles from "./styles.module.css";
import Loading from "../Loading";
import { Divider } from "antd";

function Event() {
	const { id } = useParams();

	const { loading, error, data } = useQuery(GET_EVENT, {
		variables: {
			id,
		},
	});

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className={styles.cont}>
			<Divider>
				<h2>{data.event.title}</h2>
			</Divider>
			<div className={styles.desc}>
				<p>{data.event.desc}</p>
				<p>
					{data.event.date} / {data.event.from}-{data.event.to}
				</p>
			</div>
			<Divider>Event Owner</Divider>
			<div className={styles.user}>
				<p>{data.event.user[0].username}</p>
				<p>{data.event.user[0].email}</p>
			</div>
			<Divider>Location</Divider>
			<div className={styles.loc}>
				<p>{data.event.location[0].name}</p>
				<p>{data.event.location[0].desc}</p>
			</div>
			{data.event.participants.length === 0 ? <Divider>No Participant</Divider> : <Divider>Participants</Divider>}
			<ul>{data.event.participants && data.event.participants.map((participant, key) => <div key={key}>{participant.user.length > 0 && <li>{participant.user[0].username}</li>}</div>)}</ul>
		</div>
	);
}

export default Event;
