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
        // unique: true,
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
    userChat: [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }],
    favouriteChat: [{
        type: Schema.Types.ObjectId,
        ref: "Chat"
    }]

}, {timestamps: true});

export const User = model('User', UserSchema);