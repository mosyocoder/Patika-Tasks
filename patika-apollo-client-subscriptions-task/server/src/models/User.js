import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

export default mongoose.model("User", UserSchema);
