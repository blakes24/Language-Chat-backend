"use strict";

const request = require("supertest");
const app = require("../app");
const {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
  testJwt,
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
  speaksLang: "English",
  speaksLevel: "native",
  learnsLang: "Spanish",
  learnsLevel: "beginner",
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

/************************************** GET /user:id */

describe("GET /user/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/user/1")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ user: expect.any(Object) })
    );
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app)
      .get("/users/1")
    expect(resp.statusCode).toEqual(401);
  });
});
