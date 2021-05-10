"use strict";

const db = require("../db");

/** Methods for languages. */

class Language {
  /** Add a language - data should be userId, language * */

  static async addSpeaks(userId, languageCode) {
    const result = await db.query(
      `INSERT INTO speaks_languages
           (user_id, language_code)
           VALUES ($1, $2)
           RETURNING
            id, language_code AS "languageCode", user_id AS "userId"`,
      [userId, languageCode]
    );
    const language = result.rows[0];

    return language;
  }

  /** Add a language - data should be userId, language, level * */

  static async addLearning(userId, languageCode, level) {
    const result = await db.query(
      `INSERT INTO learning_languages
           (user_id, language_code, level)
           VALUES ($1, $2, $3)
           RETURNING
            id, language_code AS "languageCode", level, user_id AS "userId"`,
      [userId, languageCode, level]
    );
    const language = result.rows[0];

    return language;
  }
}

module.exports = Language;
