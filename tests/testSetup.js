"use strict";

const db = require("../db.js");
const fs = require("fs");
const path = require("path");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const testJwt = jwt.sign({ userId: 1 }, SECRET_KEY);
const emailToken = jwt.sign({ email: "tester1@mail.com" }, SECRET_KEY);

const testData = fs
  .readFileSync(path.resolve(__dirname, "./testData.sql"))
  .toString();

async function seedDatabase() {
  await db.query(testData);
}

async function beginTransaction() {
  await db.query("BEGIN");
}

async function rollbackTransaction() {
  await db.query("ROLLBACK");
}

async function endTransaction() {
  await db.end();
}

module.exports = {
  seedDatabase,
  beginTransaction,
  rollbackTransaction,
  endTransaction,
  testJwt,
  emailToken,
};
