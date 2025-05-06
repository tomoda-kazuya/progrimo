const express = require("express");
const router = express.Router();

// フラッシュメッセージ取得
router.get("/", (req, res) => {
  const flashMessage = req.session.flashMessage;
  if (flashMessage) {
    res.json(flashMessage);
    req.session.flashMessage = null;
  } else {
    res.status(404).json({ message: "No flash message available" });
  }
});

module.exports = router;
