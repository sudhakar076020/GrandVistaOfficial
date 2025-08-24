// Simple role-based middleware
const authMiddleware = (req, res, next) => {
  const role = req.headers["x-user-role"];
  console.log("Role from headers:", role); // Debug log

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  next();
};

module.exports = authMiddleware;
