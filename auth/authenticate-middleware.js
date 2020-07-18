const express = require('express');

/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const restricted  = (req, res, next) => {
  return res.status(401).json({ you: 'shall not pass!' });
  next();
}

module.exports = restricted;
