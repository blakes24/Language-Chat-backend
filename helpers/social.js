"use strict";

const axios = require("axios");
const ExpressError = require("./ExpressError");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/** Check facebook token is valid. */

async function validateFacebook(token) {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
    );
    if (!res.data.data.is_valid) throw new ExpressError("Invalid token", 401);
    const userId = res.data.data.user_id;
    return { userId, verified: true };
  } catch (err) {
    console.error(err);
    throw new ExpressError(err.message, err.status || 500);
  }
}

async function validateGoogle(token) {
  try {
    // throws error if token is not valid
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    return { userId, verified: true };
  } catch (err) {
    console.error(err);
    throw new ExpressError("Invalid token", 401);
  }
}

module.exports = { validateFacebook, validateGoogle };
