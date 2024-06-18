const readline = require("node:readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function Ask(client) {
  const message = await rl.question("Enter a message > ");
  await GoUp(0, -1);
  await ClearLine(0);
  client.write(message);
}

function ClearLine(dir) {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
}
function GoUp(dx, dy) {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
}

module.exports = { ClearLine, GoUp, Ask };
