const { gql, ApolloServer } = require("apollo-server");

const countries = require("./data");

const typeDefs = gql`
	type Country {
		id: ID!
		name: String!
		code: String!
		continent_code: String!
		emoji: String!
	}

	type Query {
		countries: [Country!]
	}
`;

const resolvers = {
	Query: {
		countries: () => countries,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Apollo server is up ${url}`);
});
