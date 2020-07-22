/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

function authenticate() {

	return async (req, res, next) => {

		const authError = {
			  message: 'shall not pass!'
		}
console.log(req.headers.authorization);
		try {
			const token = req.headers.authorization;
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				next()
			})

    } catch(err) {
        next(err);
    }
	}
}

module.exports = authenticate;
