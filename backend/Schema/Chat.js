import mongoose, { model, Schema } from "mongoose";

const ChatSchema = new Schema({
    chatMessages : [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    chatUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true
    }],
    chatVisibility : {
        type : String,
        enum : ["public", "private"],
        default : "private"
    },
    chatName : {
        type : String,
        trim : true,
        maxlength : 20 
    },
    isGroupChat : {
        type : Boolean,
        default : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps: true});

ChatSchema.index({chatUsers : 1}); // to find all chats of user



export const Chat = model("Chat", ChatSchema);