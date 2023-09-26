import express from "express";
import Boom, { badRequest } from "boom";
import bcrypt from "bcryptjs";

import Hasura from "../../clients/hasura";
import { registerSchema } from "./validations";
import { INSERT_USER_MUTATION, IS_EXIST_USER } from "./queries";

const router = express.Router();

router.post("/register", async (req, res, next) => {
	const input = req.body.input.data;

	input.email = input.email.toLowerCase();

	const { error } = registerSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const isExistUser = await Hasura.request(IS_EXIST_USER, {
			email: input.email,
		});

		if (isExistUser.meetingApp_users.length > 0) {
			throw Boom.conflict(`User already exist ${input.email}`);
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(input.password, salt);

		const user = await Hasura.request(INSERT_USER_MUTATION, {
			input: {
				...input,
				password: hash,
			},
		});

		res.json({ accessToken: "accessToken" });
	} catch (err) {
		return next(Boom.badRequest(err));
	}
});

export default router;
