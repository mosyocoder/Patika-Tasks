export const Query = {
	event: (_, args, { db }) => db.events.find((event) => event.id === Number(args.id)),
	events: (_, __, { db }) => db.events,

	location: (_, args, { db }) => db.locations.find((location) => location.id === Number(args.id)),
	locations: (_, __, { db }) => db.locations,

	user: (_, args, { db }) => db.users.find((user) => user.id === Number(args.id)),
	users: (_, __, { db }) => db.users,

	participant: (_, args, { db }) => db.participants.find((participant) => participant.id === Number(args.id)),
	participants: (_, __, { db }) => db.participants,
};
