import React, { useState } from "react";
import { GET_QUESTIONS } from "./queries";
import { useSubscription } from "@apollo/client";
import Loading from "../../components/Loading";
import { Button, Collapse, Radio } from "antd";

function Questions() {
	const [collapseId, setCollapseId] = useState();

	const { loading, error, data } = useSubscription(GET_QUESTIONS);

	if (loading) return <Loading />;

	if (error)
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1>Error: {error.message}</h1>
			</div>
		);

	const radioControl = (e) => {};

	const collapseControl = (e) => {
		setCollapseId(e);
	};

	const voteButtonControl = () => {
		const div = document.getElementById(`voting-div-${collapseId}`);
		div.innerHTML = "";
	};

	const collapseItems = [];
	if (data) {
		data.questions.map((item) => {
			collapseItems.push({
				key: item.id,
				label: item.title,
				showArrow: false,
				children: (
					<div id={`voting-div-${item.id}`}>
						<Radio.Group onChange={radioControl} key={item.id} style={{ display: "flex", flexDirection: "column" }}>
							{item.options.map((option) => (
								<Radio key={option.id} value={option.id} style={{ marginBottom: "10px" }}>
									{option.title}
								</Radio>
							))}
						</Radio.Group>
						<Button type="primary" onClick={voteButtonControl}>
							Vote !
						</Button>
					</div>
				),
			});
		});
	}

	return (
		<div>
			<Collapse accordion items={collapseItems} onChange={collapseControl} />
		</div>
	);
}

export default Questions;
