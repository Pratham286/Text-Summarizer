// import dotenv from "dotenv";
// dotenv.config();
import 'dotenv/config'

import { connectToDb } from "./Connection/connectToDb.js";
import app from "./app.js";


const port = process.env.PORT || 3000;

connectToDb();

app.listen(port, () => {
  console.log("Server Started!");
});
