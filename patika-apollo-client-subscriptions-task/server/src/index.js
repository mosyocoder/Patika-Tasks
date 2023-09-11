import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";

import types from "./graphql/types";
import resolvers from "./graphql/resolvers";
import { pubsub } from "./pubsub";
import data from "./data";

import db from "./db";
import Event from "./models/Event";
import Location from "./models/Location";
import Participant from "./models/Participant";
import User from "./models/User";

db();

const yoga = createYoga({
	schema: createSchema({
		typeDefs: types,
		resolvers,
	}),
	context: {
		db: data,
		pubsub,
		_db: {
			User,
			Event,
			Location,
			Participant,
		},
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("🚀 Server ready at http://localhost:4000/graphql");
});
