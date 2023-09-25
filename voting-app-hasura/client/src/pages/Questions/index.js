import React from "react";
import { useSubscription } from "@apollo/client";
import { List } from "antd";

import Loading from "../../components/Loading";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import { Link } from "react-router-dom";

function Questions() {
	const { loading, error, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

	if (loading) return <Loading />;

	if (error)
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>Error: {error.message}</h1>
			</div>
		);

	return (
		<div>
			<List
				className="questionList"
				dataSource={data.questions}
				renderItem={(item) => (
					<List.Item>
						<Link to={`/question/${item.id}`}>{item.title}</Link>
					</List.Item>
				)}></List>
		</div>
	);
}

export default Questions;
