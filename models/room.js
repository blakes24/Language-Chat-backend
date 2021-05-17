"use strict";

const db = require("../db");

/** Methods for rooms. */

class Room {
  /** Add a room - data should be user1, user2 * */

  static async create(user1, user2) {
    let id = user1 < user2 ? `${user1}-${user2}` : `${user2}-${user1}`;
    const result = await db.query(
      `INSERT INTO rooms
           (id, user_one, user_two)
           VALUES ($1, $2, $3)
           RETURNING
            id, user_one AS "user1", user_two AS "user2"`,
      [id, user1, user2]
    );
    const room = result.rows[0];

    return room;
  }
}

module.exports = Room;
