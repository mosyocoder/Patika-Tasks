import express from "express";

import Hasura from "../../clients/hasura";
import { GET_MEETING_PARTICIPANTS } from "./queries";

const router = express.Router();

router.post("/created_meeting", async (req, res, next) => {
	const meeting = req.body.event.data.new;

	const data = await Hasura.request(GET_MEETING_PARTICIPANTS, {
		meeting_id: meeting.id,
	});

	console.log(data.meetingapp_participants);
});

export default router;
