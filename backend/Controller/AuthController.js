import bcrypt from "bcrypt";
import { User } from "../Schema/User.js";
import jwt from "jsonwebtoken";
// import User from "../Schema/User.js"

export const signup = async (req, res) => {
  try {
    const { fName, lName, username, email, password } = req.body;

    // console.log(hashPassword);
    // const check = await bcrypt.compare(password, hashPassword);
    // console.log(check);

    if (!fName || !username || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "This Email is already registered. Please try another email",
      });
    }
    const existingUserName = await User.findOne({ username: username });
    if (existingUserName) {
      return res.status(400).json({
        message:
          "This username is already registered. Please try another username",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fName: fName,
      lName: lName,
      username: username,
      email: email,
      password: hashPassword,
      userChats: [],
      favouriteChats: [],
      friends: [],
      pendingFriendReq: [],
      pendingFriendReqSent: [],
    });
    await newUser.save();
    return res.status(200).json({ message: "New User Created" });
    // console.log(fName);
  } catch (error) {
    console.log("Failed in signup, Error: ", error);
    return res.status(500).json({ message: "Error in creating new account." });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Inputs" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email is not register." });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(401).json({ message: "Incorrect Password." });
    }
    const key = process.env.Secret_Key;
    if (!key) {
      console.error("Key not found in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, key, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true, // XSS attack prevention (No javascript access)
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login Successful" });
    // console.log(fName);
  } catch (error) {
    console.log("Failed in login, Error: ", error);
    return res.status(500).json({ message: "Error in login." });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    console.log("Failed in logout, Error: ", error);
    return res.status(500).json({ message: "Error in logout." });
  }
};
export const checkUser = (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    return res.status(200).json({ message: "Verified.", userDetails: user });
  } catch (error) {
    console.log("Failed in verify user, Error: ", error);
    return res.status(500).json({message : "Error in fetching user"});
  }
};
export const getUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if(!userId){
        return res.status(400).json({message : "User id not provided"});
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", userDetails: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
