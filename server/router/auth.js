const express = require("express"); //we make router here so we need for that express to make express.router//
const router = express.Router();
const bcrypt = require("bcryptjs"); //we use this for making hesh the password//
const jwt = require("jsonwebtoken"); //we use this for makig token for cookies//
const authenticate = require("../middleware/authenticate"); //for call middleware//
const cookieParser = require("cookie-parser"); //for get cookies becuse express not providing diract access cookies//
router.use(cookieParser());

// const mongoose = require("mongoose"); //doubt->we not need here because we already use this in app.js //
// require("../db/conn"); //doubt->we not need here because we already use this in app.js //

const User = require("../models/userSchema"); //we use here post method for that we need it//

// router.get("/", (req, res) => {
//   res.send("Hello world from the server router side");
// });

router.post("/register", async (req, res) => {
	const { name, email, phone, work, password, cpassword } = req.body;
	console.log(req.body.name);

	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(422).json({ error: "plss enter all data" });
	}
	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "enter already exist" });
		}
		if (password != cpassword) {
			return res.status(422).json({ error: "pasword are not same " });
		} else {
			const user = new User({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
			});

			//yaha pe

			await user.save();
			res.status(201).json({ massage: "successfully........" }); //doubt->we use for this know my network//
		}
	} catch (error) {
		console.log(error);
	}
});

//login code

router.post("/signin", async (req, res) => {
	try {
		// console.log("t1");
		const { email, password } = req.body;

		if (!email || !password) {
			// console.log("t2");

			return res.status(400).json({ error: "plzz filed data" });
		}
		// console.log("t3");

		const userLogin = await User.findOne({ email: email });
		// console.log("email check is it present or not get data :",userLogin);
		if (userLogin) {
			const isMatch = await bcrypt.compare(password, userLogin.password);
			// console.log("ismatch->",isMatch);

			const token = await userLogin.generateAuthToken();

			res.cookie("jwtoken", token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true,
			});

			if (!isMatch) {
				res.status(400).json({ error: "invalid cadita" });
			} else {
				res.send({ message: "user signin successfully in side sever" });
			}
		} else {
			res.status(400).json({ message: "invalid cadita." });

			// res.json({ message: "invalid cadita hii." });
		}
	} catch (error) {
		console.log(error);
	}
});

// about us page

router.get("/about", authenticate, (req, res) => {
	console.log("hello gays you on about page");
	res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
	console.log("hello gays you on contact page");
	res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
	// console.log("t0");
	try {
		// console.log("t1");
		const { name, email, phone, message } = req.body;
		if (!name || !email || !phone || !message) {
			// console.log("t2");
			return res.json({ error: "please filed the contact page" });
		}
		const userContact = await User.findOne({ _id: req.userID });
		if (userContact) {
			console.log("t3");
			const userMessage = await userContact.addMessage(
				name,
				email,
				phone,
				message
			);
			await userContact.save();

			res.status(201).json({ message: "user Contact successfully" });
		}
	} catch (error) {
		console.log(error);
	}
});

//logout page
router.get("/logout", authenticate, async (req, res) => {
	console.log("hello gays my logout page");

	////////////////////////////////////////////////////////////////////////////////////////////////
	//for single logout,.........................................................//
	req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
		return currElement.token != req.token;
	});
	res.clearCookie("jwtoken", { path: "/" });
	await req.rootUser.save();
	console.log("save");
	res.status(200).send("user logout");
	// logout from all devices...................................................//
	// req.rootUser.tokens = [];
	// res.clearCookie("jwtoken", { path: "/" });
	// await req.rootUser.save();
	//////////////////////////////////////////////////////////////////////////////////////////////////

	// res.clearCookie("jwtoken", { path: "/" });
	// res.status(200).send("user logout");
});

module.exports = router;
