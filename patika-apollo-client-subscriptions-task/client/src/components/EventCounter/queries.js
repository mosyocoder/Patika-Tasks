import { gql } from "@apollo/client";

export const EVENT_COUNT_SUBSCCRIPTION = gql`
	subscription {
		eventCount
	}
`;
