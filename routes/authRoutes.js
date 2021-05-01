"use strict";

/** Routes for authentication. */

const express = require("express");
const ExpressError = require("../ExpressError");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { createToken } = require("../helpers");
const Language = require("../models/language");

const router = new express.Router();

/** POST /auth/register:   { user } => { token }
 *
 * user must include { password, name, email, bio, imageUrl, speaks, learning }
 *
 */

router.post(
  "/register",
  body("email").isEmail(),
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ExpressError("Invalid email", 400);
      }
      const {
        password,
        name,
        email,
        bio,
        imageUrl,
        speaks,
        learning,
      } = req.body;

      const newUser = await User.register({
        password,
        name,
        email,
        bio,
        imageUrl,
      });

      await Language.add(newUser.id, speaks.language, speaks.level);
      await Language.add(newUser.id, learning.language, learning.level);

      const token = createToken(newUser);

      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
