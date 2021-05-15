"use strict";

/** Routes for message. */

const express = require("express");
const Message = require("../models/message");
const { authenticateUser } = require("../helpers/middleware");
const router = new express.Router();

/** GET / => [{ message }, ...]
 *
 * filter by room id
 *
 * Returns [{ id, to, from, roomId, body, sentAt }, ...]
 *
 * Authorization required: authenticated user
 **/

router.get("/", authenticateUser, async function (req, res, next) {
  try {
    const room = +req.query.room;
    const messages = await Message.get(room);
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
