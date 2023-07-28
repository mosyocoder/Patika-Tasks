import { v4 } from "uuid";

export const Mutation = {
	createEvent: (_, { data }, { db, pubsub }) => {
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

		db.events.push(event);
		pubsub.publish("eventCreated", { eventCreated: event });
		pubsub.publish("eventCount", { eventCount: db.events.length });

		return event;
	},
	updateEvent: (_, { id, data }, { db, pubsub }) => {
		const event_index = db.events.findIndex((event) => event.id === Number(id));

		if (event_index === -1) {
			throw new Error("Event not found!");
		}

		const updated_event = (db.events[event_index] = {
			...db.events[event_index],
			...data,
		});

		pubsub.publish("eventUpdated", { eventUpdated: updated_event });

		return updated_event;
	},
	deleteEvent: (_, { id }, { db, pubsub }) => {
		const event = db.events.findIndex((event) => event.id === Number(id));

		if (event === -1) {
			throw new Error("Event not found!");
		}
		const deleted_event = db.events[event];
		db.events.splice(event, 1);

		pubsub.publish("eventDeleted", { eventDeleted: deleted_event });
		pubsub.publish("eventCount", { eventCount: db.events.length });

		return deleted_event;
	},
	deleteAllEvents: (_, __, { db, pubsub }) => {
		const length = db.events.length;
		db.events.splice(0, length);

		pubsub.publish("eventCount", { eventCount: db.events.length });

		return {
			count: length,
		};
	},
	createLocation: (_, { data }, { db, pubsub }) => {
		const location = {
			id: v4(),
			name: data.name,
			desc: data.desc,
			lat: data.lat,
			lng: data.lng,
		};

		db.locations.push(location);

		pubsub.publish("locationCreated", { locationCreated: location });
		pubsub.publish("locationCount", { locationCount: db.locations.length });

		return location;
	},
	updateLocation: (_, { id, data }, { db, pubsub }) => {
		const location_index = db.locations.findIndex((location) => location.id === Number(id));

		if (location_index === -1) {
			throw new Error("Location not found!");
		}

		const updated_location = (db.locations[location_index] = {
			...db.locations[location_index],
			...data,
		});

		pubsub.publish("locationUpdated", { locationUpdated: updated_location });

		return updated_location;
	},
	deleteLocation: (_, { id }, { db, pubsub }) => {
		const location = db.locations.findIndex((location) => location.id === Number(id));

		if (location === -1) {
			throw new Error("Location not found!");
		}
		const deleted_location = locations[location];
		db.locations.splice(location, 1);

		pubsub.publish("locationDeleted", { locationDeleted: deleted_location });
		pubsub.publish("locationCount", { locationCount: db.locations.length });

		return deleted_location;
	},
	deleteAllLocations: (_, __, { db, pubsub }) => {
		const length = db.locations.length;
		db.locations.splice(0, length);

		pubsub.publish("locationCount", { locationCount: db.locations.length });

		return {
			count: length,
		};
	},
	createUser: (_, { data }, { db, pubsub }) => {
		const user = {
			id: v4(),
			username: data.username,
			email: data.email,
		};
		db.users.push(user);

		pubsub.publish("userCreated", { userCreated: user });
		pubsub.publish("userCount", { userCount: db.users.length });

		return user;
	},
	updateUser: (_, { id, data }, { db, pubsub }) => {
		const user_index = db.users.findIndex((user) => user.id === Number(id));

		if (user_index === -1) {
			throw new Error("User not found!");
		}

		const updated_user = (db.users[user_index] = {
			...db.users[user_index],
			...data,
		});

		pubsub.publish("userUpdated", { userUpdated: updated_user });

		return updated_user;
	},
	deleteUser: (_, { id }, { db, pubsub }) => {
		const user = db.users.findIndex((user) => user.id === Number(id));

		if (user === -1) {
			throw new Error("User not found!");
		}
		const deleted_user = db.users[user];
		db.users.splice(user, 1);

		pubsub.publish("userDeleted", { userDeleted: deleted_user });
		pubsub.publish("userCount", { userCount: db.users.length });

		return deleted_user;
	},
	deleteAllUsers: (_, __, { db, pubsub }) => {
		const length = users.length;
		db.users.splice(0, length);

		pubsub.publish("userCount", { userCount: db.users.length });

		return {
			count: length,
		};
	},
	createParticipant: (_, { data }, { db, pubsub }) => {
		const participant = {
			id: v4(),
			user_id: data.user_id,
			event_id: data.event_id,
		};
		db.participants.push(participant);

		pubsub.publish("participantCreated", { participantCreated: participant });
		pubsub.publish("participantCount", { participantCount: db.participants.length });

		return participant;
	},
	updateParticipant: (_, { id, data }, { db, pubsub }) => {
		const participant_index = db.participants.findIndex((participant) => participant.id === Number(id));

		if (participant_index === -1) {
			throw new Error("Participant not found!");
		}

		const updated_participant = (db.participants[participant_index] = {
			...db.participants[participant_index],
			...data,
		});

		pubsub.publish("participantUpdated", { participantUpdated: updated_participant });

		return updated_participant;
	},
	deleteParticipant: (_, { id }, { db, pubsub }) => {
		const participant = db.participants.findIndex((participant) => participant.id === Number(id));

		if (participant === -1) {
			throw new Error("Participant not found!");
		}
		const deleted_participant = participants[participant];
		db.participants.splice(participant, 1);

		pubsub.publish("participantDeleted", { participantDeleted: deleted_participant });
		pubsub.publish("participantCount", { participantCount: db.participants.length });

		return deleted_participant;
	},
	deleteAllParticipants: (_, __, { db, pubsub }) => {
		const length = db.participants.length;
		db.participants.splice(0, length);

		pubsub.publish("participantCount", { participantCount: db.participants.length });

		return {
			count: length,
		};
	},
};
