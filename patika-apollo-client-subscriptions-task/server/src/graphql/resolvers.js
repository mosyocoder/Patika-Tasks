import { events, locations, users, participants } from "../data";
import pubSub from "../pubsub";

import { withFilter } from "graphql-subscriptions";
import { v4 } from "uuid";

export default {
	Subscription: {
		eventCreated: {
			subscribe: () => pubSub.asyncIterator("eventCreated"),
		},
		eventUpdated: {
			subscribe: () => pubSub.asyncIterator("eventUpdated"),
		},
		eventDeleted: {
			subscribe: () => pubSub.asyncIterator("eventDeleted"),
		},
		eventCount: {
			subscribe: () => {
				setTimeout(() => {
					pubSub.publish("eventCount", { eventCount: events.length });
				}, 100);
				return pubSub.asyncIterator("eventCount");
			},
		},
		locationCreated: {
			subscribe: () => pubSub.asyncIterator("locationCreated"),
		},
		locationUpdated: {
			subscribe: () => pubSub.asyncIterator("locationUpdated"),
		},
		locationDeleted: {
			subscribe: () => pubSub.asyncIterator("locationDeleted"),
		},
		locationCount: {
			subscribe: () => {
				setTimeout(() => {
					pubSub.publish("locationCount", { locationCount: locations.length });
				}, 100);
				return pubSub.asyncIterator("locationCount");
			},
		},
		userCreated: {
			subscribe: () => pubSub.asyncIterator("userCreated"),
		},
		userUpdated: {
			subscribe: () => pubSub.asyncIterator("userUpdated"),
		},
		userDeleted: {
			subscribe: () => pubSub.asyncIterator("userDeleted"),
		},
		userCount: {
			subscribe: () => {
				setTimeout(() => {
					pubSub.publish("userCount", { userCount: users.length });
				}, 100);
				return pubSub.asyncIterator("userCount");
			},
		},
		participantCreated: {
			subscribe: withFilter(
				() => pubSub.asyncIterator("participantCreated"),

				(payload, variables) => (variables.event_id ? payload.participantCreated.event_id === variables.event_id : true),
			),
		},
		participantUpdated: {
			subscribe: () => pubSub.asyncIterator("participantUpdated"),
		},
		participantDeleted: {
			subscribe: () => pubSub.asyncIterator("participantDeleted"),
		},
		participantCount: {
			subscribe: () => {
				setTimeout(() => {
					pubSub.publish("participantCount", { participantCount: participants.length });
				}, 100);
				return pubSub.asyncIterator("participantCount");
			},
		},
	},

	Mutation: {
		createEvent: (_, { data }) => {
			const event = {
				id: v4(),
				title: data.title,
				desc: data.desc,
				date: data.date,
				from: data.from,
				to: data.to,
				location_id: data.location_id,
				user_id: data.user_id,
			};

			events.push(event);
			pubSub.publish("eventCreated", { eventCreated: event });
			pubSub.publish("eventCount", { eventCount: events.length });

			return event;
		},
		updateEvent: (_, { id, data }) => {
			const event_index = events.findIndex((event) => event.id === Number(id));

			if (event_index === -1) {
				throw new Error("Event not found!");
			}

			const updated_event = (events[event_index] = {
				...events[event_index],
				...data,
			});

			pubSub.publish("eventUpdated", { eventUpdated: updated_event });

			return updated_event;
		},
		deleteEvent: (_, { id }) => {
			const event = events.findIndex((event) => event.id === Number(id));

			if (event === -1) {
				throw new Error("Event not found!");
			}
			const deleted_event = events[event];
			events.splice(event, 1);

			pubSub.publish("eventDeleted", { eventDeleted: deleted_event });
			pubSub.publish("eventCount", { eventCount: events.length });

			return deleted_event;
		},
		deleteAllEvents: () => {
			const length = events.length;
			events.splice(0, length);

			pubSub.publish("eventCount", { eventCount: events.length });

			return {
				count: length,
			};
		},
		createLocation: (_, { data }) => {
			const location = {
				id: v4(),
				name: data.name,
				desc: data.desc,
				lat: data.lat,
				lng: data.lng,
			};

			locations.push(location);

			pubSub.publish("locationCreated", { locationCreated: location });
			pubSub.publish("locationCount", { locationCount: locations.length });

			return location;
		},
		updateLocation: (_, { id, data }) => {
			const location_index = locations.findIndex((location) => location.id === Number(id));

			if (location_index === -1) {
				throw new Error("Location not found!");
			}

			const updated_location = (locations[location_index] = {
				...locations[location_index],
				...data,
			});

			pubSub.publish("locationUpdated", { locationUpdated: updated_location });

			return updated_location;
		},
		deleteLocation: (_, { id }) => {
			const location = events.findIndex((location) => location.id === Number(id));

			if (location === -1) {
				throw new Error("Location not found!");
			}
			const deleted_location = locations[location];
			locations.splice(location, 1);

			pubSub.publish("locationDeleted", { locationDeleted: deleted_location });
			pubSub.publish("locationCount", { locationCount: locations.length });

			return deleted_location;
		},
		deleteAllLocations: () => {
			const length = locations.length;
			locations.splice(0, length);

			pubSub.publish("locationCount", { locationCount: locations.length });

			return {
				count: length,
			};
		},
		createUser: (_, { data }) => {
			const user = {
				id: v4(),
				username: data.username,
				email: data.email,
			};
			users.push(user);

			pubSub.publish("userCreated", { userCreated: user });
			pubSub.publish("userCount", { userCount: users.length });

			return user;
		},
		updateUser: (_, { id, data }) => {
			const user_index = users.findIndex((user) => user.id === Number(id));

			if (user_index === -1) {
				throw new Error("User not found!");
			}

			const updated_user = (users[user_index] = {
				...users[user_index],
				...data,
			});

			pubSub.publish("userUpdated", { userUpdated: updated_user });

			return updated_user;
		},
		deleteUser: (_, { id }) => {
			const user = users.findIndex((user) => user.id === Number(id));

			if (user === -1) {
				throw new Error("User not found!");
			}
			const deleted_user = users[user];
			users.splice(user, 1);

			pubSub.publish("userDeleted", { userDeleted: deleted_user });
			pubSub.publish("userCount", { userCount: users.length });

			return deleted_user;
		},
		deleteAllUsers: () => {
			const length = users.length;
			users.splice(0, length);

			pubSub.publish("userCount", { userCount: users.length });

			return {
				count: length,
			};
		},
		createParticipant: (_, { data }) => {
			const participant = {
				id: v4(),
				user_id: data.user_id,
				event_id: data.event_id,
			};
			participants.push(participant);

			pubSub.publish("participantCreated", { participantCreated: participant });
			pubSub.publish("participantCount", { participantCount: participants.length });

			return participant;
		},
		updateParticipant: (_, { id, data }) => {
			const participant_index = participants.findIndex((participant) => participant.id === Number(id));

			if (participant_index === -1) {
				throw new Error("Participant not found!");
			}

			const updated_participant = (participants[participant_index] = {
				...participants[participant_index],
				...data,
			});

			pubSub.publish("participantUpdated", { participantUpdated: updated_participant });

			return updated_participant;
		},
		deleteParticipant: (_, { id }) => {
			const participant = participants.findIndex((participant) => participant.id === Number(id));

			if (participant === -1) {
				throw new Error("Participant not found!");
			}
			const deleted_participant = participants[participant];
			participants.splice(participant, 1);

			pubSub.publish("participantDeleted", { participantDeleted: deleted_participant });
			pubSub.publish("participantCount", { participantCount: participants.length });

			return deleted_participant;
		},
		deleteAllParticipants: () => {
			const length = participants.length;
			participants.splice(0, length);

			pubSub.publish("participantCount", { participantCount: participants.length });

			return {
				count: length,
			};
		},
	},

	Query: {
		event: (_, args) => events.find((event) => event.id === Number(args.id)),
		events: () => events,

		location: (_, args) => locations.find((location) => location.id === Number(args.id)),
		locations: () => locations,

		user: (_, args) => users.find((user) => user.id === Number(args.id)),
		users: () => users,

		participant: (_, args) => participants.find((participant) => participant.id === Number(args.id)),
		participants: () => participants,
	},

	Event: {
		location: (parent) => locations.find((location) => location.id === Number(parent.location_id)),
		user: (parent) => users.find((user) => user.id === Number(parent.user_id)),
		participants: (parent) => participants.filter((participant) => participant.event_id === Number(parent.id)),
	},

	Participant: {
		user: (parent) => users.filter((user) => user.id === Number(parent.user_id)),
		event: (parent) => events.find((event) => event.id === Number(parent.event_id)),
	},
};
