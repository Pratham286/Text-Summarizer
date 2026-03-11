import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import authRoute from "./Routes/Auth.js";
import chatRoute from "./Routes/Chat.js";
import friendsRoute from "./Routes/Friends.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://brieflyai-frontend.onrender.com",
    ],
    credentials: true,
  }),
);

app.use("/auth", authRoute);
app.use("/chat", chatRoute);
app.use("/friends", friendsRoute);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        errors: err.errors || []
    })
})

export default app;