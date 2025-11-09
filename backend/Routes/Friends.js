import express from "express";
import { verify } from "../Middleware/verifyAuth.js";
import { acceptReq, areFriends, declineReq, getFriendList, getProfile, getUser, relationWithUser, removeFriend, retractReq, searchUser, sendReq } from "../Controller/FriendController.js";

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

// retractFriendReq
router.post("/retractfriendreq", verify, retractReq);


// acceptFriendReq
router.post("/acceptfriendreq", verify, acceptReq);

// rejectFriendReq
router.post("/declinefriendreq", verify, declineReq);

// removeFriend
router.post("/removefriend", verify, removeFriend);

// relation with user

router.get("/relation/:id", verify, relationWithUser);

router.get("/friendlist", verify, getFriendList);



export default router;