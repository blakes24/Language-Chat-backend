"use strict";

/** Routes for authentication. */

const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { createToken } = require("../helpers/jwt");
const Language = require("../models/language");
const { validateFacebook, validateGoogle } = require("../helpers/social");

const router = new express.Router();

/** POST /auth/register:   { user } => { token }
 *
 * user data includes { password, name, email, bio, imageUrl, speaks, learning }
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
        socialId,
        speaksLang,
        speaksLevel,
        learnsLang,
        learnsLevel,
      } = req.body;

      const newUser = await User.register({
        password,
        name,
        email,
        bio,
        imageUrl,
        socialId,
      });

      await Language.add(newUser.id, speaksLang, speaksLevel);
      await Language.add(newUser.id, learnsLang, learnsLevel);

      const token = createToken(newUser);

      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /validate {provider, token} => valid: bool **/

router.post("/validate", async function (req, res, next) {
  try {
    const {provider, token} = req.body
    const account =
      provider === "facebook"
        ? await validateFacebook(token)
        : await validateGoogle(token);
    return res.json({valid: account.verified});
  } catch (err) {
    return next(err);
  }
});

/** POST /token {email, password} => {token} **/

router.post("/token", body("email").isEmail(), async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ExpressError("Invalid email", 400);
    }
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /social-token {provider, token} => {token} **/

router.post("/social-token", async function (req, res, next) {
  try {
    const { provider, token } = req.body;
    const account =
      provider === "facebook"
        ? await validateFacebook(token)
        : await validateGoogle(token);

    const user = await User.socialAuth(account.userId);;
    const chatToken = createToken(user);
    return res.json({ token: chatToken });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
