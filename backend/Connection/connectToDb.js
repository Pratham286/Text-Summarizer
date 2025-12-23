import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.Mongo, {
            serverSelectionTimeoutMS : 10000,               // if not connected in 10 second, exit.
        });
        console.log("Database connected!");
    } catch (error) {
        console.log("Failed to Connect to Database, Error: ", error);
        process.exit(1); // Stops the server in case of error.
    }
}