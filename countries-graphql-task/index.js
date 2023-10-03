const { gql, ApolloServer } = require("apollo-server");

const { countries, languages, continents } = require("./data");

const typeDefs = gql`
	type Country {
		id: ID!
		name: String!
		code: String!
		continent: Continent!
		emoji: String!
		capital: String!
		languages: [Language!]!
	}

	type Language {
		id: ID!
		code: String!
		native: String!
		name: String!
	}

	type Continent {
		id: ID!
		name: String!
		code: String!
	}

	type Query {
		countries: [Country!]!
		country(code: String!): Country!

		languages: [Language!]!
		language(code: String!): Language!

		continents: [Continent!]!
		continent(code: String!): Continent!
	}
`;

const resolvers = {
	Query: {
		countries: () => countries,
		country: (_, args) => countries.find((country) => country.code === args.code),

		languages: () => languages,
		language: (_, args) => languages.find((language) => language.code === args.code),

		continents: () => continents,
		continent: (_, args) => continents.find((continent) => continent.code === args.code),
	},

	Country: {
		continent: (parent) => continents.find((continent) => parent.continent_code === continent.code),
		languages: (parent) => {
			const langs = [];
			parent.languages.map((language_id) => {
				langs.push(languages.find((language) => language.id === language_id));
			});
			return langs;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Apollo server is up ${url}`);
});
