"use strict";

const db = require("../db");
const ExpressError = require("../helpers/ExpressError");

/** Methods for messages. */

class Message {
  /** Get messages from a room * */

  static async get(roomId) {
    let filter = "";
    let values = [];

    if (roomId) {
      const checkRoom = await db.query(`SELECT id FROM rooms WHERE id = $1`, [
        roomId,
      ]);
      if (checkRoom.rows.length === 0) {
        throw new ExpressError("Invalid room id", 404);
      }
      values.push(roomId);
      filter = "WHERE room_id = $1";
    }

    const result = await db.query(
      `SELECT id,
          sent_from AS "from",
          sent_to AS "to",
          room_id AS "roomId",
          body,
          sent_at AS "sentAt"
      FROM messages
      ${filter}`,
      values
    );
    const messages = result.rows;

    return messages;
  }
}

module.exports = Message;
