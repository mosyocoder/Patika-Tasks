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
		subscribe: async (_, __, { _db, pubsub }) => {
			setTimeout(async () => {
				const eventCount = await _db.Event.countDocuments();
				pubsub.publish("eventCount", { eventCount });
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
		subscribe: async (_, __, { _db, pubsub }) => {
			setTimeout(async () => {
				const locationCount = await _db.Location.countDocuments();
				pubsub.publish("locationCount", { locationCount });
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
		subscribe: async (_, __, { _db, pubsub }) => {
			setTimeout(async () => {
				const userCount = await _db.User.countDocuments();
				pubsub.publish("userCount", { userCount });
			}, 100);
			return pubsub.asyncIterator("userCount");
		},
	},
	participantCreated: {
		subscribe: withFilter(
			(_, __, { pubsub }) => pubsub.asyncIterator("participantCreated"),

			(payload, variables) => (variables.event_id ? payload.participantCreated.event === variables.event_id : true),
		),
	},
	participantUpdated: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("participantUpdated"),
	},
	participantDeleted: {
		subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("participantDeleted"),
	},
	participantCount: {
		subscribe: (_, __, { _db, pubsub }) => {
			setTimeout(async () => {
				const participantCount = await _db.Participant.countDocuments();
				pubsub.publish("participantCount", { participantCount });
			}, 100);
			return pubsub.asyncIterator("participantCount");
		},
	},
};
