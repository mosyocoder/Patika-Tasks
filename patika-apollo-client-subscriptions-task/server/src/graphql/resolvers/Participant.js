export const Participant = {
	user: async (parent, _, { _db }) => await _db.User.findById(parent.user),
	event: async (parent, _, { _db }) => await _db.Event.findById(parent.event),
};
