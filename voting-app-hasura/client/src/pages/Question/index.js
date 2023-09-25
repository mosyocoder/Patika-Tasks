import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import { NEW_VOTE_MUTATION, QUESTION_DETAIL_SUBCRIPTION } from "./queries";
import { Button, Col, Progress, Radio, Row, message } from "antd";

function Question() {
	const { id } = useParams();

	const [isVoted, setIsVoted] = useState(false);
	const [selectedVote, setSelectedVote] = useState();

	const { loading, error, data } = useSubscription(QUESTION_DETAIL_SUBCRIPTION, {
		variables: { id },
	});

	const [newVote, { loading: voteLoading, data: voteData }] = useMutation(NEW_VOTE_MUTATION, {
		onCompleted: () => setIsVoted(true),
	});

	if (loading) return <Loading />;

	if (error)
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>Error: {error.message}</h1>
			</div>
		);

	const {
		questions_by_pk: { options, title },
	} = data;

	const total = options.reduce((t, value) => t + value.votes_aggregate.aggregate.count, 0);

	const handleVoteButton = () => {
		try {
			newVote({
				variables: {
					input: {
						option_id: selectedVote,
					},
				},
			});
			message.success("Voting success...!");
		} catch (e) {
			message.error("Error :", e.message);
		}
	};

	return (
		<Row>
			<Col span={24}>
				<h1>{title}</h1>
			</Col>
			<Col span={24}>
				<Radio.Group key={title} style={{ display: "flex", flexDirection: "column" }}>
					{options.map((option) => (
						<div key={option.id}>
							<Radio value={option.id} onChange={({ target }) => setSelectedVote(target.value)} style={{ marginBottom: "10px" }}>
								{option.title}
							</Radio>
							{isVoted && (
								<>
									<progress value={option.votes_aggregate.aggregate.count} max={total}></progress>
									<span className="votesDetail">%{((option.votes_aggregate.aggregate.count * 100) / (total === 0 ? 1 : total)).toFixed(2)}</span>
								</>
							)}
						</div>
					))}
				</Radio.Group>
				{!isVoted && (
					<Button type="primary" className="voteButton" onClick={handleVoteButton} disabled={voteLoading}>
						Vote !
					</Button>
				)}
			</Col>
		</Row>
	);
}

export default Question;
