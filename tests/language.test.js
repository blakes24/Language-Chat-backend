"use strict";

const db = require("../db.js");
const Language = require("../models/language.js");
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

describe("add", function () {
  const language = "Spanish";
  const level = "beginner";
  const userId = 1;

  test("works", async function () {
    let newLanguage = await Language.add(userId, language, level);
    expect(newLanguage).toEqual({
      id: expect.any(Number),
      language: "Spanish",
      level: "beginner",
      userId: 1,
    });
    const found = await db.query(
      "SELECT * FROM languages WHERE language = 'Spanish'"
    );
    expect(found.rows.length).toEqual(1);
  });
});
