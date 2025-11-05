import express from "express";
import { verify } from "../Middleware/verifyAuth.js";
import { getProfile, getUser } from "../Controller/FriendController.js";

const router = express.Router();

//endpoints

// getUser
router.get("/getUser",verify, getUser);

// getOtherUserProfile
router.get("/getProfile/:id", verify, getProfile);

// SearchUsers

// arefriends?

// sendFriendReq

// acceptFriendReq

// rejectFriendReq

// removeFriend

// pending requests


export default router;