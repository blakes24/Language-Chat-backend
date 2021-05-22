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
      code: "id",
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
  const level = 1;
  const userId = 1;

  test("works", async function () {
    let newLanguage = await Language.addLearning(userId, language, level);
    expect(newLanguage).toEqual({
      id: expect.any(Number),
      code: "id",
      level: 1,
      userId: 1,
    });
    const found = await db.query(
      "SELECT * FROM learning_languages WHERE language_code = 'id'"
    );
    expect(found.rows.length).toEqual(1);
  });
});

describe("editLearning", function () {
  const code = "es";
  const level = 2;
  const id = 1;

  test("works", async function () {
    let updatedLanguage = await Language.editLearning({ id, code, level });
    expect(updatedLanguage).toEqual({
      id: 1,
      code: "es",
      level: 2,
      language: "Spanish",
    });
  });
});

describe("editSpeaks", function () {
  const code = "zh";
  const id = 1;

  test("works", async function () {
    let updatedLanguage = await Language.editSpeaks({ id, code });
    expect(updatedLanguage).toEqual({
      id: 1,
      code: "zh",
      language: "Chinese",
    });
  });
});
