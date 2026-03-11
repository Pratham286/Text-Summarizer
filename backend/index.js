import dotenv from "dotenv";
import { connectToDb } from "./Connection/connectToDb.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectToDb();

app.listen(port, () => {
  console.log("Server Started!");
});
