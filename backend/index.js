import express, { response } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./Connection/connectToDb.js";
import authRoute from "./Routes/Auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CohereClientV2 } from "cohere-ai";
import chatRoute from "./Routes/Chat.js"

const app = express();
dotenv.config();

const port = process.env.PORT;
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

const cohereAPI = process.env.Cohere_API;
// console.log(cohereAPI);

const cohere = new CohereClientV2({ token: cohereAPI });

// response = co.chat(
// const response = cohere.chat(
//     model="command-a-03-2025",
//     messages=[
//         {
//             "role": "user",
//             "content": "I'm joining a new startup called Co1t today. Could you help me write a one-sentence introduction message to my teammates.",
//         }
//     ],
// )
app.get("/cohere", async (req, res) => {
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: "You respond in concise sentences.",
        },
        { role: "user", content: "Hello" },
        {
          role: "assistant",
          content: "Hi, how can I help you today?",
        },
        {
          role: "user",
          content: "I Don't want your help",
        },
      ],
    });
    console.log(response.message);
    console.log(response.message.content[0].text);

    return res.status(200);
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log("Server Started!");
});
