import { withFilter } from "graphql-subscriptions";

export const Subscription = {
	eventCreated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventCreated"),
	},
	eventUpdated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventUpdated"),
	},
	eventDeleted: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("eventDeleted"),
	},
	eventCount: {
		subscribe: (_, __, { db, pubsub }) => {
			setTimeout(() => {
				pubsub.publish("eventCount", { eventCount: db.events.length });
				// pubSub.publish("eventCount", { eventCount: db.events.length });
			}, 100);
			return pubsub.asyncIterator("eventCount");
		},
	},
	locationCreated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("locationCreated"),
	},
	locationUpdated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("locationUpdated"),
	},
	locationDeleted: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("locationDeleted"),
	},
	locationCount: {
		subscribe: (_, __, { db, pubsub }) => {
			setTimeout(() => {
				pubsub.publish("locationCount", { locationCount: db.locations.length });
			}, 100);
			return pubsub.asyncIterator("locationCount");
		},
	},
	userCreated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
	},
	userUpdated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userUpdated"),
	},
	userDeleted: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userDeleted"),
	},
	userCount: {
		subscribe: (_, __, { db, pubsub }) => {
			setTimeout(() => {
				pubsub.publish("userCount", { userCount: db.users.length });
			}, 100);
			return pubsub.asyncIterator("userCount");
		},
	},
	participantCreated: {
		subscribe: withFilter(
			(_, __, { pubsub }) => pubsub.asyncIterator("participantCreated"),

			(payload, variables) => (variables.event_id ? payload.participantCreated.event_id === variables.event_id : true),
		),
	},
	participantUpdated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("participantUpdated"),
	},
	participantDeleted: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("participantDeleted"),
	},
	participantCount: {
		subscribe: (_, __, { db, pubsub }) => {
			setTimeout(() => {
				pubsub.publish("participantCount", { participantCount: db.participants.length });
			}, 100);
			return pubsub.asyncIterator("participantCount");
		},
	},
};
