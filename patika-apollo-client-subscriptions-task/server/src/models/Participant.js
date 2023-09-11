import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},

	event: {
		type: mongoose.Types.ObjectId,
		ref: "Event",
	},
});

export default mongoose.model("Participant", ParticipantSchema);
