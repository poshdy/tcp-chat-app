const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function Qustion() {
  return await rl.question("Enter a message > ");
}
async function Username() {
  return await rl.question("Enter Your Name > ");
}

function ClearLine(dir) {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
}
function GoLineUp(dx, dy) {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
}

module.exports = { ClearLine, GoLineUp, Qustion, Username };
