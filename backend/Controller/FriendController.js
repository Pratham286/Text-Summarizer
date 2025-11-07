import { Chat } from "../Schema/Chat.js";
import { Message } from "../Schema/Message.js";
import { User } from "../Schema/User.js";

export const getUser = async (req, res) => {
  try {
    const userDetails = req.user;
    if (!userDetails) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.status(200).json({ message: "User found", userDetails });
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching user details" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await User.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "User Profile not found" });
    }
    return res.status(200).json({ message: "User found", profile });
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching user details" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query } = req.body;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json({ message: "Users found", users });
  } catch (error) {
    return res.status(500).json({ message: "Error in searching users" });
  }
};  

export const areFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.id;
    const user = await User.findById(userId);
    if(user.friends.includes(otherUserId)){
      return res.status(200).json({ message: "Users are friends", areFriends: true });
    }
    return res.status(200).json({ message: "Users are not friends", areFriends: false });
  } catch (error) {
    return res.status(500).json({ message: "Error in checking friendship status" });
  }
};

export const sendReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const {otherUser} = req.body;
    const user = await User.findById(userId);
    
    if(user.friends.includes(otherUser))
      {
        return res.status(400).json({ message: "Users are already friends" });
      }
      const otherUserDetails = await User.findById(otherUser);
      
      if(otherUserDetails.pendingFriendReq.includes(userId)){
        return res.status(400).json({ message: "Friend request already sent" });
      }
      otherUserDetails.pendingFriendReq.push(userId);
      await otherUserDetails.save();
      
      user.pendingFriendReqSent.push(otherUser);
      await user.save();  
      return res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error in sending friend request" });
    }
  };
export const retractReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const {otherUser} = req.body;
    const user = await User.findById(userId);
    
    if(user.friends.includes(otherUser))
      {
        return res.status(400).json({ message: "Users are already friends" });
      }
      const otherUserDetails = await User.findById(otherUser);
      
      if(!otherUserDetails.pendingFriendReq.includes(userId)){
        return res.status(400).json({ message: "+Friend Request not present" });
      }
      otherUserDetails.pendingFriendReq.pull(userId);
      await otherUserDetails.save();
      
      user.pendingFriendReqSent.pull(otherUser);
      await user.save();  
      return res.status(200).json({ message: "Friend request retracted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error in sending friend request" });
    }
  };
  export const acceptReq = async (req, res) => {
    try {
      const userId = req.user.id;
      const {otherUser} = req.body;
      const user = await User.findById(userId);
      
      if(user.friends.includes(otherUser))
        {
          return res.status(400).json({ message: "Users are already friends" });
        }
        const otherUserDetails = await User.findById(otherUser);
        
        if(!user.pendingFriendReq.includes(otherUser)){
          return res.status(400).json({ message: "No friend request" });
        }
        
        user.friends.push(otherUser);
        await user.save();
        otherUserDetails.friends.push(userId);
        await otherUserDetails.save();
        
        otherUserDetails.pendingFriendReqSent.pull(userId);
        await otherUserDetails.save();
        
        user.pendingFriendReq.pull(otherUser);
        await user.save(); 
        return res.status(200).json({ message: "Friend request accepted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error in sending friend request" });
      }
    };
    export const declineReq = async (req, res) => {
      try {
        const userId = req.user.id;
        const {otherUser} = req.body;
        const user = await User.findById(userId);
        
        const otherUserDetails = await User.findById(otherUser);
        
        if(!user.pendingFriendReq.includes(otherUser)){
          return res.status(400).json({ message: "No friend request" });
        }
        
        
        otherUserDetails.pendingFriendReqSent.pull(userId);
        await otherUserDetails.save();
        
        user.pendingFriendReq.pull(otherUser);
        await user.save(); 
        
        return res.status(200).json({ message: "Friend request declined successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error in sending friend request" });
      }
    };
    export const removeFriend = async (req, res) => {
      try {
        const userId = req.user.id;
        const {otherUser} = req.body;
        const user = await User.findById(userId);
        
        if(!user.friends.includes(otherUser))
          {
            return res.status(400).json({ message: "Users are not friends" });
          }
          const otherUserDetails = await User.findById(otherUser);
          
          user.friends.pull(otherUser);
          await user.save();
          
          otherUserDetails.friends.pull(userId);
          await otherUserDetails.save();
          
          return res.status(200).json({ message: "Friend request declined successfully" });
        } catch (error) {
          return res.status(500).json({ message: "Error in sending friend request" });
        }
      };
      
      export const relationWithUser = async (req, res) => {
        try {
          const userId = req.user.id;
          const otherUserId = req.params.id;
          const user = await User.findById(userId);
          const status = {
            areFriends: false,
            requestSent: false,
            requestReceived: false
          }
          if(user.friends.includes(otherUserId)){
            status.areFriends = true;
            return res.status(200).json({ message: "Users are friends", status });
          }

          if(user.pendingFriendReq.includes(otherUserId)){
            status.requestReceived = true;
            return res.status(200).json({ message: "Friend request received from user", status});
          }
          if(user.pendingFriendReqSent.includes(otherUserId)){
            status.requestSent = true;
            return res.status(200).json({ message: "Friend request sent to user", status});
          }
          return res.status(200).json({ message: "No relation with user", status });
        } catch (error) {
          return res.status(500).json({ message: "Error in checking friendship status" });
        }
      };