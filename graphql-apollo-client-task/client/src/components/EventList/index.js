import React from "react";
import styles from "./styles.module.css";
import Loading from "../Loading";
import Form from "../FormComponent";

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../queries";
import { List, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

function EventList() {
	const { loading, error, data } = useQuery(GET_EVENTS);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<Form />
			<div className={styles.scrollableDiv} id="scrollableDiv">
				<List>
					<InfiniteScroll dataLength={data.events.length} scrollableTarget="scrollableDiv" endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}>
						<List
							dataSource={data.events}
							renderItem={(item) => (
								<List.Item key={item.id}>
									<List.Item.Meta
										title={
											<Link className={styles.listItemTitle} to={`/event/${item.id}`}>
												{item.title}
											</Link>
										}
										description={
											<Link className={styles.listItemDesc} to={`/event/${item.id}`}>
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
