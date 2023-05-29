const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { events, locations, users, participants } = require("./data");

const typeDefs = `
    type Event {
        id:ID!
        title:String!
        desc:String!
        date:String!
        from:String!
        to:String!
        location_id:ID!
        user_id:ID!
        user: User!
        participants: [Participant!]!
        location: Location!
    }

    type Location {
        id:ID!
        name:String!
        desc:String!
        lat:Float!
        lng:Float!
    }

    type User {
        id:ID!
        username:String!
        email:String!
    }

    type Participant {
        id:ID!
        user_id:ID!
        event_id:ID!
        user: User!
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
`;

const resolvers = {
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
		user: (parent) => users.find((user) => user.id === parent.user_id),
		participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
		location: (parent) => locations.find((location) => location.id === parent.location_id),
	},

	Participant: {
		user: (parent) => users.find((user) => user.id === parent.user_id),
	},
};

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})] });

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
