import { useSubscription } from "@apollo/client";
import React from "react";
import { Avatar, Badge } from "antd";

import { EVENT_COUNT_SUBSCCRIPTION } from "./queries";

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
