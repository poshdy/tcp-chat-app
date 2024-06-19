const net = require("node:net");
const config = require("../config");

let clients = [];
const server = net.createServer();

server.on("connection", (socket) => {
  console.log(`A new connection to server`);

  let clientId = clients.length + 1;
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(config.port, config.host);

server.on("close", () => {
  clients = [];
});
