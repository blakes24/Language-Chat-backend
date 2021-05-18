"use strict";

const socketio = require("socket.io");
const Message = require("./models/message");
const { CLIENT_URL } = require("./config");

module.exports = (server) => {
  const io = socketio(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected to socket sever`);

    socket.on("join", (room) => {
      socket.join(room);
      console.log(`joined ${room}`);
    });

    socket.on("send message", async (data) => {
      const message = await Message.add(data);
      io.to(message.roomId).emit("message", message);
    });
  });
};
