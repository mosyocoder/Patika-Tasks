import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
	query getLocations {
		locations {
			id
			name
		}
	}
`;

export const GET_USERS = gql`
	query getUsers {
		users {
			id
			username
		}
	}
`;

export const CREATE_EVENT = gql`
	mutation createEvent($data: CreateEventInput!) {
		createEvent(data: $data) {
			id
		}
	}
`;
