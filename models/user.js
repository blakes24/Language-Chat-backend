"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../helpers/ExpressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** Register user: returns { id, name, email, bio, imageUrl } **/

  static async register({ password, name, email, bio, imageUrl }) {
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
           (password, name, email, bio, image_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, email, bio, image_url AS "imageUrl"`,
      [hashedPassword, name, email, bio, imageUrl]
    );

    const user = result.rows[0];

    return user;
  }

  /** Get user: 
   * returns { id, name, email, bio, imageUrl, active, socketId, languages }
  **/

  static async get(userId) {
    const userRes = await db.query(
      `SELECT u.id,
                  u.name,
                  u.email,
                  u.bio,
                  u.image_url AS "imageUrl",
                  active,
                  socket_id AS "socketId",
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

    const user = userRes.rows[0];

    if (!user) throw new ExpressError("User not found", 404);

    return user;
  }
}

module.exports = User;
