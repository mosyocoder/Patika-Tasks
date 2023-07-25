import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_EVENT, PARTICIPANTS_SUBSCRIPTION } from "../../queries";
import styles from "./styles.module.css";
import Loading from "../Loading";
import { Divider } from "antd";

function Event() {
	const { id } = useParams();

	const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
		variables: {
			id,
		},
	});

	const {
		loading: subload,
		error: suberror,
		data: subdata,
	} = useSubscription(PARTICIPANTS_SUBSCRIPTION, {
		variables: {
			event_id: id,
		},
	});

	useEffect(() => {
		if (!loading) {
			subscribeToMore({
				document: PARTICIPANTS_SUBSCRIPTION,
				variables: { event_id: id },
				updateQuery: (prev, { subscriptionData }) => {
					console.log("fadw");
					if (!subscriptionData.data) return prev;
					console.log(subscriptionData.data.participantCreated);
					const newParticipant = subscriptionData.data.participantCreated;
					return {
						event: {
							...prev.event,
							participants: [...prev.event.participants, newParticipant],
						},
					};
				},
			});
		}
	}, [loading, subscribeToMore, id]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	console.log(data.event);

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
				<p>{data.event.user.username}</p>
				<p>{data.event.user.email}</p>
			</div>
			<Divider>Location</Divider>
			<div className={styles.loc}>
				<p>{data.event.location.name}</p>
				<p>{data.event.location.desc}</p>
			</div>
			{data.event.participants.length === 0 ? <Divider>No Participant</Divider> : <Divider>Participants</Divider>}
			<ul>{data.event.participants && data.event.participants.map((participant, key) => <div key={key}>{participant.user.length > 0 && <li>{participant.user[0].username}</li>}</div>)}</ul>
		</div>
	);
}

export default Event;
