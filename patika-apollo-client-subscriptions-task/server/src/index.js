const { events, locations, users, participants } = require("./data");
const { v4: uuidv4 } = require("uuid");
const { createYoga, createSchema } = require("graphql-yoga");
const { createServer } = require("node:http");
const pubSub = require("./pubsub");
const { withFilter } = require("graphql-subscriptions");

const yoga = createYoga({
	schema: createSchema({
		typeDefs: `
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

                participantCreated(event_id:ID): Participant!
                participantUpdated: Participant!
                participantDeleted: Participant!
                participantCount: Int!
            }
		`,
		resolvers: {
			Subscription: {
				eventCreated: {
					subscribe: () => pubSub.asyncIterator("eventCreated"),
				},
				eventUpdated: {
					subscribe: () => pubSub.asyncIterator("eventUpdated"),
				},
				eventDeleted: {
					subscribe: () => pubSub.asyncIterator("eventDeleted"),
				},
				eventCount: {
					subscribe: () => {
						setTimeout(() => {
							pubSub.publish("eventCount", { eventCount: events.length });
						}, 100);
						return pubSub.asyncIterator("eventCount");
					},
				},
				locationCreated: {
					subscribe: () => pubSub.asyncIterator("locationCreated"),
				},
				locationUpdated: {
					subscribe: () => pubSub.asyncIterator("locationUpdated"),
				},
				locationDeleted: {
					subscribe: () => pubSub.asyncIterator("locationDeleted"),
				},
				locationCount: {
					subscribe: () => {
						setTimeout(() => {
							pubSub.publish("locationCount", { locationCount: locations.length });
						}, 100);
						return pubSub.asyncIterator("locationCount");
					},
				},
				userCreated: {
					subscribe: () => pubSub.asyncIterator("userCreated"),
				},
				userUpdated: {
					subscribe: () => pubSub.asyncIterator("userUpdated"),
				},
				userDeleted: {
					subscribe: () => pubSub.asyncIterator("userDeleted"),
				},
				userCount: {
					subscribe: () => {
						setTimeout(() => {
							pubSub.publish("userCount", { userCount: users.length });
						}, 100);
						return pubSub.asyncIterator("userCount");
					},
				},
				participantCreated: {
					subscribe: withFilter(
						() => pubSub.asyncIterator("participantCreated"),

						(payload, variables) => (variables.event_id ? payload.participantCreated.event_id === variables.event_id : true),
					),
				},
				participantUpdated: {
					subscribe: () => pubSub.asyncIterator("participantUpdated"),
				},
				participantDeleted: {
					subscribe: () => pubSub.asyncIterator("participantDeleted"),
				},
				participantCount: {
					subscribe: () => {
						setTimeout(() => {
							pubSub.publish("participantCount", { participantCount: participants.length });
						}, 100);
						return pubSub.asyncIterator("participantCount");
					},
				},
			},

			Mutation: {
				createEvent: (_, { data }) => {
					const event = {
						id: uuidv4(),
						title: data.title,
						desc: data.desc,
						date: data.date,
						from: data.from,
						to: data.to,
						location_id: data.location_id,
						user_id: data.user_id,
					};

					events.push(event);
					pubSub.publish("eventCreated", { eventCreated: event });
					pubSub.publish("eventCount", { eventCount: events.length });

					return event;
				},
				updateEvent: (_, { id, data }) => {
					const event_index = events.findIndex((event) => event.id === Number(id));

					if (event_index === -1) {
						throw new Error("Event not found!");
					}

					const updated_event = (events[event_index] = {
						...events[event_index],
						...data,
					});

					pubSub.publish("eventUpdated", { eventUpdated: updated_event });

					return updated_event;
				},
				deleteEvent: (_, { id }) => {
					const event = events.findIndex((event) => event.id === Number(id));

					if (event === -1) {
						throw new Error("Event not found!");
					}
					const deleted_event = events[event];
					events.splice(event, 1);

					pubSub.publish("eventDeleted", { eventDeleted: deleted_event });
					pubSub.publish("eventCount", { eventCount: events.length });

					return deleted_event;
				},
				deleteAllEvents: () => {
					const length = events.length;
					events.splice(0, length);

					pubSub.publish("eventCount", { eventCount: events.length });

					return {
						count: length,
					};
				},
				createLocation: (_, { data }) => {
					const location = {
						id: uuidv4(),
						name: data.name,
						desc: data.desc,
						lat: data.lat,
						lng: data.lng,
					};

					locations.push(location);

					pubSub.publish("locationCreated", { locationCreated: location });
					pubSub.publish("locationCount", { locationCount: locations.length });

					return location;
				},
				updateLocation: (_, { id, data }) => {
					const location_index = locations.findIndex((location) => location.id === Number(id));

					if (location_index === -1) {
						throw new Error("Location not found!");
					}

					const updated_location = (locations[location_index] = {
						...locations[location_index],
						...data,
					});

					pubSub.publish("locationUpdated", { locationUpdated: updated_location });

					return updated_location;
				},
				deleteLocation: (_, { id }) => {
					const location = events.findIndex((location) => location.id === Number(id));

					if (location === -1) {
						throw new Error("Location not found!");
					}
					const deleted_location = locations[location];
					locations.splice(location, 1);

					pubSub.publish("locationDeleted", { locationDeleted: deleted_location });
					pubSub.publish("locationCount", { locationCount: locations.length });

					return deleted_location;
				},
				deleteAllLocations: () => {
					const length = locations.length;
					locations.splice(0, length);

					pubSub.publish("locationCount", { locationCount: locations.length });

					return {
						count: length,
					};
				},
				createUser: (_, { data }) => {
					const user = {
						id: uuidv4(),
						username: data.username,
						email: data.email,
					};
					users.push(user);

					pubSub.publish("userCreated", { userCreated: user });
					pubSub.publish("userCount", { userCount: users.length });

					return user;
				},
				updateUser: (_, { id, data }) => {
					const user_index = users.findIndex((user) => user.id === Number(id));

					if (user_index === -1) {
						throw new Error("User not found!");
					}

					const updated_user = (users[user_index] = {
						...users[user_index],
						...data,
					});

					pubSub.publish("userUpdated", { userUpdated: updated_user });

					return updated_user;
				},
				deleteUser: (_, { id }) => {
					const user = users.findIndex((user) => user.id === Number(id));

					if (user === -1) {
						throw new Error("User not found!");
					}
					const deleted_user = users[user];
					users.splice(user, 1);

					pubSub.publish("userDeleted", { userDeleted: deleted_user });
					pubSub.publish("userCount", { userCount: users.length });

					return deleted_user;
				},
				deleteAllUsers: () => {
					const length = users.length;
					users.splice(0, length);

					pubSub.publish("userCount", { userCount: users.length });

					return {
						count: length,
					};
				},
				createParticipant: (_, { data }) => {
					const participant = {
						id: uuidv4(),
						user_id: data.user_id,
						event_id: data.event_id,
					};
					participants.push(participant);

					pubSub.publish("participantCreated", { participantCreated: participant });
					pubSub.publish("participantCount", { participantCount: participants.length });

					return participant;
				},
				updateParticipant: (_, { id, data }) => {
					const participant_index = participants.findIndex((participant) => participant.id === Number(id));

					if (participant_index === -1) {
						throw new Error("Participant not found!");
					}

					const updated_participant = (participants[participant_index] = {
						...participants[participant_index],
						...data,
					});

					pubSub.publish("participantUpdated", { participantUpdated: updated_participant });

					return updated_participant;
				},
				deleteParticipant: (_, { id }) => {
					const participant = participants.findIndex((participant) => participant.id === Number(id));

					if (participant === -1) {
						throw new Error("Participant not found!");
					}
					const deleted_participant = participants[participant];
					participants.splice(participant, 1);

					pubSub.publish("participantDeleted", { participantDeleted: deleted_participant });
					pubSub.publish("participantCount", { participantCount: participants.length });

					return deleted_participant;
				},
				deleteAllParticipants: () => {
					const length = participants.length;
					participants.splice(0, length);

					pubSub.publish("participantCount", { participantCount: participants.length });

					return {
						count: length,
					};
				},
			},

			Query: {
				event: (_, args) => events.find((event) => event.id === Number(args.id)),
				events: () => events,

				location: (_, args) => locations.find((location) => location.id === Number(args.id)),
				locations: () => locations,

				user: (_, args) => users.find((user) => user.id === Number(args.id)),
				users: () => users,

				participant: (_, args) => participants.find((participant) => participant.id === Number(args.id)),
				participants: () => participants,
			},

			Event: {
				location: (parent) => locations.find((location) => location.id === Number(parent.location_id)),
				user: (parent) => users.find((user) => user.id === Number(parent.user_id)),
				participants: (parent) => participants.filter((participant) => participant.event_id === Number(parent.id)),
			},

			Participant: {
				user: (parent) => users.filter((user) => user.id === Number(parent.user_id)),
				event: (parent) => events.find((event) => event.id === Number(parent.event_id)),
			},
		},
	}),
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("🚀 Server ready at http://localhost:4000/graphql");
});
