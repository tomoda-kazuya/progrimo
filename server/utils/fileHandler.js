const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data");
const dataFilePath = path.join(dataDir, "tickets.json");

function initDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), "utf8");
  }
}

module.exports = { initDataFile, dataFilePath };
