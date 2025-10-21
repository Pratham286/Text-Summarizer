import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.Mongo);
        console.log("Database connected!");
    } catch (error) {
        console.log("Failed to Connect to Database, Error: ", error);
    }
}