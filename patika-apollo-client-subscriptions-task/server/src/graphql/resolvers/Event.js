export const Event = {
	location: (parent, _, { db }) => db.locations.find((location) => location.id === Number(parent.location_id)),
	user: (parent, _, { db }) => db.users.find((user) => user.id === Number(parent.user_id)),
	participants: (parent, _, { db }) => db.participants.filter((participant) => participant.event_id === Number(parent.id)),
};
