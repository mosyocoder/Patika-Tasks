import { gql } from "@apollo/client";

export const ADD_QUESTION = gql`
	mutation addQuestion($input: [questions_insert_input!]!) {
		insert_questions(objects: $input) {
			affected_rows
		}
	}
`;
