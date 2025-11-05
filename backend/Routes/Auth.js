import express from "express"
import { checkUser, login, logout, signup } from "../Controller/AuthController.js";
import { verify } from "../Middleware/verifyAuth.js";

const router = express.Router();

router.get("/verify", verify , checkUser) // For Authorization Checking.
router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", verify, logout)



export default router;