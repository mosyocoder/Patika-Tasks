import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
	query getEvents {
		events {
			id
			title
			desc
			date
			from
			to
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
			location_id
			user_id
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
