const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../../data/tickets.json");

// チケット一覧を取得
router.get("/", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading data");
    res.json(JSON.parse(data));
  });
});

// チケットを追加
router.post("/", (req, res) => {
  const newTicket = req.body;

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading data");

    const tickets = JSON.parse(data);
    const newId =
      tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;
    const ticketWithId = { id: newId, ...newTicket };

    tickets.push(ticketWithId);

    fs.writeFile(
      dataFilePath,
      JSON.stringify(tickets, null, 2),
      "utf8",
      (err) => {
        if (err) return res.status(500).send("Error saving data");
        req.session.flashMessage = {
          type: "success",
          message: "チケットが正常に追加されました！",
        };
        res.status(201).json(ticketWithId);
      }
    );
  });
});

module.exports = router;
