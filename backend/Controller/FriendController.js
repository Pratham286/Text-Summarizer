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
  // console.log(query)
  const searchQuery = query.trim();
  if (!searchQuery) {
    throw new ApiError(400, "Query not found");
  }

  const users = await User.find({
    $or: [
      { userName: { $regex: searchQuery, $options: "i" } },
      { firstName: { $regex: searchQuery, $options: "i" } },
      { lastName: { $regex: searchQuery, $options: "i" } },
    ],
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

  // If they are not friends, pull will handle that case as well.

  await Promise.all([
    User.findByIdAndUpdate(userId, { $pull: { friends: otherUserId } }),
    User.findByIdAndUpdate(otherUserId, { $pull: { friends: userId } }),
    FriendRequest.findOneAndDelete({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Friend removed successfully"));
});

export const sendReq = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(400, "Other user Id required");
  }
  if (userId === otherUserId) {
    throw new ApiError(400, "Cannot send friend request to yourself");
  }

  // const user = await User.findById(userId).select("friends");

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }
  // const areFriends = user.friends.some(
  //   (friendId) => friendId.toString() === otherUserId,
  // );

  // if (areFriends) {
  //   throw new ApiError(400, "Already friends");
  // }

  const friendReqSent = await FriendRequest.findOne({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  });

  if (friendReqSent?.status === "pending") {
    throw new ApiError(400, "Request already there");
  }
  if (friendReqSent?.status === "accepted") {
    throw new ApiError(400, "Already friends");
  }

  const FriendReq = new FriendRequest({
    sender: userId,
    receiver: otherUserId,
  });
  await FriendReq.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Friend Request Send successfully"));
});

export const retractReq = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(404, "other user not found");
  }
  if (userId === otherUserId) {
    throw new ApiError(400, "Same user");
  }

  const friendReqSent = await FriendRequest.findOne({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  });

  if (!friendReqSent) {
    throw new ApiError(400, "No Request");
  }
  if (friendReqSent?.status === "accepted") {
    throw new ApiError(400, "Already friends");
  }

  await FriendRequest.deleteOne({
    sender: userId,
    receiver: otherUserId,
    status: "pending",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Friend request retracted successfully"));
});

export const acceptReq = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(404, "Other user not found");
  }

  if (userId === otherUserId) {
    throw new ApiError(400, "Same user");
  }

  const pendingReq = await FriendRequest.findOne({
    sender: otherUserId,
    receiver: userId,
    status: "pending",
  });

  if (!pendingReq) {
    throw new ApiError(400, "No pending request");
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, {
      $push: { friends: otherUserId },
    }),
    User.findByIdAndUpdate(otherUserId, {
      $push: { friends: userId },
    }),
    FriendRequest.findByIdAndUpdate(pendingReq._id, {
      status: "accepted",
    }),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Friend request accepted"));
});

export const declineReq = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new ApiError(404, "Other user not found");
  }

  if (userId === otherUserId) {
    throw new ApiError(400, "Same user");
  }

  const pendingReq = await FriendRequest.findOne({
    sender: otherUserId,
    receiver: userId,
    status: "pending",
  });

  if (!pendingReq) {
    throw new ApiError(400, "No pending request");
  }
  await FriendRequest.findByIdAndDelete(pendingReq._id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Friend request declined"));
});

export const relationWithUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.id;

  if (!otherUserId) {
    throw new ApiError(400, "User ID is required");
  }

  if (userId === otherUserId) {
    throw new ApiError(400, "Cannot check relation with yourself");
  }

  const friendStatus = {
    areFriends: false,
    requestSent: false,
    requestReceived: false,
  };

  const friendReq = await FriendRequest.findOne({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  });

  if (friendReq?.status === "accepted") {
    friendStatus.areFriends = true;
  } else if (friendReq?.status === "pending") {
    if (friendReq?.sender.toString() === userId) {
      friendStatus.requestSent = true;
    } else if (friendReq?.sender.toString() === otherUserId) {
      friendStatus.requestReceived = true;
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, friendStatus, "Relation fetched successfully"));
});
