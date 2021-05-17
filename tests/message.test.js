"use strict";

const db = require("../db.js");
const Message = require("../models/message.js");
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
    let newMessage = await Message.add({
      from: 2,
      to: 1,
      roomId: "1-2",
      body: "testing",
    });
    expect(newMessage).toEqual({
      id: expect.any(Number),
      from: 2,
      to: 1,
      roomId: "1-2",
      body: "testing",
      sentAt: expect.anything(),
    });
    const found = await db.query("SELECT * FROM messages WHERE sent_to = 1");
    expect(found.rows.length).toEqual(1);
  });
});
