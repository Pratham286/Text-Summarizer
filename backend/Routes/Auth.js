import express from "express"
import { login, logout, signup, getUser } from "../Controller/AuthController.js";
import { verify } from "../Middleware/verifyAuth.js";
import { upload } from "../Middleware/uploadMulter.js";

const router = express.Router();

// router.get("/verify", verify , checkUser) // For Authorization Checking.
router.post("/signup", upload.single('avatar') , signup)
router.post("/login", login)
router.post("/logout", verify, logout)
router.post("/getuser", verify, getUser);



export default router;