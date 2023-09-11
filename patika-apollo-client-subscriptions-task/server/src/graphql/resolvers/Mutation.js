import mongoose from "mongoose";

export const Mutation = {
	createEvent: async (_, { data }, { _db, pubsub }) => {
		const newEvent = new _db.Event({ ...data });
		const event = await newEvent.save();

		const eventCount = await _db.Event.countDocuments();

		pubsub.publish("eventCreated", { eventCreated: event });
		pubsub.publish("eventCount", { eventCount });

		return event;
	},
	updateEvent: async (_, { id, data }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_event_exist = await _db.Event.findById(id);

			if (!is_event_exist) throw new Error("Event not found...!");

			const updatedEvent = await _db.Event.findByIdAndUpdate(id, data, { new: true });

			pubsub.publish("eventUpdated", { eventUpdated: updatedEvent });

			return updatedEvent;
		}
	},
	deleteEvent: async (_, { id }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_event_exist = await _db.Event.findById(id);

			if (!is_event_exist) throw new Error("Event not found...!");

			const deletedEvent = await _db.Event.findByIdAndDelete(id);
			const eventCount = await _db.Event.countDocuments();

			pubsub.publish("eventDeleted", { eventDeleted: deletedEvent });
			pubsub.publish("eventCount", { eventCount });

			return deletedEvent;
		}
	},
	deleteAllEvents: async (_, __, { _db, pubsub }) => {
		const deletedEvents = await _db.Event.deleteMany();
		const eventCount = await _db.Event.countDocuments();

		pubsub.publish("eventCount", { eventCount });

		return {
			count: deletedEvents.deletedCount,
		};
	},
	createLocation: async (_, { data }, { _db, pubsub }) => {
		const newLocation = new _db.Location({ ...data });

		const location = await newLocation.save();

		const locationCount = await _db.Location.countDocuments();

		pubsub.publish("locationCreated", { locationCreated: location });
		pubsub.publish("locationCount", { locationCount });

		return location;
	},
	updateLocation: async (_, { id, data }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_location_exist = await _db.Location.findById(id);

			if (!is_location_exist) throw new Error("Location not found...!");

			const updatedLocation = await _db.Location.findByIdAndUpdate(id, data, { new: true });

			pubsub.publish("locationUpdated", { locationUpdated: updatedLocation });

			return updatedLocation;
		}
	},
	deleteLocation: async (_, { id }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_location_exist = await _db.Location.findById(id);

			if (!is_location_exist) throw new Error("Location not found...!");

			const deletedLocation = await _db.Location.findByIdAndDelete(id);
			const locationCount = await _db.Location.countDocuments();

			pubsub.publish("locationDeleted", { locationDeleted: deletedLocation });
			pubsub.publish("locationCount", { locationCount });

			return deletedLocation;
		}
	},
	deleteAllLocations: async (_, __, { _db }) => {
		const deletedLocations = await _db.Location.deleteMany();

		return {
			count: deletedLocations.deletedCount,
		};
	},
	createUser: async (_, { data }, { _db, pubsub }) => {
		const newUser = new _db.User({ ...data });

		const user = await newUser.save();
		const userCount = await _db.User.countDocuments();

		pubsub.publish("userCreated", { userCreated: user });
		pubsub.publish("userCount", { userCount });

		return user;
	},
	updateUser: async (_, { id, data }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_user_exist = await _db.User.findById(id);

			if (!is_user_exist) throw new Error("User not found");

			const updatedUser = await _db.User.findByIdAndUpdate(id, data, { new: true });

			pubsub.publish("userUpdated", { userUpdated: updatedUser });
			return updatedUser;
		}
	},
	deleteUser: async (_, { id }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_user_exist = await _db.User.findById(id);

			if (!is_user_exist) throw new Error("User not found");

			const deletedUser = await _db.User.findByIdAndDelete(id);
			const userCount = await _db.User.countDocuments();
			pubsub.publish("userCount", { userCount });
			pubsub.publish("userDeleted", { userDeleted: deletedUser });
			return deletedUser;
		}
	},
	deleteAllUsers: async (_, __, { _db }) => {
		const deleteUsers = await _db.User.deleteMany();

		return {
			count: deleteUsers.deletedCount,
		};
	},
	createParticipant: async (_, { data }, { _db, pubsub }) => {
		const newParticipant = new _db.Participant({ ...data });

		const participant = await newParticipant.save();
		const participantCount = await _db.Participant.countDocuments();

		pubsub.publish("participantCreated", { participantCreated: participant });
		pubsub.publish("participantCount", { participantCount });

		return participant;
	},
	updateParticipant: async (_, { id, data }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_participant_exist = await _db.Participant.findById(id);

			if (!is_participant_exist) throw new Error("Participant not found...!");

			const updatedParticipant = await _db.Participant.findByIdAndUpdate(id, data, { new: true });

			pubsub.publish("participantUpdated", { participantUpdated: updatedParticipant });

			return updatedParticipant;
		}
	},
	deleteParticipant: async (_, { id }, { _db, pubsub }) => {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const is_participant_exist = await _db.Participant.findById(id);

			if (!is_participant_exist) throw new Error("Participant not found...!");

			const deletedParticipant = await _db.Participant.findByIdAndDelete(id);
			const participantCount = await _db.User.countDocuments();
			pubsub.publish("participantCount", { participantCount });
			pubsub.publish("participantDeleted", { participantDeleted: deletedParticipant });
			return deletedParticipant;
		}
	},
	deleteAllParticipants: async (_, __, { _db }) => {
		const deletedParticipants = await _db.Participant.deleteMany();

		return {
			count: deletedParticipants.deletedCount,
		};
	},
};
