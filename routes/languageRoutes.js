"use strict";

/** Routes for user. */

const express = require("express");
const Language = require("../models/language");
const { authenticateUser } = require("../helpers/middleware");
const router = new express.Router();

/** PATCH /speaks/:id => {language}
 *
 * updates language data
 *
 * Authorization required: token
 **/

router.patch("/speaks/:id", authenticateUser, async function (req, res, next) {
  try {
    const id = +req.params.id;
    const { code } = req.body;
    const language = await Language.editSpeaks({ code, id });
    return res.json({ language });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /learning/:id => {language}
 *
 * updates language data
 *
 * Authorization required: token
 **/

router.patch(
  "/learning/:id",
  authenticateUser,
  async function (req, res, next) {
    try {
      const id = +req.params.id;
      const { code, level } = req.body;
      const language = await Language.editLearning({ code, level, id });
      return res.json({ language });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
