"use strict";

const db = require("../db.js");
const User = require("../models/user.js");
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

/************************************** register */

describe("register", function () {
  const newUser = {
    name: "tester1",
    email: "tester1@mail.com",
    bio: "stuff about me",
    imageUrl: null,
  };

  test("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "tester1pw",
    });
    delete user.id;
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE name = 'tester1'");
    expect(found.rows.length).toEqual(1);
  });

  test("throws error for duplicate user", async function () {
    try {
      await User.register({
        ...newUser,
        password: "tester1pw",
      });
      await User.register({
        ...newUser,
        password: "tester1pw",
      });
    } catch (err) {
      expect(err.status).toEqual(400);
    }
  });
});

/************************************** get a user */

describe("get a user", function () {
  test("works", async function () {
    let user = await User.get(1);
    expect(user).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        email: expect.any(String),
        bio: expect.any(String),
        imageUrl: null,
        active: true,
        socketId: null,
        languages: expect.any(Array),
      })
    );
  });

  test("throws error if user does not exist", async function () {
    try {
      await User.get(999);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
});

