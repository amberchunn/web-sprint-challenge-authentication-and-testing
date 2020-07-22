const request = require('supertest');
const db = require("../database/dbConfig")
const server = require('./server.js');

beforeEach(async () => {
	await db.seed.run()
})
afterAll(async () => {
	await db.destroy()
})

describe("root route", () => {
	it("GET /api", async () => {
		const res = await request(server).get("/")
		expect(res.statusCode).toBe(404)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
	})
})

describe("login route", () => {
	it("GET /api/login", async () => {
		const res = await request(server).get("/")
		expect(res.statusCode).toBe(404)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
	})
	it("POST /api/login", async () => {
		const res = await request(server)
			.post("/api/login")
			.send({ name: "mochi", password: "abc123" })
		expect(res.statusCode).toBe(201)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.headers.authorization).toBeDefined()
	})
})

describe("registration route", () => {
	it("GET /api/register", async () => {
		const res = await request(server).get("/")
		expect(res.statusCode).toBe(500)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
	})
	it("POST /api/register", async () => {
		const res = await request(server)
			.post("/api/register")
			.send({ name: "newbie", password: "abc123" })
		expect(res.statusCode).toBe(201)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.body.id).toBeDefined()
		expect(res.body.username).toBe("newbie")
	})
})

describe("jokes route", () => {
	it("GET /api/jokes", async () => {
		const res = await request(server).get("/")
		expect(res.statusCode).toBe(401)
		expect(res.body.message).toBe("shall not pass!")
	})
	it("GET /api/jokes", async () => {
		const res = await request(server)
			.get("/api/jokes")
		expect(res.sta).toBe(200)
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
		expect(res.authorization).toBeDefined()
	})
})
