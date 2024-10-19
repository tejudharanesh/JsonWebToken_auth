const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Add cookie parsing middleware

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // frontend origin
  credentials: true, // allow sending cookies with requests
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
