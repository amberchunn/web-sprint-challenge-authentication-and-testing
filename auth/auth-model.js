const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")


async function add(user) {
	user.password = await bcrypt.hash(user.password, 14);
	const [id] = await db("users").insert(user);
	return findById(id);
}

function find() {
	return db("users")
		.select("id", "username");
}

function findById(id) {
	return db("users")
		.where({ id })
		.first("id", "username");
}

function findByUsername(username) {
	return db("users")
		.where({ username })
		.first();
}

module.exports = {
	add,
	find,
	findById,
	findByUsername,
}
