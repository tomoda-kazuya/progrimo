const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const { initDataFile } = require("./utils/fileHandler");
const ticketsRoutes = require("./routes/v1/tickets");
const flashRoutes = require("./routes/v1/flashMessage");

const app = express();

// 初期化（フォルダ・ファイル作成）
initDataFile();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// APIルーティング
app.use("/api/v1/tickets", ticketsRoutes);
app.use("/api/v1/flash-message", flashRoutes);

module.exports = app;
