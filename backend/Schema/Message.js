import mongoose, { model, Schema } from "mongoose";

const MessageSchema = new Schema({
    messageContent : {
        type: String,
        trim: true,
        maxlength : 2000,
        required : true,
    },
    messageRole : {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        required: true,
    },
    chat : {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
        index: true,
    },
    messageUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted : {
        type :  Boolean,
        default : false
    }
}, {timestamps: true});

MessageSchema.index({chat: 1, createdAt: -1});

export const Message = model("Message", MessageSchema);