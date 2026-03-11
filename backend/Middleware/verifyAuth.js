import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";

export const verify = asyncHandler(async (req, res, next) => {
  // Using Bearer Token
  // const authHeader = req.headers.authorization;

  // if(!authHeader || !authHeader.startsWith("Bearer ")){
  //     return res.status(401).json({ message: "Token not found or Invalid Token" });
  // }

  // const token = authHeader.split(" ")[1];

  // Using Cookies-Token
  
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Token not found");
  }

  const key = process.env.ACCESS_TOKEN_SECRET;
  if (!key) {
    throw new ApiError(500, "Key not found");
  }
  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded; // user contains payload
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    }
    throw new ApiError(401, "Invalid token");
  }
});
