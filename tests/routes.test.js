"use strict";

const request = require("supertest");
const app = require("../app");
const {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
  testJwt,
  emailToken,
} = require("./testSetup");
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
  learnsLevel: 1,
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

jest.mock("../helpers/mail", () => ({
  sendMail: () => ({
    msg: "sent",
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

  test("throws error for invalid data", async function () {
    const resp = await request(app).post("/auth/register").send({
      password: "tester1pw",
      name: "tester1",
      email: "bademail",
      bio: "stuff about me",
    });
    expect(resp.status).toEqual(400);
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

/************************************** POST /auth/resend-verification */

describe("POST auth/resend-verification", function () {
  beforeEach(async () => await User.register(userData));
  test("works", async function () {
    const resp = await request(app)
      .post("/auth/resend-verification")
      .send({ userId: 1 });
    expect(resp.body).toEqual({ msg: "email sent" });
    expect(resp.status).toEqual(200);
  });

  test("throws error for invalid userId", async function () {
    const resp = await request(app)
      .post("/auth/resend-verification")
      .send({ userId: "str" });
    expect(resp.status).toEqual(400);
  });

  test("throws error if user does not exist", async function () {
    const resp = await request(app)
      .post("/auth/resend-verification")
      .send({ userId: 999 });
    expect(resp.status).toEqual(404);
  });
});

/************************************** PATCH /auth/verify-email*/

describe("PATCH auth/verify-email", function () {
  beforeEach(async () => await User.register(userData));
  test("works", async function () {
    const resp = await request(app)
      .patch("/auth/verify-email")
      .send({ token: emailToken });
    expect(resp.body).toEqual({ token: expect.any(String) });
    expect(resp.status).toEqual(200);
  });

  test("throws error for invalid token", async function () {
    const resp = await request(app)
      .patch("/auth/verify-email")
      .send({ token: "badtoken" });
    expect(resp.status).toEqual(401);
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

/************************************** PATCH /users/:id */

describe("PATCH /users/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .patch("/users/1")
      .send({ name: "Alex"})
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.user.name).toEqual("Alex");
    expect(resp.status).toEqual(200);
  });

  test("unauth if wrong user", async function () {
    const resp = await request(app)
      .patch("/users/99")
      .send({ name: "Alex" })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(403);
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

/************************************** PATCH /languages/speaks/:id */

describe("PATCH /languages/speaks/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .patch("/languages/speaks/1")
      .send({ code: "es" })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.language.code).toEqual("es");
    expect(resp.status).toEqual(200);
  });

  test("404 if invalid id", async function () {
    const resp = await request(app)
      .patch("/languages/speaks/999")
      .send({ code: "es" })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /languages/learning/:id */

describe("PATCH /languages/learning/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .patch("/languages/learning/1")
      .send({ code: "de", level: 3 })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.language).toEqual({
      id: 1,
      code: "de",
      level: 3,
      language: "German",
    });
    expect(resp.status).toEqual(200);
  });

  test("404 if invalid id", async function () {
    const resp = await request(app)
      .patch("/languages/learning/999")
      .send({ code: "de", level: 3 })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** POST /users/:id/partners */

describe("POST /users/:id/partners", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/users/1/partners")
      .send({ partnerId: 3 })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.partner.partnerId).toEqual(3);
    expect(resp.status).toEqual(201);
  });

  test("400 if duplicate", async function () {
    await request(app)
      .post("/users/1/partners")
      .send({ partnerId: 3 })
      .set("authorization", `Bearer ${testJwt}`);
    const resp = await request(app)
      .post("/users/1/partners")
      .send({ partnerId: 3 })
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /users/:id/partners */

describe("GET /users/:id/partners", function () {
  test("works", async function () {
    const resp = await request(app)
      .get("/users/1/partners")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body.partners).toEqual(expect.any(Array));
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).get("/users/1/partners")
    expect(resp.statusCode).toEqual(401);
  })
});

/************************************** DELETE /users/:id/partners/:partnerId */

describe("DELETE /users/:id/partners/:partnerId", function () {
  beforeEach(async () => await User.addPartner({userId:1, partnerId:2}));
  test("works", async function () {
    const resp = await request(app)
      .delete("/users/1/partners/2")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual({msg: "Partner deleted"});
    expect(resp.status).toEqual(200);
  });

  test("unauth if missing token", async function () {
    const resp = await request(app).delete("/users/1/partners/2")
    expect(resp.statusCode).toEqual(401);
  })
});

/************************************** DELETE /users/:id */

describe("DELETE /users/:id", function () {
  test("works", async function () {
    const resp = await request(app)
      .delete("/users/1")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.body).toEqual({msg: "user deleted"});
    expect(resp.status).toEqual(200);
  });

  test("unauth if wrong user", async function () {
    const resp = await request(app)
      .delete("/users/2")
      .set("authorization", `Bearer ${testJwt}`);
    expect(resp.statusCode).toEqual(403);
  })
});