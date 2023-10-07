import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
	query getAllChars($page: Int!, $name: String!) {
		characters(page: $page, filter: { name: $name }) {
			results {
				id
				name
				species
				location {
					name
				}
				image
			}
			info {
				pages
				count
			}
		}
	}
`;

export const GET_LOCATIONS = gql`
	query allLocations {
		locations(filter: { name: "" }) {
			results {
				name
			}
		}
	}
`;
