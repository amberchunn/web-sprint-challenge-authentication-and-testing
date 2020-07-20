const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');
const jokesters = require('./auth-model');
const authenticate = require('../auth/authenticate-middleware.js');

const router = require('express').Router();

const errorMsg = "Non!"

router.get('/', (req, res, next) => {
  res.status(200).json({message: 'Working...'});
})

router.post("/register", async (req, res, next) => {
  // implement registration

	try {

    const {username} = req.body;

    const user = await jokesters.findBy(username)

    if (user) {
      return res.status(409).json({message: 'Username already exists'});
    }

    res.status(201).json(await jokesters.add(req.body));

	} catch(err) {
		next(err);
	}
});

router.post('/login', authenticate, async (req, res, next) => {
      // implement login

    try {


    } catch(err) {
        next(err);
      }

  });

module.exports = router;
