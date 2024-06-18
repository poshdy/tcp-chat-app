const net = require("node:net");
const config = require("../config");

let clients = [];

const server = net.createServer();

server.on("connection", (socket) => {
  clients.push(socket);
  socket.on("data", (data) => {
    clients.forEach((socket) => {
      socket.write(data);
    });
  });
  console.log(`client: ${socket.remotePort} is connected`);
});

server.listen(config.port, config.host);

server.on("close", () => {
  clients = [];
});
