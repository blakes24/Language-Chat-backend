"use strict";
const nodemailer = require("nodemailer");
const { CLIENT_URL } = require("../config");
const ExpressError = require("./ExpressError");
const { createToken } = require("./jwt");

async function sendMail(user) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  let code = createToken(user, "email", "1h");

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: user.email,
    subject: "Verify Langchat Account",
    text: `Thanks for signing up for LangChat. Use the link to verify your account. ${CLIENT_URL}/verify/${code}`,
    html: `<div><h1>Welcome to LangChat!</h1>
    <h3>Thanks for signing up</h3>
    <p><a href=${CLIENT_URL}/verify/${code}>Click here</a> or use the link below to verify your account.</p>
    <p>${CLIENT_URL}/verify/${code}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    throw new ExpressError("Could not send verification email", 400);
  }
}

module.exports = { sendMail };
