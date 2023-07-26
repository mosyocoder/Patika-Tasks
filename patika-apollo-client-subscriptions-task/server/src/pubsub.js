import { RedisPubSub } from "graphql-redis-subscriptions";
import { Redis } from "ioredis";

const options = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	retryStrategy: (times) => {
		return Math.min(times * 50, 2000);
	},
};

export const pubsub = new RedisPubSub({
	publisher: new Redis(options),
	subscriber: new Redis(options),
});
