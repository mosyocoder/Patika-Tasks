import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
	query getEvents {
		events {
			_id
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
			_id
			title
			desc
			date
			from
			to
		}
	}
`;
