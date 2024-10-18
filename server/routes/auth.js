const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).send("User already exists");

  const user = new User({ username, password });
  await user.save();

  res.send("User registered");
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ _id: user._id }, "teju123");
  res.header("auth-token", token).send(token);
});

module.exports = router;
