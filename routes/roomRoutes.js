"use strict";

/** Routes for rooms. */

const express = require("express");
const Room = require("../models/room");
const { authenticateUser } = require("../helpers/middleware");

const router = new express.Router();

/** POST create a chat room **/

router.post("/", authenticateUser, async function (req, res, next) {
  try {
    const { user1, user2 } = req.body;
    const room = await Room.create(user1, user2);
    return res.status(201).json({ room });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
