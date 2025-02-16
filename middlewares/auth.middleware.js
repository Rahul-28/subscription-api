import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import { blacklistedTokens } from "./auth.controller.js";

export const authorize = async (req, res, next) => {
  // Check if the user is logged in and authorized to access the resource
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Login to access" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized, User does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

export const checkBlacklistedToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (blacklistedTokens.has(token)) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please sign in again",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
