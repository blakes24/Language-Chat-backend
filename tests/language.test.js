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

describe("addSpeaks", function () {
  const language = "id";
  const userId = 1;

  test("works", async function () {
    let newLanguage = await Language.addSpeaks(userId, language);
    expect(newLanguage).toEqual({
      id: expect.any(Number),
      languageCode: "id",
      userId: 1,
    });
    const found = await db.query(
      "SELECT * FROM speaks_languages WHERE language_code = 'id'"
    );
    expect(found.rows.length).toEqual(1);
  });
});

describe("addLearning", function () {
  const language = "id";
  const level = "beginner";
  const userId = 1;

  test("works", async function () {
    let newLanguage = await Language.addLearning(userId, language, level);
    expect(newLanguage).toEqual({
      id: expect.any(Number),
      languageCode: "id",
      level: "beginner",
      userId: 1,
    });
    const found = await db.query(
      "SELECT * FROM learning_languages WHERE language_code = 'id'"
    );
    expect(found.rows.length).toEqual(1);
  });
});
