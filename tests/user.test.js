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

const testUser = {
  name: "tester1",
  email: "tester1@mail.com",
  bio: "stuff about me",
  imageUrl: null,
};

const socialUser = {
  name: "social1",
  email: "social1@mail.com",
  bio: "I use facebook",
  imageUrl: null,
  socialProvider: "facebook",
  socialId: "1q2w3e4r5t6y",
};

/************************************** register */

describe("register", function () {
  test("works", async function () {
    let user = await User.register({
      ...testUser,
      password: "tester1pw",
    });
    expect(user).toEqual(expect.objectContaining({ ...testUser }));
    const found = await db.query("SELECT * FROM users WHERE name = 'tester1'");
    expect(found.rows.length).toEqual(1);
  });

  test("throws error for duplicate user", async function () {
    try {
      await User.register({
        ...testUser,
        password: "tester1pw",
      });
      await User.register({
        ...testUser,
        password: "tester1pw",
      });
    } catch (err) {
      expect(err.status).toEqual(400);
    }
  });
});

/******************************** authenticate */

describe("authenticate", function () {
  beforeEach(
    async () =>
      await User.register({
        ...testUser,
        password: "tester1pw",
      })
  );

  test("works", async function () {
    let user = await User.authenticate(testUser.email, "tester1pw");
    expect(user.bio).toEqual(testUser.bio);
  });

  test("throws error for invalid password", async function () {
    try {
      await User.authenticate({
        email: testUser.email,
        password: "nope",
      });
    } catch (err) {
      expect(err.status).toEqual(401);
    }
  });

  test("throws error for invalid email", async function () {
    try {
      await User.authenticate({
        email: "wrong@mail.com",
        password: "tester1pw",
      });
    } catch (err) {
      expect(err.status).toEqual(401);
    }
  });
});

/******************************** socialAuth */

describe("socialAuth", function () {
  beforeEach(
    async () => await User.register(socialUser)
  );

  test("works", async function () {
    let user = await User.socialAuth("1q2w3e4r5t6y");
    expect(user.email).toEqual(socialUser.email);
  });

  test("throws error if user does not exist", async function () {
    try {
      await User.socialAuth("nothere");
    } catch (err) {
      expect(err.status).toEqual(401);
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
        imageUrl: expect.any(String),
        active: true,
        socialProvider: null,
        speaks: expect.any(Array),
        learning: expect.any(Array),
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

/************************************** gets all users */

describe("gets all users", function () {
  test("works", async function () {
    let users = await User.getAll({});
    expect(users).toEqual(expect.any(Array));
    expect(users.length).toEqual(4);
  });

  test("works with filter", async function () {
    let users = await User.getAll({speaks: 'ru'});
    expect(users.length).toEqual(1);
    expect(users[0].speaks[0].code).toEqual('ru');
  });

  test("throws error if no users match filter criteria", async function () {
    try {
      await User.getAll({speaks: 'in'});
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
});

