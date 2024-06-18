const net = require("node:net");
const config = require("../config");
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const client = socket.address().port;
    console.log(`client: ${client} says ${data.toString("utf-8")}`);
  });
});

server.on("connection", (socket) => {
  const clientDetails = socket.address();
  console.log(`client: ${clientDetails.port} is connected`);
});

server.listen(config.port, config.host, () => {
  console.log(`TCP server is Running on ${host}:${port}`);
});
