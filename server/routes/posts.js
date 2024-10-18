const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.send("This is a protected post");
});

module.exports = router;
