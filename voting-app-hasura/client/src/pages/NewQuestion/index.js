import React from "react";
import { Button, Form, Input, message } from "antd";
import { v4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "./queries";
import { useNavigate } from "react-router-dom";

function NewQuestion() {
	const [addQuestion, { loading, error, data }] = useMutation(ADD_QUESTION);
	const navigate = useNavigate();

	const formControl = async (values) => {
		const filledOptions = [];

		values.options.map((opt) => {
			if (opt !== "") {
				filledOptions.push({
					title: opt,
				});
			}
		});

		const input = {
			title: values.question,
			options: {
				data: filledOptions,
			},
		};

		try {
			addQuestion({
				variables: {
					input,
				},
				onCompleted: navigate("/"),
			});
			message.success("Question is saved...!");
		} catch (e) {
			console.log("Error :", error.message);
			message.error("Question is not saved...!");
		}
	};

	return (
		<Form disabled={loading} name="vote_form" onFinish={formControl} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 600 }}>
			<Form.Item
				name="question"
				label="Question"
				rules={[
					{
						required: true,
						message: "Please enter a question!",
					},
				]}>
				<Input />
			</Form.Item>

			<Form.List
				name="options"
				initialValue={["", ""]} // Başlangıçta 2 boş seçenek olacak
			>
				{(fields, { add }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Form.Item
								{...restField}
								name={[name]}
								key={key}
								label={`Option ${key + 1}`} // İlk iki seçenek için A ve B etiketleri, sonra artarak devam eder
								rules={[
									{
										required: key < 2 ? true : false,
										message: "Please enter an option!",
									},
								]}>
								<Input onClick={() => (fields.length === key + 1 ? add("") : "")} onFocus={() => (fields.length === key + 1 ? add("") : "")} />
							</Form.Item>
						))}
					</>
				)}
			</Form.List>

			<Form.Item style={{ float: "right" }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

export default NewQuestion;
