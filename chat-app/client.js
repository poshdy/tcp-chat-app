const net = require("node:net");
const config = require("../config");
const { WriteMessage, ClearLine, Ask, GoUp } = require("./lib");

const client = net.createConnection({ port: config.port, host: config.host });

client.on("connect", async () => {
  console.log("connected to server");
  Ask(client);
});

client.on("data", async (data) => {
  console.log(0);
  await GoUp(0, -1);
  await ClearLine(0);
  console.log(data.toString("utf-8"));
  Ask(client);
});

client.on("end", () => {
  console.log("Connection was ended!");
});
client.on("error", () => {
  console.log("Connection was ended!");
  process.exit();
});
