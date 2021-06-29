"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("./ExpressError");

/** return JWT for auth token or email verification. */

function createToken(user, type = "auth", exp = "1d") {
  const payload =
    type === "email" ? { email: user.email } : { userId: user.id };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: exp });
}

/** return payload if token is verified. */

function verifyToken(token, type = "auth") {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    let msg =
      type === "email"
        ? "Verification link is expired or invalid."
        : "Invalid token";
    throw new ExpressError(msg, 401);
  }
}

module.exports = { createToken, verifyToken };
