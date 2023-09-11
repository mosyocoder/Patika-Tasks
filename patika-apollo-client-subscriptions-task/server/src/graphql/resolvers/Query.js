export const Query = {
	event: async (_, args, { _db }) => {
		const event = await _db.Event.findById(args.id);
		return event;
	},
	events: async (_, __, { _db }) => {
		const events = await _db.Event.find();
		return events;
	},

	location: async (_, args, { _db }) => {
		const location = await _db.Location.findById(args.id);
		return location;
	},
	locations: async (_, __, { _db }) => {
		const locations = await _db.Location.find();
		return locations;
	},

	user: async (_, args, { _db }) => {
		const user = await _db.User.findById(args.id);
		return user;
	},
	users: async (_, __, { _db }) => {
		const users = await _db.User.find();
		return users;
	},

	participant: async (_, args, { _db }) => {
		const participant = await _db.Participant.findById(args.id);
		return participant;
	},
	participants: async (_, __, { _db }) => {
		const participants = await _db.Participant.find();
		return participants;
	},
};
