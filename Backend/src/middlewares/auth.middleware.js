import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    const error = new Error("No auth token provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    req.user = user;

    next();
  } catch (err) {
    const error = new Error("Invalid auth token");
    error.statusCode = 401;
    return next(error);
  }

};

export default authMiddleware;