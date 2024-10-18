const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).send("User already exists");

    // Create new user with hashed password
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid credentials");

    // Check password validity
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid credentials");

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, "teju123", { expiresIn: "1h" });

    // Set the token in a secure, HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).send("Login successful");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
