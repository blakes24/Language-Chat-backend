"use strict";

const db = require("../db");

/** Methods for languages. */

class Language {
  /** Add a language - data should be userId, language, level * */

  static async add(userId, language, level) {
    const result = await db.query(
      `INSERT INTO languages
           (user_id, language, level)
           VALUES ($1, $2, $3)
           RETURNING
            id, language, level, user_id AS "userId"`,
      [userId, language, level]
    );
    const newLanguage = result.rows[0];

    return newLanguage;
  }
}

module.exports = Language;
