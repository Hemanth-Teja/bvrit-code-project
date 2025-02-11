import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

console.log("token in backend    "+token)
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
      // Directly verify the token (without needing "Bearer ")
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded data"+ decoded)
      req.user = await User.findById(decoded.userId).select("-password"); // Ensure _id matches the schema
      console.log("after decoding user"+req.user)
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid token" });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
