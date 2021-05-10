"use strict";

/** Express app for language chat. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const ExpressError = require("./helpers/ExpressError");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", function (req, res, next) {
  return res.status(200).json({ msg: "working" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

/** Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
