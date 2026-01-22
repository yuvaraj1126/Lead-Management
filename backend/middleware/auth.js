const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "SECRET_KEY", err => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    next();
  });
};

