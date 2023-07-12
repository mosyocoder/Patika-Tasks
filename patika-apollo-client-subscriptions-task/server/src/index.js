const { events, locations, users, participants } = require("./data");

const pubSub = require("./pubsub");
const { createYoga, createSchema } = require("graphql-yoga");
const { createServer } = require("node:http");

const yoga = createYoga({
	schema: createSchema({
		typeDefs: `
    type Event {
        id:ID!
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
        user: [User!]!
        participants: [Participant!]!
        location: [Location!]!
    }

    input CreateEventInput {
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
    }

    input UpdateEventInput {
        title:String
        desc:String
        date:String
        from:String
        to:String
        location_id:ID
        user_id:ID
    }

    type Location {
        id:ID!
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }

    input CreateLocationInput {
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }

    input UpdateLocationInput {
        name:String
        desc:String
        lat:Float
        lng:Float
    }

    type User {
        id:ID!
        username:String!
        email:String!
    }

    input CreateUserInput {
        username:String!
        email:String!
    }

    input UpdateUserInput{
        username:String
        email:String
    }

    type Participant {
        id:ID!
        user_id:ID!
        event_id:ID!
        user: [User!]!
    }

    input CreateParticipantInput{
        user_id:ID!
        event_id:ID!
    }
    
    input UpdateParticipantInput{
        user_id:ID
        event_id:ID
    }

    type DeleteAllOutput{
        count: Int!
    }

    type Query {
        # USERS
        users: [User!]!
        user(id:ID!): User!

        # EVENTS
        events: [Event!]!
        event(id:ID!): Event!

        # PARTICIPANTS
        participants: [Participant!]!
        participant(id:ID!): Participant!

        # LOCATIONS
        locations: [Location!]!
        location(id:ID!): Location!

    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        updateUser(id:ID!,data: UpdateUserInput!): User!
        deleteUser(id:ID!): User!
        deleteAllUsers: DeleteAllOutput!

        createEvent(data: CreateEventInput!): Event!
        updateEvent(id:ID!, data:UpdateEventInput!): Event!
        deleteEvent(id:ID!): Event!
        deleteAllEvents: DeleteAllOutput!

        createLocation(data: CreateLocationInput!): Location!
        updateLocation(id:ID!, data: UpdateLocationInput!): Location!
        deleteLocation(id:ID!): Location!
        deleteAllLocations: DeleteAllOutput!

        createParticipant(data: CreateParticipantInput!): Participant!
        updateParticipant(id:ID!, data: UpdateParticipantInput!): Participant!
        deleteParticipant(id:ID!): Participant!
        deleteAllParticipants: DeleteAllOutput!
    }

    type Subscription {
        userCreated: User!
        eventCreated: Event!
        participantAdded: Participant!
    }
`,
		resolvers: {
			Subscription: {
				userCreated: {
					subscribe: () => pubSub.asyncIterator("userCreated"),
				},
				eventCreated: {
					subscribe: () => pubSub.asyncIterator("eventCreated"),
				},
				participantAdded: {
					subscribe: () => pubSub.asyncIterator("participantAdded"),
				},
			},
			Mutation: {
				// User Mutations
				createUser: (parent, { data }) => {
					const user = {
						id: Date.now(),
						...data,
					};
					users.push(user);
					pubSub.publish("userCreated", { userCreated: user });
					return user;
				},
				updateUser: (parent, { id, data }) => {
					const user_index = users.findIndex((user) => user.id === Number(id));
					if (user_index === -1) {
						throw new Error("User not found!");
					}
					const updatedUser = (users[user_index] = {
						...users[user_index],
						...data,
					});
					return updatedUser;
				},
				deleteUser: (parent, { id }) => {
					const user_index = users.findIndex((user) => user.id === Number(id));
					if (user_index === -1) {
						throw new Error("User not found!");
					}
					const deletedUser = users[user_index];
					users.splice(user_index, 1);
					return deletedUser;
				},
				deleteAllUsers: () => {
					const length = users.length;
					users.splice(0, length);
					return {
						count: length,
					};
				},

				// Event Mutations
				createEvent: (parent, { data }) => {
					const event = {
						id: Date.now(),
						...data,
					};
					events.push(event);
					pubSub.publish("eventCreated", { eventCreated: event });
					return event;
				},
				updateEvent: (parent, { id, data }) => {
					const event_index = events.findIndex((event) => event.id === Number(id));
					if (event_index === -1) {
						throw new Error("Event not found!");
					}
					const updatedEvent = (events[event_index] = {
						...events[event_index],
						...data,
					});
					return updatedEvent;
				},
				deleteEvent: (parent, { id }) => {
					const event_index = events.findIndex((event) => event.id === Number(id));
					if (event_index === -1) {
						throw new Error("Event not found!");
					}
					const deletedEvent = events[event_index];
					events.splice(event_index, 1);
					return deletedEvent;
				},
				deleteAllEvents: () => {
					const length = events.length;
					events.splice(0, length);
					return {
						count: length,
					};
				},

				// Location Mutations
				createLocation: (parent, { data }) => {
					const location = {
						id: Date.now(),
						...data,
					};
					locations.push(location);
					return location;
				},
				updateLocation: (parent, { id, data }) => {
					const location_index = events.findIndex((event) => event.id === Number(id));
					if (location_index === -1) {
						throw new Error("Location not found!");
					}
					const updatedLocation = (locations[location_index] = {
						...locations[location_index],
						...data,
					});
					return updatedLocation;
				},
				deleteLocation: (parent, { id }) => {
					const location_index = locations.findIndex((location) => location.id === Number(id));
					if (location_index === -1) {
						throw new Error("Location not found!");
					}
					const deletedLocation = locations[location_index];
					locations.splice(location_index, 1);
					return deletedLocation;
				},
				deleteAllLocations: () => {
					const length = locations.length;
					locations.splice(0, length);
					return {
						count: length,
					};
				},

				// Participant Mutations
				createParticipant: (parent, { data }) => {
					const participant = {
						id: Date.now(),
						...data,
					};
					participants.push(participant);
					pubSub.publish("participantAdded", { participantAdded: participant });
					return participant;
				},
				updateParticipant: (parent, { id, data }) => {
					const participant_index = participants.findIndex((participant) => participant.id === Number(id));
					if (participant_index === -1) {
						throw new Error("Participant not found!");
					}
					const updatedParticipant = (participants[participant_index] = {
						...participants[participant_index],
						...data,
					});
					return updatedParticipant;
				},
				deleteParticipant: (parent, { id, data }) => {
					const participant_index = participants.findIndex((participant) => participant.id === Number(id));
					if (participant_index === -1) {
						throw new Error("Participant not found!");
					}
					const deletedParticipant = participants[participant_index];
					participants.splice(participant_index, 1);
					return deletedParticipant;
				},
				deleteAllParticipants: () => {
					const length = participants.length;
					participants.splice(0, length);
					return {
						count: length,
					};
				},
			},

			Query: {
				// USERS
				users: () => users,
				user: (parent, args) => users.find((user) => user.id === Number(args.id)),

				// EVENTS
				events: () => events,
				event: (parent, args) => events.find((event) => event.id === Number(args.id)),

				// PARTICIPANTS
				participants: () => participants,
				participant: (parent, args) => participants.find((participant) => participant.id === Number(args.id)),

				//LOCATIONS
				locations: () => locations,
				location: (parent, args) => locations.find((location) => location.id === Number(args.id)),
			},

			Event: {
				user: (parent) => users.filter((user) => user.id === parent.id),
				participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
				location: (parent) => locations.filter((location) => location.id === parent.location_id),
			},

			Participant: {
				user: (parent) => users.filter((user) => user.id === parent.id),
			},
		},
	}),
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("🚀 Server is running on http://localhost:4000/graphql");
});
