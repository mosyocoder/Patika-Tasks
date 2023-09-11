import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	});
	mongoose.connection.on("open", () => console.log("MongoDB: Connected..!"));
	mongoose.connection.on("error", () => console.log("MongoDB: Not Connected..!", e));
};
