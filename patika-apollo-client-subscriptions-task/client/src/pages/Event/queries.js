import { gql } from "@apollo/client";

export const PARTICIPANTS_SUBSCRIPTION = gql`
	subscription participantCreated($id: ID) {
		participantCreated(event_id: $id) {
			_id
			user {
				_id
				fullname
				email
			}
		}
	}
`;

export const GET_EVENT = gql`
	query getEvent($id: ID!) {
		event(id: $id) {
			title
			desc
			date
			from
			to
			user {
				fullname
				email
			}
			location {
				name
				desc
			}
			participants {
				user {
					fullname
					image
					email
					age
					gender
					phone
				}
			}
		}
	}
`;
