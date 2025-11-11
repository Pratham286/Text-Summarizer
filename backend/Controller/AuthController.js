import bcrypt from "bcrypt"
import { User } from "../Schema/User.js";
import jwt from "jsonwebtoken";
// import User from "../Schema/User.js"

export const signup = async (req, res) => {
    try {
        const {fName, lName, username, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        // console.log(hashPassword);
        // const check = await bcrypt.compare(password, hashPassword);
        // console.log(check);

        const user =await User.findOne({email : email});
        if(user)
        {
            return res.status(400).json( {message : "This Email is already registered. Please try another email"})
        }
        const existingUserName = await User.findOne({username : username});
        if(existingUserName)
        {
            return res.status(400).json({message : "This username is already registered. Please try another username"});
        }
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
        })
        await newUser.save();
        return res.status(200).json({message: "New User Created"});
        // console.log(fName);
    } catch (error) {
        console.log("Failed in signup, Error: ", error);
    }
}
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user =await User.findOne({email : email});
        if(!user)
        {
            return res.status(400).json( {message : "Email is not register."})
        }
        
        const check = await bcrypt.compare(password, user.password)
        if(!check)
        {
            return res.status(401).json({message: "Incorrect Password."});
        }
        const key =process.env.Secret_Key;

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(payload, key, {expiresIn: "1h"});
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60*60*1000,
        });
        return res.status(200).json({message: "Login Successful"});
        // console.log(fName);
    } catch (error) {
        console.log("Failed in login, Error: ", error);
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).json({message: "Logout successfully."})
    } catch (error) {
        console.log("Failed in logout, Error: ", error);
    }
}
export const checkUser = async (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        return res.status(200).json({message: "Verified.", userDetails: user})
    } catch (error) {
        console.log("Failed in verify user, Error: ", error);
    }
}
export const getUser  = async(req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User found", userDetails: user});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}