"use strict";

/** Database for education */

const pg = require("pg");
const { DB_URI } = require("./config");

const db = new pg.Client(DB_URI);

db.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected!");
});

db.on("error", (e) => {
  console.error("Database error", e);
  db = null;
});

module.exports = db;
