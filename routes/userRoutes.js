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

/** PATCH /:userId => {user}
 *
 * updates user data
 *
 * Authorization required: valid token that matches user to update
 **/

router.patch("/:userId", authenticateUser, ensureCorrectUser, async function (req, res, next) {
  try {
    const userId = +req.params.userId;
    const user = await User.update(req.body, userId);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST /:userId/partners => {user}
 *
 * adds a partner
 *
 * Authorization required: valid token
 **/

router.post("/:userId/partners", authenticateUser, async function (req, res, next) {
  try {
    const userId = +req.params.userId;
    const partnerId = +req.body.partnerId;
    const partner = await User.addPartner({userId, partnerId});
    return res.status(201).json({ partner });
  } catch (err) {
    return next(err);
  }
});

/** GET /:userId/partners => [{partner}, ...]
 *
 * adds a partner
 *
 * Authorization required: valid token
 **/

router.get("/:userId/partners", authenticateUser, async function (req, res, next) {
  try {
    const userId = +req.params.userId;
    const partners = await User.getPartners(userId);
    return res.json({ partners });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /:userId
 *
 * removes a user's account
 *
 * Authorization required: valid token that matches user to delete
 **/

router.delete(
  "/:userId",
  authenticateUser,
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const userId = +req.params.userId;
      const result = await User.delete(userId);
      return res.json({ msg: result });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
