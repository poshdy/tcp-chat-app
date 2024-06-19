const net = require("node:net");
const config = require("../config");
const { ClearLine, GoLineUp, Qustion } = require("./lib");

let id;
const client = net.createConnection(
  { port: config.port, host: config.host },
  () => {
    console.log("connected to server");
    const ask = async () => {
      // get the message from the user
      const message = await Qustion();
      // move the console cursor one line up
      await GoLineUp(0, -1);
      // clear the current in the console
      await ClearLine(0);
      client.write(`${id}-message-${message}`);
    };

    ask();

    client.on("data", async (data) => {
      // log an empty line
      console.log();
      // move the console cursor one line up
      await GoLineUp(0, -1);
      // clear the current in the console
      await ClearLine(0);

      if (data.toString("utf-8").substring(0, 2) === "id") {
        id = data.toString("utf-8").substring(3);

        console.log(`Your id is ${id}!\n`);
      } else {
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  }
);

client.on("end", () => {
  console.log("Connection was ended!");
});
client.on("error", () => {
  console.log("Connection was ended!");
  process.exit();
});
