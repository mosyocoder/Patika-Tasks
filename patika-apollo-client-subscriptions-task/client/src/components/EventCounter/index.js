import { useSubscription } from "@apollo/client";
import React from "react";
import { EVENT_COUNT_SUBSCCRIPTION } from "../../queries";
import { Avatar, Badge } from "antd";

function EventCounter() {
	const { loading, data } = useSubscription(EVENT_COUNT_SUBSCCRIPTION);

	return (
		<div>
			<Badge count={loading ? "?" : data.eventCount} size="small">
				<Avatar shape="square" size="medium">
					Posts
				</Avatar>
			</Badge>
		</div>
	);
}

export default EventCounter;
