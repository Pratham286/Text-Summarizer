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
    if (!id) {
      return res.status(400).json({ message: "User Id not found" });
    }
    const profile = await User.findById(id).select("-password");
    if (!profile) {
      return res.status(404).json({ message: "User Profile not found" });
    }
    return res.status(200).json({ message: "User found", profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Error in fetching user details" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "query not found" });
    }
    // const searchQuery = query.trim();
    // if (searchQuery.length < 2) {
    //   return res.status(400).json({ message: "Search query must be at least 2 characters" });
    // }
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fName: { $regex: query, $options: "i" } },
        { lName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(20); // Limit results to prevent huge responses;
    return res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error("Error in searching profile:", error);
    return res.status(500).json({ message: "Error in searching users" });
  }
};

export const areFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.id;
    if (!otherUserId) {
      return res.status(400).json({ message: "Other user not found" });
    }
    const user = await User.findById(userId).select("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.includes(otherUserId)) {
      return res
        .status(200)
        .json({ message: "Users are friends", areFriends: true });
    }
    return res
      .status(200)
      .json({ message: "Users are not friends", areFriends: false });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error in checking friendship status" });
  }
};

export const sendReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUser } = req.body;

    if (!otherUser) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (userId === otherUser) {
      return res
        .status(400)
        .json({ message: "Cannot send friend request to yourself" });
    }

    const [user, otherUserDetails] = await Promise.all([
      User.findById(userId).select("friends pendingFriendReqSent pendingFriendReq"),
      User.findById(otherUser).select("friends pendingFriendReq pendingFriendReqSent"),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!otherUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(otherUser)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (user.pendingFriendReqSent.includes(otherUser)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    if (user.pendingFriendReq.includes(otherUser)) {
      return res.status(400).json({
        message: "This user has already sent you a friend request. Accept it.",
      });
    }

    await Promise.all([
      User.findByIdAndUpdate(otherUser, {
        $push: { pendingFriendReq: userId },
      }),
      User.findByIdAndUpdate(userId, {
        $push: { pendingFriendReqSent: otherUser },
      }),
    ]);

    return res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Error in sending friend request" });
  }
};
export const retractReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUser } = req.body;

    if (!otherUser) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (userId === otherUser) {
      return res.status(400).json({ message: "Invalid operation" });
    }

    const [user, otherUserDetails] = await Promise.all([
      User.findById(userId).select("friends pendingFriendReqSent"),
      User.findById(otherUser).select("friends pendingFriendReq"),
    ]);

    if (!user || !otherUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(otherUser)) {
      return res.status(400).json({ message: "Already friends" });
    }
    if (!user.pendingFriendReqSent.includes(otherUser)) {
      return res.status(400).json({ message: "No friend request to retract" });
    }
    await Promise.all([
      User.findByIdAndUpdate(otherUser, {
        $pull: { pendingFriendReq: userId },
      }),
      User.findByIdAndUpdate(userId, {
        $pull: { pendingFriendReqSent: otherUser },
      }),
    ]);

    return res
      .status(200)
      .json({ message: "Friend request retracted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in sending friend request" });
  }
};
export const acceptReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUser } = req.body;

    if (!otherUser) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (userId === otherUser) {
      return res.status(400).json({ message: "Invalid operation" });
    }

    const [user, otherUserDetails] = await Promise.all([
      User.findById(userId).select("friends pendingFriendReq"),
      User.findById(otherUser).select("friends pendingFriendReqSent"),
    ]);

    if (!user || !otherUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(otherUser)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (!user.pendingFriendReq.includes(otherUser)) {
      return res.status(400).json({ message: "No friend request to accept" });
    }
    await Promise.all([
      User.findByIdAndUpdate(userId, {
        $push: { friends: otherUser },
        $pull: { pendingFriendReq: otherUser },
      }),
      User.findByIdAndUpdate(otherUser, {
        $push: { friends: userId },
        $pull: { pendingFriendReqSent: userId },
      }),
    ]);

    return res
      .status(200)
      .json({ message: "Friend request accepted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in sending friend request" });
  }
};
export const declineReq = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUser } = req.body;

    if (!otherUser) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (userId === otherUser) {
      return res.status(400).json({ message: "Invalid operation" });
    }

    const [user, otherUserDetails] = await Promise.all([
      User.findById(userId).select("pendingFriendReq"),
      User.findById(otherUser).select("pendingFriendReqSent"),
    ]);

    if (!user || !otherUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.pendingFriendReq.includes(otherUser)) {
      return res.status(400).json({ message: "No friend request to decline" });
    }

    await Promise.all([
      User.findByIdAndUpdate(otherUser, {
        $pull: { pendingFriendReqSent: userId },
      }),
      User.findByIdAndUpdate(userId, {
        $pull: { pendingFriendReq: otherUser },
      }),
    ]);

    return res
      .status(200)
      .json({ message: "Friend request declined successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in sending friend request" });
  }
};
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUser } = req.body;

    if (!otherUser) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (userId === otherUser) {
      return res.status(400).json({ message: "Invalid operation" });
    }

    const [user, otherUserDetails] = await Promise.all([
      User.findById(userId).select("friends"),
      User.findById(otherUser).select("friends"),
    ]);

    if (!user || !otherUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friends.includes(otherUser)) {
      return res.status(400).json({ message: "Not friends" });
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, { $pull: { friends: otherUser } }),
      User.findByIdAndUpdate(otherUser, { $pull: { friends: userId } }),
    ]);

    return res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in sending friend request" });
  }
};

export const relationWithUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.id;

    if (!otherUserId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (userId === otherUserId) {
      return res
        .status(400)
        .json({ message: "Cannot check relation with yourself" });
    }

    const user = await User.findById(userId).select(
      "friends pendingFriendReq pendingFriendReqSent"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otherUserExists = await User.exists({ _id: otherUserId });
    if (!otherUserExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const status = {
      areFriends: false,
      requestSent: false,
      requestReceived: false,
    };

    if (user.friends.includes(otherUserId)) {
      status.areFriends = true;
      return res.status(200).json({ message: "Users are friends", status });
    }

    if (user.pendingFriendReq.includes(otherUserId)) {
      status.requestReceived = true;
      return res
        .status(200)
        .json({ message: "Friend request received", status });
    }

    if (user.pendingFriendReqSent.includes(otherUserId)) {
      status.requestSent = true;
      return res.status(200).json({ message: "Friend request sent", status });
    }

    return res.status(200).json({ message: "No relation", status });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in checking friendship status" });
  }
};

export const getFriendList = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId).populate(
      "friends",
      "username fName lName email"
    );

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Friend list fetched successfully",
      friends: userDetails.friends,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in fetching friend list"});
  }
};
