"use strict";

const { PORT } = require("./config");
const app = require("./app");
const createSocket = require("./socket");
const server = require("http").createServer(app);

createSocket(server);

server.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
