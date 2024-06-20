const net = require("node:net");
const config = require("../config");

let clients = [];
const server = net.createServer();

let name;
server.on("connection", (socket) => {
  console.log(`A new connection to server`);

  let clientId = clients.length + 1;
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");

    if (dataString.substring(0, 2) == "un") {
      name = dataString.substring(dataString.indexOf("-") + 1);

      socket.write(`name-${name}`);

      handleJoin(name);
    } else if (dataString.substring(0, 4) == "name") {
      name = dataString.substring(5, dataString.indexOf("_"));

      const message = dataString.substring(dataString.indexOf("_message-") + 9);

      clients.map((client) => {
        client.socket.write(`> ${name}: ${message}`);
      });
    }
  });

  clients.push({ id: clientId.toString(), name, socket });
  socket.on("error", () => {
    clients.map((client) => {
      client.socket.write(`${name} Left!`);
    });
  });
});

server.listen(config.port, config.host);

server.on("end", () => {
  clients = [];
});

function handleJoin(username) {
  clients.map((client) => {
    client.socket.write(`${username} Joined!`);
  });
}

// function handleClientLeave(socket, username) {}
