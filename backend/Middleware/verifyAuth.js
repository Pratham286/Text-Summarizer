import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {

    // Using Bearer Token
    // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith("Bearer ")){
    //     return res.status(401).json({ message: "Token not found or Invalid Token" });
    // }

    // const token = authHeader.split(" ")[1];


    
    // Using Cookies-Token
    const token = req.cookies.token;
    if(!token){
        return  res.status(401).json({ message: "Token not found" });
    }

    const key = process.env.Secret_Key;
    if(!key)
    {
      return res.status(500).json({message : "Key not found"});
    }
    const decoded = jwt.verify(token, key);
    req.user = decoded
    next();
  } catch (error) {
        console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
