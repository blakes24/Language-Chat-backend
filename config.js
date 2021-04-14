"use strict";

/** Shared config for application. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = process.env.NODE_ENV === "production" ? +process.env.PORT : 3001;

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///chat_test"
    : process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : "postgresql:///chatdb";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  DB_URI,
};
