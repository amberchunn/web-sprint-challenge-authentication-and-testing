const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");
const jokesters = require("./auth-model");
const restricted = require('./authenticate-middleware/restricted');

const router = require('express').Router();

const errorMsg = "Non!"

router.post("/register", async (req, res, next) => {
  // implement registration

	try {
		const { username } = req.body;
		const user = await jokesters.findBy({username});

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await jokesters.add(req.body));
	} catch(err) {
		next(err);
	}
})

router.post('/login', restricted, async (req, res, next) => {
      // implement login

    try {
      const { username, password } = req.body;
      const joker = await jokesters.findBy({username });

      if(!joker) {
        return res.status(401).json(errorMsg);
      }

      const validated = await bcrypt.compare({password}, joker.password);

      const session = await jokesters.add({
        user_id: user.id,
        expires: 0
      });

       const token = jwt.sign({
            sessionId: session.id,
            username: joker.username,
          }, process.env.JWT_SECRET );

      res.cookie("token", token);

      res.json({message: `${joker.username}, you are now authenticated`,})

    } catch(err) {
        next(err);
      }

  });

module.exports = router;
