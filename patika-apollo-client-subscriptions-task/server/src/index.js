import { typeDefs } from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import db from "./data";

import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { pubsub } from "./pubsub";

const yoga = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
	context: {
		db,
		pubsub,
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("🚀 Server ready at http://localhost:4000/graphql");
});
