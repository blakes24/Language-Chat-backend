const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("socketio", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("receive works", (done) => {
    clientSocket.on("message", (msg) => {
      expect(msg).toBe("hi");
      done();
    });
    serverSocket.emit("message", "hi");
  });

  test("send works", (done) => {
    serverSocket.on("send message", (msg) => {
      msg("hola");
    });
    clientSocket.emit("send message", (msg) => {
      expect(msg).toBe("hola");
      done();
    });
  });
});
