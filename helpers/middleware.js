"use strict";

const ExpressError = require("./ExpressError");
const { verifyToken } = require("./jwt");

/** Middleware to authenticate user. */

function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) throw new ExpressError("Missing token", 401);

    const token = authHeader.replace(/^[Bb]earer /, "").trim();
    res.locals.user = verifyToken(token);

    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to ensure the user is fetching their own data. */

function ensureCorrectUser(req, res, next) {
  try {
    if (res.locals.user && res.locals.user.userId === +req.params.userId) {
      return next();
    }
    throw new ExpressError("Not authorized", 403);
  } catch (err) {
    return next(err);
  }
}

module.exports = { authenticateUser, ensureCorrectUser };
