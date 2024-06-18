const net = require("node:net");
const config = require("../config");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    socket.write(data.toString("utf-8"));
  });
});

server.on("connection", (socket) => {
  const clientDetails = socket.remotePort;
  console.log(`client: ${clientDetails} is connected`);
});

server.listen(config.port, config.host);
