import { gql } from "apollo-server";

export const typeDefs = gql`
	type Event {
		id: ID!
		title: String!
		desc: String!
		date: String!
		from: String!
		to: String!
		location: Location!
		user: User!
		participants: [Participant!]!
	}

	input CreateEventInput {
		title: String!
		desc: String!
		date: String!
		from: String!
		to: String!
		location_id: ID!
		user_id: ID!
	}

	input UpdateEventInput {
		title: String
		desc: String
		date: String
		from: String
		to: String
		location_id: ID
		user_id: ID
	}

	type Location {
		id: ID!
		name: String!
		desc: String!
		lat: Float!
		lng: Float!
	}

	input CreateLocationInput {
		name: String!
		desc: String!
		lat: Float!
		lng: Float!
	}

	input UpdateLocationInput {
		name: String
		desc: String
		lat: Float
		lng: Float
	}

	type User {
		id: ID!
		username: String!
		email: String!
	}

	input CreateUserInput {
		username: String!
		email: String!
	}

	input UpdateUserInput {
		username: String
		email: String
	}

	type Participant {
		id: ID!
		user: [User!]!
		event: Event!
	}

	input CreateParticipantInput {
		user_id: ID!
		event_id: ID!
	}

	input UpdateParticipantInput {
		user_id: ID
		event_id: ID
	}

	type DeleteAllOutput {
		count: Int!
	}

	type Query {
		event(id: ID!): Event!
		events: [Event!]!

		location(id: ID!): Location!
		locations: [Location!]!

		user(id: ID!): User!
		users: [User!]!

		participant(id: ID!): Participant!
		participants: [Participant!]!
	}

	type Mutation {
		createEvent(data: CreateEventInput!): Event!
		updateEvent(id: ID!, data: UpdateEventInput!): Event!
		deleteEvent(id: ID!): Event!
		deleteAllEvents: DeleteAllOutput!

		createLocation(data: CreateLocationInput!): Location!
		updateLocation(id: ID!, data: UpdateLocationInput!): Location!
		deleteLocation(id: ID!): Location!
		deleteAllLocations: DeleteAllOutput!

		createUser(data: CreateUserInput!): User!
		updateUser(id: ID!, data: UpdateUserInput!): User!
		deleteUser(id: ID!): User!
		deleteAllUsers: DeleteAllOutput!

		createParticipant(data: CreateParticipantInput!): Participant!
		updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
		deleteParticipant(id: ID!): Participant!
		deleteAllParticipants: DeleteAllOutput!
	}

	type Subscription {
		eventCreated: Event!
		eventUpdated: Event!
		eventDeleted: Event!
		eventCount: Int!

		locationCreated: Location!
		locationUpdated: Location!
		locationDeleted: Location!
		locationCount: Int!

		userCreated: User!
		userUpdated: User!
		userDeleted: User!
		userCount: Int!

		participantCreated(event_id: ID): Participant!
		participantUpdated: Participant!
		participantDeleted: Participant!
		participantCount: Int!
	}
`;
