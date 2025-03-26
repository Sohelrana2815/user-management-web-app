export const blockCheckMiddleware = (req, res, next) => {
  if (req.user && req.user.status === "blocked") {
    return res.status(403).json({ message: "User is blocked" });
  }
  next();
};
