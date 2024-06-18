const net = require("node:net");
const readline = require("node:readline/promises");

const config = require("../config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: config.port, host: config.host });

client.on("connect", async () => {
  console.log("connected to server");
  const message = await rl.question("enter a message:");
  client.write(message);
});

client.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

client.on("end", () => {
  console.log("Connection was ended!");
});
