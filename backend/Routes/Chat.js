import express from "express"
import { verify } from "../Middleware/verifyAuth.js";
import { addTextMsg, addToFav, createChatForSummary, deleteChat, deleteEmptyChat, getChat, getFavChat, getUserChat } from "../Controller/ChatController.js";

const router = express.Router();

router.post("/summary/create", verify, createChatForSummary);
router.post("/getchat", verify, getChat)
router.get("/getuserchat", verify, getUserChat)
router.post("/addtext", verify, addTextMsg)
router.delete("/delete/:id", verify, deleteChat)
router.post("/addtofav", verify, addToFav)
router.get("/getfavchat", verify, getFavChat)
router.delete("/deleteEmptyChats", verify, deleteEmptyChat)

//functions
router.post("/creategroupchat", verify, );
// createGroupChat
export default router;