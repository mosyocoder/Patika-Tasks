import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
	subscription {
		questions {
			id
			title
			options {
				id
				title
			}
		}
	}
`;
