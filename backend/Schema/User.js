import mongoose, {Schema, model} from "mongoose";

const UserSchema = new Schema({
    fName : {
        required: true,
        trim: true,
        type: String
    },
    lName : {
        trim: true,
        type: String
    },
    username : {
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    email : {
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    password : {
        required: true,
        trim: true,
        type: String,
        minlength : 6,
    },
    userChats : [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }],
    favouriteChats : [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }],
    friends : [{
        type: Schema.Types.ObjectId,
        ref : "User"
    }],
    pendingFriendReq : [{
        type: Schema.Types.ObjectId,
        ref : "User"
    }],
    pendingFriendReqSent : [{ 
    type: Schema.Types.ObjectId,
    ref : "User"
    }],

}, {timestamps: true});

export const User = model('User', UserSchema);