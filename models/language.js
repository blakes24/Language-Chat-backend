"use strict";

const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

/** Methods for languages. */

class Language {
  /** Add a language - data should be userId, language * */

  static async addSpeaks(userId, code) {
    const result = await db.query(
      `INSERT INTO speaks_languages
           (user_id, language_code)
           VALUES ($1, $2)
           RETURNING
            id, language_code AS "code", user_id AS "userId"`,
      [userId, code]
    );
    const language = result.rows[0];

    return language;
  }

  /** Add a language - data should be userId, language, level * */

  static async addLearning(userId, code, level) {
    const result = await db.query(
      `INSERT INTO learning_languages
           (user_id, language_code, level)
           VALUES ($1, $2, $3)
           RETURNING
            id, language_code AS "code", level, user_id AS "userId"`,
      [userId, code, level]
    );
    const language = result.rows[0];

    if (!language) throw new ExpressError("Language not found", 404);

    return language;
  }

  /** Edit a language(learning) - data should be id, language, level * */

  static async editLearning({ code, level, id }) {
    const result = await db.query(
      `UPDATE learning_languages
      SET language_code=$1, level=$2
      WHERE id = $3
      RETURNING id, language_code AS "code", level`,
      [code, level, id]
    );
    const language = result.rows[0];

    if (!language) throw new ExpressError("Language not found", 404);

    return language;
  }

  /** Edit a language(speaks) - data should be id, language * */

  static async editSpeaks({ code, id }) {
    const result = await db.query(
      `UPDATE speaks_languages
      SET language_code=$1
      WHERE id = $2
      RETURNING id, language_code AS "code"`,
      [code, id]
    );
    const language = result.rows[0];

    if (!language) throw new ExpressError("Language not found", 404);

    return language;
  }
}

module.exports = Language;
