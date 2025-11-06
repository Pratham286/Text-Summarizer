import express from "express";
import { verify } from "../Middleware/verifyAuth.js";
import { acceptReq, areFriends, declineReq, getProfile, getUser, removeFriend, searchUser, sendReq } from "../Controller/FriendController.js";

const router = express.Router();

//endpoints

// getUser
router.get("/getuser",verify, getUser);

// getOtherUserProfile
router.get("/getprofile/:id", verify, getProfile);

// SearchUsers
router.post("/searchuser", verify, searchUser);

// arefriends?
router.get("/arefriends/:id", verify, areFriends);


// sendFriendReq
router.post("/sendfriendreq", verify, sendReq);


// acceptFriendReq
router.post("/acceptfriendreq", verify, acceptReq);

// rejectFriendReq
router.post("/declinefriendreq", verify, declineReq);

// removeFriend
router.post("/removefriend", verify, removeFriend);



export default router;