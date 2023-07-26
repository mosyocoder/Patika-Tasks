import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";

const yoga = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers,
	}),
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("🚀 Server ready at http://localhost:4000/graphql");
});
