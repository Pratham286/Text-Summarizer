import { Chat } from "../Schema/Chat.js";
import { Message } from "../Schema/Message.js";
import { User } from "../Schema/User.js";


export const getUser = async (req, res) => {
    try {
        const userDetails = req.user;
        if(!userDetails)
        {
            return res.status(404).json({message: "User not Found"});
        }
        return res.status(200).json({message: "User found", userDetails});
    } catch (error) {
        return res.status(500).json({message : "Error in fetching user details"});
    }
};

export const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const profile = await User.findById(id);
        if(!profile){
            return res.status(404).json({message : "User Profile not found"});
        }
        return res.status(201).json({message: "User found", profile});
        
    } catch (error) {
        return res.status(500).json({message : "Error in fetching user details"});
    }
}