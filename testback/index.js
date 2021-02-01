const express = require("express");

const app = express();
const port = 3000;

const admin = (req, res) => {
	return res.send("Admin Route");
};
//middlewares [Something which comes inbetween]
const isAdmin = (req, res, next) => {
	console.log("Admin Is verified");
	next();
};
const isLoggedIn = (req, res, next) => {
	console.log("User is logged in");
};
app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
