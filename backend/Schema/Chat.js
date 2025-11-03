import mongoose, { model, Schema } from "mongoose";

const ChatSchema = new Schema({
    chatMessages : [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    chatUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    chatVisibility : {
        type : String,
        enum : ["public", "private"],
        default : "private"
    },
    chatName : {
        type : String,
        trim : true
    },
    isGroupChat : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps: true});

ChatSchema.index({chatUsers : 1}); // to find all chats of user

export const Chat = model("Chat", ChatSchema);