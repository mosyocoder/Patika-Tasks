const express = require("express");
const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
	const input = req.body.input.data;

	console.log("input", input);

	res.json({
		accessToken: "accessToken",
	});
});

app.listen(4000, () => {
	console.log("server is running");
});
