"use strict";

/** Routes for user. */

const express = require("express");
const User = require("../models/user");
const { ensureCorrectUser } = require("../helpers/middleware");

const router = new express.Router();

/** GET /[userId] => { user }
 *
 * Returns { id, name, email, bio, imageUrl, active, socketId, languages }
 *
 * Authorization required: user getting their own info
 **/

router.get("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.userId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
