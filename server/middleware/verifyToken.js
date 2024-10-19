const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Extract token from cookies
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const verified = jwt.verify(token, "teju123"); // Verify the JWT token
    req.user = verified; // Store the verified user info in the request
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
