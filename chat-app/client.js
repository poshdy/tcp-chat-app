const net = require("node:net");

const config = require("../config");
const { ClearLine, GoLineUp, Qustion, Username } = require("./lib");

let username;
const client = net.createConnection(
  { port: config.port, host: config.host },
  () => {
    console.log("connected to server");

    // get user name
    const getUsername = async () => {
      username = await Username();
      // move console cursor one line up
      await GoLineUp(0, -1);
      // clear the current in the console
      await ClearLine(0);
      client.write(`un-${username}`);
    };
    getUsername();
    const ask = async () => {
      // get the message from the user
      const message = await Qustion();

      // move the console cursor one line up
      await GoLineUp(0, -1);
      // clear the current in the console
      await ClearLine(0);
      client.write(`name-${username}_message-${message}`);
    };

    ask();

    client.on("data", async (data) => {
      const dataString = data.toString("utf-8");
      // log an empty line
      console.log();
      // move the console cursor one line up
      await GoLineUp(0, -1);
      // clear the current in the console
      await ClearLine(0);
      if (dataString.substring(0, 4) === "name") {
        let name = dataString.substring(dataString.indexOf("-") + 1);
        console.log(`Welcome ${name}!\n`);
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
