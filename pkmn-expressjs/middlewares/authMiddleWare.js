const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../utils/tokenBlacklist");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied." });

  if (isTokenBlacklisted(token))
    return res
      .status(403)
      .json({ message: "Token is blacklisted. Please log in again." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

module.exports = auth;
