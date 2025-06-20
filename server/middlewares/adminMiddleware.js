const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.id && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export default adminMiddleware;