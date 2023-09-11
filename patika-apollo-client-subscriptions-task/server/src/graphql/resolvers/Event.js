export const Event = {
	location: async (parent, _, { _db }) => await _db.Location.findById(parent.location),

	user: async (parent, _, { _db }) => await _db.User.findById(parent.user),

	participants: async (parent, _, { _db }) => await _db.Participant.find({ event: parent.id }),
};
