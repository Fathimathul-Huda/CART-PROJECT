const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("No token");

  try {
    req.user = jwt.verify(token, "secretkey");
    next();
  } catch {
    return res.status(401).json("Invalid token");
  }
}

function admin(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json("Access denied");
  next();
}

module.exports = { auth, admin };
