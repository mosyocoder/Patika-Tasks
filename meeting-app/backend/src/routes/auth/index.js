import express from "express";
import Boom from "boom";
import bcrypt from "bcryptjs";
import { signAccessToken } from "./helpers";

import Hasura from "../../clients/hasura";
import { registerSchema, loginSchema } from "./validations";
import { INSERT_USER_MUTATION, IS_EXIST_USER, LOGIN_QUERY } from "./queries";

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

		const { insert_meetingApp_users_one: user } = await Hasura.request(INSERT_USER_MUTATION, {
			input: {
				...input,
				password: hash,
			},
		});

		const accessToken = await signAccessToken(user);

		res.json({ accessToken });
	} catch (err) {
		return next(Boom.badRequest(err));
	}
});

router.post("/login", async (req, res, next) => {
	const input = req.body.input.data;
	input.email = input.email.toLowerCase();

	const { error } = loginSchema.validate(input);

	if (error) return next(Boom.badRequest(error.details[0].message));

	try {
		const { users } = await Hasura.request(LOGIN_QUERY, {
			email: input.email,
		});

		if (users.length === 0) throw Boom.unauthorized("Email or password is incorrect");

		const user = users[0];

		const isMatch = await bcrypt.compare(input.password, user.password);

		if (!isMatch) throw Boom.unauthorized("Email or password is incorrect");

		const accessToken = await signAccessToken(user);
		return res.json({ accessToken });
	} catch (err) {
		return next(err);
	}
});

export default router;
