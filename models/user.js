"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../helpers/ExpressError");
const { sqlForLangFilter } = require("../helpers/sql");

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
   * returns { id, name, email, bio, imageUrl, active, socialProvider, languages }
   **/

  static async get(userId) {
    const result = await db.query(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.bio,
        u.image_url AS "imageUrl",
        active,
        social_provider AS "socialProvider",
        COALESCE(json_agg(json_build_object('code', l1.code, 'language', l1.name))) AS speaks,
        COALESCE(json_agg(json_build_object('code', l2.code, 'language', l2.name, 'level', ll.level))) AS learning
      FROM
        users AS u
        JOIN speaks_languages AS sl ON u.id = sl.user_id
        JOIN languages AS l1 ON l1.code = sl.language_code
        JOIN learning_languages AS ll ON u.id = ll.user_id
        JOIN languages AS l2 ON l2.code = ll.language_code
      WHERE
        u.id = $1
      GROUP BY
        u.id`,
      [userId]
    );

    const user = result.rows[0];

    if (!user) throw new ExpressError("User not found", 404);

    return user;
  }

  /** Get all users:
   * returns [{ id, name, bio, imageUrl, active, languages },]
   **/

  static async getAll(filters) {
    const { whereCols, values } = sqlForLangFilter(filters);

    const result = await db.query(
      `SELECT
        u.id,
        u.name,
        u.bio,
        u.image_url AS "imageUrl",
        active,
        COALESCE(json_agg(json_build_object('code', l1.code, 'language', l1.name))) AS speaks,
        COALESCE(json_agg(json_build_object('code', l2.code, 'language', l2.name, 'level', ll.level))) AS learning
      FROM
        users AS u
        JOIN speaks_languages AS sl ON u.id = sl.user_id
        JOIN languages AS l1 ON l1.code = sl.language_code
        JOIN learning_languages AS ll ON u.id = ll.user_id
        JOIN languages AS l2 ON l2.code = ll.language_code
      ${whereCols}
      GROUP BY
        u.id`,
      values
    );

    const users = result.rows;

    if (!users.length) throw new ExpressError("No users found", 404);

    return users;
  }

  /** Get user's chat rooms:
   * returns [{id, partner:{id, name, bio, imageUrl, active}}, ...]
   **/

  static async getRooms(userId, partnerId) {
    let values = [userId];
    let filter = "";
    if (partnerId) {
      values.push(partnerId);
      filter = `AND (r.user_one = $2 OR r.user_two = $2)`;
    }

    const result = await db.query(
      `SELECT
        r.id,
        CASE
          WHEN r.user_one !=$1 THEN
            COALESCE(json_build_object('id', u1.id, 'name', u1.name, 'bio', u1.bio, 'imageUrl', u1.image_url, 'active', u1.active))
          WHEN r.user_two !=$1 THEN
            COALESCE(json_build_object('id', u2.id, 'name', u2.name, 'bio', u2.bio, 'imageUrl', u2.image_url, 'active', u2.active))
        END partner
      FROM
        rooms AS r
        JOIN users AS u1 ON r.user_one = u1.id
        JOIN users AS u2 ON r.user_two = u2.id
      WHERE (r.user_one = $1 OR r.user_two = $1)
      ${filter};`,
      values
    );

    const rooms = result.rows;

    if (!rooms.length) throw new ExpressError("No rooms found", 404);

    return rooms;
  }
}

module.exports = User;
