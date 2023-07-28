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

export const EVENT_SUBSCRIPTION = gql`
	subscription eventCreated {
		eventCreated {
			id
			title
			desc
			date
			from
			to
		}
	}
`;
