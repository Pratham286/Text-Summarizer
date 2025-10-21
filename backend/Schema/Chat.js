import mongoose, { model, Schema } from "mongoose";

const ChatSchema = new Schema({
    chatMessage : [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    
    }],
    chatUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export const Chat = model("Chat", ChatSchema);