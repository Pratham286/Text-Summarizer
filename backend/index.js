import express, { response } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./Connection/connectToDb.js";
import authRoute from "./Routes/Auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CohereClientV2 } from "cohere-ai";
import chatRoute from "./Routes/Chat.js"
import friendsRoute from "./Routes/Friends.js";

const app = express();
dotenv.config();

const port = process.env.PORT; //3000
connectToDb();

app.use(express.json()); 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/chat", chatRoute);
app.use("/friends", friendsRoute);

const cohereAPI = process.env.Cohere_API;

const cohere = new CohereClientV2({ token: cohereAPI });

app.get("/", async(req, res) => {
  return res.send("Server is running.");
})

app.listen(port, () => {
  console.log("Server Started!");
});
