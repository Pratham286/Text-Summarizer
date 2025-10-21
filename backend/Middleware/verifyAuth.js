import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith("Bearer ")){
    //     return res.status(401).json({ message: "Token not found or Invalid Token" });
    // }

    // const token = authHeader.split(" ")[1];
    const token = req.cookies.token;

    const key = process.env.Secret_Key;
    const decoded = jwt.verify(token, key);
    req.user = decoded
    next();
    return res.status(200);
  } catch (error) {
        console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
