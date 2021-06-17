"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("./ExpressError");

/** return JWT with userId. */

function createToken(user, exp = "1d") {
  let payload = {
    userId: user.id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: exp });
}

/** return payload if token is verified. */

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    throw new ExpressError("Invalid token", 401);
  }
}

module.exports = { createToken, verifyToken };
