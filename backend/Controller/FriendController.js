import { Chat } from "../Schema/Chat.js";
import { Message } from "../Schema/Message.js";
import { User } from "../Schema/User.js";
import { FriendRequest } from "../Schema/FriendReq.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  const userDetails = req.user;
  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, userDetails, "User found"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const userid = req.params.id;
  if (!userid) {
    throw new ApiError(400, "Id required");
  }
  const profile = await User.findById(userid).select("-password");
  if (!profile) {
    throw new ApiError(404, "User profile not found");
  }
  return res.status(200).json(new ApiResponse(200, profile, "User found"));
});

export const searchUser = asyncHandler(async (req, res) => {
  const { query } = req.body;
  if (!query) {
    throw new ApiError(400, "Query not found");
  }

  const searchQuery = query.trim();
  if (!searchQuery) {
    throw new ApiError(400, "Query not found");
  }

  const users = await User.find({
    $text: { $search: searchQuery },
  })
    .select("-password")
    .limit(20);

  return res.status(200).json(new ApiResponse(200, users, "Users found"));
});

export const areFriends = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.id;
  if (!otherUserId) {
    throw new ApiError(404, "Other user not found");
  }
  const user = await User.findById(userId).select("friends");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const areFriends = user.friends.some(
    (friendId) => friendId.toString() === otherUserId,
  );
  return res.status(200).json(new ApiResponse(200, { areFriends }, "Success"));
});

export const getFriendList = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const userDetails = await User.findById(userId)
    .select("friends")
    .populate("friends", "userName firstName lastName email");

  if (!userDetails) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { friends: userDetails.friends },
        "Friend list fetched",
      ),
    );
});

export const removeFriend = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(400, "User ID is required");
  }

  if (userId === otherUserId) {
    throw new ApiError(400, "Invalid operation");
  }

  const user = await User.findById(userId).select("friends");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const areFriends = user.friends.some(
    (friendId) => friendId.toString() === otherUserId,
  );

  if (!areFriends) {
    throw new ApiError(400, "Users not friends");
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, { $pull: { friends: otherUserId } }),
    User.findByIdAndUpdate(otherUserId, { $pull: { friends: userId } }),
  ]);

  return res.status(200).json(new ApiResponse(200, null, "Friend removed successfully"));
});

export const sendReq = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(400, "Other user Id required");
  }
  if (userId === otherUserId) {
    return res
      .status(400)
      .json({ message: "Cannot send friend request to yourself" });
  }

  // const [user, otherUserDetails] = await Promise.all([
  //   User.findById(userId).select(
  //     "friends pendingFriendReqSent pendingFriendReq",
  //   ),
  //   User.findById(otherUser).select(
  //     "friends pendingFriendReq pendingFriendReqSent",
  //   ),
  // ]);

  const user = await User.findById(userId).select("friends");

  const areFriends = user.friends.some(
    (friendId) => friendId.toString() === otherUserId,
  );
  if (areFriends) {
    return res.status(400).json({ message: "Already friends" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!otherUserDetails) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.pendingFriendReqSent.includes(otherUserId)) {
    return res.status(400).json({ message: "Friend request already sent" });
  }

  if (user.pendingFriendReq.includes(otherUserId)) {
    return res.status(400).json({
      message: "This user has already sent you a friend request. Accept it.",
    });
  }

  await Promise.all([
    User.findByIdAndUpdate(otherUserId, {
      $push: { pendingFriendReq: userId },
    }),
    User.findByIdAndUpdate(userId, {
      $push: { pendingFriendReqSent: otherUserId },
    }),
  ]);

  return res.status(200).json({ message: "Friend request sent successfully" });
});
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
      "friends pendingFriendReq pendingFriendReqSent",
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
