export const Participant = {
	user: (parent, _, { db }) => db.users.filter((user) => user.id === Number(parent.user_id)),
	event: (parent, _, { db }) => db.events.find((event) => event.id === Number(parent.event_id)),
};
