const net = require("node:net");
const config = require("../config");
const client = net.createConnection({ port: config.port, host: config.host });

client.on("connect", () => {
  console.log("connected to server");
});

client.on("end", () => console.log("Connection was ended!"));
client.on("close", () => console.log("Connection was closed!"));
