"use strict";

/** Express app for language chat. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", function (req, res, next) {
  return res.status(200).json({ msg: "working" });
});

module.exports = app;
