import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
	query getLocations {
		locations {
			_id
			name
		}
	}
`;

export const GET_USERS = gql`
	query getUsers {
		users {
			_id
			fullname
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation createEvent($data: CreateEventInput!) {
		createEvent(data: $data) {
			_id
			title
			desc
			date
			from
			to
			location {
				_id
			}
			user {
				fullname
			}
		}
	}
`;
