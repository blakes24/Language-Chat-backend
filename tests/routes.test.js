"use strict";

const request = require("supertest");
const app = require("../app");
const {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
} = require("./testSetup");

beforeAll(seedDatabase);
beforeEach(beginTransaction);
afterEach(rollbackTransaction);
afterAll(endTransaction);

const userData = {
  password: "tester1pw",
  name: "tester1",
  email: "tester1@mail.com",
  bio: "stuff about me",
  imageUrl: null,
  speaks: { language: "English", level: "native" },
  learning: { language: "Spanish", level: "beginner" },
};

/************************************** GET / */

describe("GET /", function () {
  test("works", async function () {
    const resp = await request(app).get("/");

    expect(resp.body).toEqual({ msg: "working" });
  });
});

/************************************** POST /register */

describe("POST /register", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/auth/register")
      .send(userData);
    expect(resp.body).toEqual({token: expect.any(String)})
    expect(resp.status).toEqual(201)
  });
});
