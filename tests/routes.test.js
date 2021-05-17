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
const { validateFacebook, validateGoogle } = require("../helpers/social");
const User = require("../models/user");
const Room = require("../models/room");

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
  socialProvider: "google",
  socialId: "abc123ume",
  speaksLang: "en",
  learnsLang: "es",
  learnsLevel: "beginner",
};

jest.mock("../helpers/social", () => ({
  validateFacebook: () => ({
    userId: "notregistered",
    verified: true,
  }),
  validateGoogle: () => ({
    userId: "abc123ume",
    verified: true,
  }),
}));

/************************************** GET / */

describe("GET /", function () {
  test("works", async function () {
    const resp = await request(app).get("/");

    expect(resp.body).toEqual({ msg: "working" });
  });
});

/************************************** POST auth/register */

describe("POST auth/register", function () {
  test("works", async function () {
    const resp = await request(app).post("/auth/register").send(userData);
    expect(resp.body).toEqual({ token: expect.any(String) });
    expect(resp.status).toEqual(201);
  });
});

/************************************** POST /auth/token */

describe("POST auth/token", function () {
  beforeEach(async () => await User.register(userData));
  test("works", async function () {
    const resp = await request(app)
      .post("/auth/token")
      .send({ email: userData.email, password: userData.password });
    expect(resp.body).toEqual({ token: expect.any(String) });
    expect(resp.status).toEqual(200);
  });

  test("throws error for wrong password", async function () {
    const resp = await request(app)
      .post("/auth/token")
      .send({ email: userData.email, password: "wrong" });
    expect(resp.status).toEqual(401);
  });
});

/************************************** POST /auth/social-token */

describe("POST auth/social-token", function () {
  beforeEach(async () => await User.register(userData));
  test("works", async function () {
    const resp = await request(app)
      .post("/auth/social-token")
      .send({ provider: "google", token: "socialtoken" });
    expect(resp.body).toEqual({ token: expect.any(String) });
    expect(resp.status).toEqual(200);
  });

  test("throws error if user not found", async function () {
    const resp = await request(app)
      .post("/auth/social-token")
      .send({ provider: "facebook", token: "socialtoken" });
    expect(resp.status).toEqual(401);
  });
});

/************************************** POST /auth/validate */

describe("POST auth/validate", function () {
  beforeEach(async () => await User.register(userData));
  test("works", async function () {
    const resp = await request(app)
      .post("/auth/validate")
      .send({ provider: "google", token: "socialtoken" });
    expect(resp.body).toEqual({ valid: true });
    expect(resp.status).toEqual(200);
  });
});

/************************************** GET /users/:id */

describe("GET /users/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/users/1")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ user: expect.any(Object) })
    );
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).get("/users/1");
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** GET /users */

describe("GET /users", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ users: expect.any(Array) })
    );
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).get("/users");
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** GET /users/:userId/rooms */

describe("GET /users/:userId/rooms", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/users/1/rooms")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ rooms: expect.any(Array) })
    );
    expect(resp.status).toEqual(200);
  });

  test("works with partner filter", async function () {
    const resp = await request(app)
      .get("/users/1/rooms?partner=3")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.rooms[0].partner.id).toEqual(3);
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).get("/users");
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** POST /rooms */

describe("POST rooms", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/rooms")
      .send({ user1: 4, user2: 2 })
      .set("authorization", `Bearer ${testJwt}`);;
    expect(resp.body).toEqual({
      room: { id: expect.any(String), user1: 4, user2: 2 },
    });
    expect(resp.status).toEqual(201);
  });
});

/************************************** GET /messages */

describe("GET /messages", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/messages")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ messages: expect.any(Array) })
    );
    expect(resp.status).toEqual(200);
  });

  test("works with room filter", async function () {
    const resp = await request(app)
      .get("/messages?room=1-2")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual(
      expect.objectContaining({ messages: expect.any(Array) })
    );
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).get("/messages");
    expect(resp.statusCode).toEqual(401);
  });
});
