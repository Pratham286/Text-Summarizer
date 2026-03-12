import bcrypt from "bcrypt";
import { User } from "../Schema/User.js";
import jwt from "jsonwebtoken";
import { generateTokens } from "../Utils/generateToken.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { uploadOnCloudinary } from "../Utils/uploadOnCloudinary.js";
// import User from "../Schema/User.js"

export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !userName || !email || !password || password.length < 6) {
    throw new ApiError(400, "All fields required");
  }

  // avatar 
  const avatar = req.file?.path;
  // if(avatar)
  // {
  //   console.log(avatar)
  // }

  // upload on cloudinary
  let avatarURL = null;
  if(avatar)
  {
    avatarURL = await uploadOnCloudinary(avatar);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    if (existingUser.userName === userName) {
      throw new ApiError(400, "Username already taken");
    }
    if (existingUser.email === email) {
      throw new ApiError(400, "Email already registered");
    }
  }
  
  // return res.status(200).json({message : "Yes"});

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    userName,
    email,
    password: hashPassword,
    friends: [],
    avatar: avatarURL || null,
  });
  await newUser.save();

  const createdUser = await User.findById(newUser._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ((!email && !userName) || !password) {
    throw new ApiError(400, "Credentials required");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (!user) {
    throw new ApiError(400, "Email / username is not register");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Wrong Password");
  }

  const accessToken = generateTokens(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // XSS attack prevention (No javascript access)
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 1000,
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  return res
    .status(200)
    .json(new ApiResponse(200, userResponse, "Login Successful"));
});

export const logout = asyncHandler((req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout Successfully"));
});

// export const checkUser = (req, res) => {
//   try {
//     const user = req.user;
//     // console.log(user);
//     return res.status(200).json({ message: "Verified.", userDetails: user });
//   } catch (error) {
//     console.log("Failed in verify user, Error: ", error);
//     return res.status(500).json({ message: "Error in fetching user" });
//   }
// };

export const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User Id not provided")
  }
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found")
  }
  return res
  .status(200)
  .json(new ApiResponse(200, user, "User found"));
});

// changing avatar
// changing username