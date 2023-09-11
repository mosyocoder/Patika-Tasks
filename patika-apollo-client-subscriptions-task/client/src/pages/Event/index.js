import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Card, Divider } from "antd";

import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import { GET_EVENT, PARTICIPANTS_SUBSCRIPTION } from "./queries";
import Meta from "antd/es/card/Meta";
import { MailOutlined, ManOutlined, PhoneOutlined, WomanOutlined } from "@ant-design/icons";

function Event() {
	const { id } = useParams();

	const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
		variables: {
			id,
		},
	});

	useEffect(() => {
		if (!loading) {
			subscribeToMore({
				document: PARTICIPANTS_SUBSCRIPTION,
				variables: { event_id: id },
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev;
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
				<p>{data.event.user.fullname}</p>
				<p>{data.event.user.email}</p>
			</div>
			<Divider>Location</Divider>
			<div className={styles.loc}>
				<p>{data.event.location.name}</p>
				<p>{data.event.location.desc}</p>
			</div>
			{data.event.participants.length === 0 ? <Divider>No Participant</Divider> : <Divider>Participants</Divider>}
			{data.event.participants && (
				<div className={styles.participants}>
					{data.event.participants.map((item, key) => (
						<div key={key} className={styles.participant}>
							<img src={item.user.image} alt="" />
							<h3>{item.user.fullname}</h3>
							<div className={styles.ageGender}>
								{item.user.gender === "male" ? <ManOutlined /> : <WomanOutlined />}
								<Divider type="vertical"></Divider>
								<h4>{item.user.age}</h4>
							</div>
							<p>{item.user.phone}</p>
							<p>{item.user.email}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Event;
