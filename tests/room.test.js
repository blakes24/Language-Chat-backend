"use strict";

const db = require("../db.js");
const Room = require("../models/room.js");
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
/************************************** add */

describe("create", function () {
  test("works", async function () {
    let newRoom = await Room.create(1, 2);
    expect(newRoom).toEqual({
      id: expect.any(Number),
      user1: 1,
      user2: 2,
    });
    const found = await db.query("SELECT * FROM rooms WHERE user_one = 1");
    expect(found.rows.length).toEqual(1);
  });
});
