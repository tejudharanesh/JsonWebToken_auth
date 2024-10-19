const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json(
    "Here are the protected posts. Only authenticated users can see this."
  );
});

module.exports = router;
