import { gql } from "@apollo/client";

export const PARTICIPANTS_SUBSCRIPTION = gql`
	subscription participantCreated($id: ID) {
		participantCreated(event_id: $id) {
			id
			user {
				id
				username
				email
			}
		}
	}
`;

export const GET_EVENT = gql`
	query getEvent($id: ID!) {
		event(id: $id) {
			id
			title
			desc
			date
			from
			to
			user {
				id
				username
				email
			}
			participants {
				user {
					username
					email
				}
			}
			location {
				id
				name
				desc
				lat
				lng
			}
		}
	}
`;
