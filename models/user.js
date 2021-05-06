"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../helpers/ExpressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** Register user: returns { id, name, email, bio, imageUrl } **/

  static async register({
    password,
    name,
    email,
    bio,
    imageUrl,
    socialProvider,
    socialId,
  }) {
    const duplicateCheck = await db.query(
      `SELECT email
           FROM users
           WHERE email = $1`,
      [email]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(`Account already exists for email: ${email}`, 400);
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
      : null;

    const result = await db.query(
      `INSERT INTO users
           (password, name, email, bio, image_url, social_provider, social_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id, name, email, bio, image_url AS "imageUrl"`,
      [hashedPassword, name, email, bio, imageUrl, socialProvider, socialId]
    );

    const user = result.rows[0];

    return user;
  }

  /** socialAuth: (socialId) => { user } **/

  static async socialAuth(socialId) {
    const result = await db.query(
      `SELECT * FROM users
        WHERE social_id = $1`,
      [socialId]
    );

    const user = result.rows[0];

    if (!user) throw new ExpressError("Invalid user", 401);

    return user;
  }

  /** Authenticate: (email, password) => user **/

  static async authenticate(email, password) {
    const result = await db.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new ExpressError("Invalid email/password", 401);
  }

  /** Get user:
   * returns { id, name, email, bio, imageUrl, active, socketId, languages }
   **/

  static async get(userId) {
    const result = await db.query(
      `SELECT u.id,
              u.name,
              u.email,
              u.bio,
              u.image_url AS "imageUrl",
              active,
              social_provider AS "socialProvider",
              COALESCE(json_agg(json_build_object(
                  'id', l.id,
                  'language', l.language,
                  'level', l.level))) AS languages
           FROM users as u
           LEFT JOIN languages AS l
           ON u.id = l.user_id
           WHERE u.id = $1
           GROUP BY u.id`,
      [userId]
    );

    const user = result.rows[0];

    if (!user) throw new ExpressError("User not found", 404);

    return user;
  }
}

module.exports = User;
