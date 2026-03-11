// utils/generateTokens.js
import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

export const generateTokens = (user) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessSecret) {
    throw new ApiError(500);
  }

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "1h" })

  return { accessToken };
};