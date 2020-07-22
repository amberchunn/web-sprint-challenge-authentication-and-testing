const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");
const Users = require("./auth-model");
const authenticate = require("./authenticate-middleware");

const router = require('express').Router();

const errorMsg = "Non!"

router.post("/register", async (req, res, next) => {
  // implement registration

  try {
	const { username, password } = req.body
	const user = await Users.findBy({ username }).first()

	if (user) {
		return res.status(409).json({
			message: "Username is already taken",
		})
	}

	const newUser = await Users.add({
		username,
		password: await bcrypt.hash(password, 10),
	})

	res.status(201).json(newUser)
	} catch(err) {
		next(err);
	}
})

router.post('/login', async (req, res, next) => {
      // implement login

	  try {
		const { username, password } = req.body

		console.log('begining')

		const user = await Users.findBy({ username }).first()

		console.log(user)


		if (!user) {
			return res.status(401).json({
				message: errorMsg,
			})
		}

		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: errorMsg,
			})
		}

		const payload = {
			userId: user.id,
			username: user.username,
		}

		res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET))

		res.json({
			message: `Welcome ${user.username}!`,
		})

    } catch(err) {
        next(err);
      }

  });

module.exports = router;
