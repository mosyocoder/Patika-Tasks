import express from "express";
import nodemailer from "nodemailer";
import moment from "moment";
import axios from "axios";

import Hasura from "../../clients/hasura";
import { GET_MEETING_PARTICIPANTS, GET_MEETING_PARTICIPANTS_REMINDER_QUERY } from "./queries";

const router = express.Router();

const smtpConfig = {
	host: "smtp.gmail.com",
	port: "465",
	secure: true,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
};

const transporter = nodemailer.createTransport(smtpConfig);

router.post("/created_meeting", async (req, res, next) => {
	const meeting = req.body.event.data.new;

	const { meetingapp_meetings_by_pk } = await Hasura.request(GET_MEETING_PARTICIPANTS, {
		id: meeting.id,
	});

	const title = meeting.title;
	const { full_name } = meetingapp_meetings_by_pk.user;
	const participants = meetingapp_meetings_by_pk.participants.map(({ user }) => user.email).toString();

	const schedule_event = {
		type: "create_scheduled_event",
		args: {
			webhook: "{{ACTION_BASE_ENDPOINT}}/webhooks/meeting_reminder",
			schedule_at: moment(meetingapp_meetings_by_pk.meeting_date).subtract(2, "minutes"),
			payload: {
				meeting_id: meeting.id,
			},
		},
	};

	const add_event = await axios("http://localhost:8080/v1/query", {
		method: "POST",
		data: JSON.stringify(schedule_event),
		headers: {
			"x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
		},
	});

	const event_data = add_event.data;

	console.log(event_data);

	const mailOptions = {
		from: `${process.env.GMAIL_USER}`,
		to: participants,
		subject: `${full_name} sizi bir görüşmeye davet etti`,
		text: `${full_name} sizi ${title} adlı bir görüşmeye davet etti`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return next(error);

		return res.json({ info });
	});
});

router.post("/meeting_reminder", async (req, res, next) => {
	const { meeting_id } = req.body.payload;

	const { meetingapp_meetings_by_pk } = await Hasura.request(GET_MEETING_PARTICIPANTS_REMINDER_QUERY, {
		id: meeting_id,
	});

	const title = meetingapp_meetings_by_pk.title;
	const { email } = meetingapp_meetings_by_pk.user;
	const participants = meetingapp_meetings_by_pk.participants.map(({ user }) => user.email);
	participants.push(email);

	const mailOptions = {
		from: `${process.env.GMAIL_USER}`,
		to: participants.toString(),
		subject: `'${title}' başlıklı görüşmeniz birazdan başlayacak`,
		text: `'${title}' başlıklı görüşmeniz 2 dakika sonra başlayacak. Katılmak çin aşağıdaki bağlantıyı kullanın.`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return next(error);

		return res.json({ info });
	});
});

export default router;
