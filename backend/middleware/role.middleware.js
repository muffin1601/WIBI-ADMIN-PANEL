// middleware/role.middleware.js
export const adminOnly = (req, res, next) => {
  if (!["admin", "super_admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
