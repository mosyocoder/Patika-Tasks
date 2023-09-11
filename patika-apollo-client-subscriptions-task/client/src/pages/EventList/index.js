import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { EVENT_SUBSCRIPTION, GET_EVENTS } from "./queries";
import { List, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import EventCounter from "../../components/EventCounter";

function EventList() {
	const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);


	useEffect(() => {
		subscribeToMore({
			document: EVENT_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				console.log(prev, subscriptionData);
				if (!subscriptionData.data) return prev;
				return {
					events: [...prev.events, subscriptionData.data.eventCreated],
				};
			},
		});
	}, [subscribeToMore]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<div className="counter">
				<EventCounter />
			</div>

			<div className={styles.scrollableDiv} id="scrollableDiv">
				<List>
					<InfiniteScroll dataLength={data.events.length} scrollableTarget="scrollableDiv" endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}>
						<List
							dataSource={data.events}
							renderItem={(item) => (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={
											<Link className={styles.listItemTitle} to={`/event/${item._id}`}>
												{item.title}
											</Link>
										}
										description={
											<Link className={styles.listItemDesc} to={`/event/${item._id}`}>
												{item.desc}
											</Link>
										}
									/>
									<div className={styles.date}>{`${item.date} / ${item.from}-${item.to}`}</div>
								</List.Item>
							)}></List>
					</InfiniteScroll>
				</List>
			</div>
		</>
	);
}

export default EventList;
