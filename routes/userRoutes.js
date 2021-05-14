"use strict";

/** Routes for user. */

const express = require("express");
const User = require("../models/user");
const {
  ensureCorrectUser,
  authenticateUser,
} = require("../helpers/middleware");
const router = new express.Router();

/** GET /[userId] => { user }
 *
 * Returns { id, name, email, bio, imageUrl, active, socketId, languages }
 *
 * Authorization required: user getting their own info
 **/

router.get(
  "/:userId",
  authenticateUser,
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const user = await User.get(+req.params.userId);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

/** GET / => {users: [user, user] }
 *
 * optional filters in query string: speaks, learning
 *
 * Returns users: [{ id, name, bio, imageUrl, active, speaks, learning }]
 *
 * Authorization required: valid token
 **/

router.get("/", authenticateUser, async function (req, res, next) {
  try {
    const users = await User.getAll(req.query);
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /:userId/rooms => {rooms: [{id, user1, user2},] }
 *
 * optional filter in query string: partnerId
 *
 * Authorization required: valid token
 **/

router.get("/:userId/rooms", authenticateUser, async function (req, res, next) {
  try {
    let partner = +req.query.partner
    const userId = +req.params.userId;
    const rooms = await User.getRooms(userId, partner);
    return res.json({ rooms });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
