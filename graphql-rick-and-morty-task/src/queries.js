import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
	query getAllChars($page: Int!, $name: String!, $gender: String!, $species: String!) {
		characters(page: $page, filter: { name: $name, gender: $gender, species: $species }) {
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
