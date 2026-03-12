import mongoose, {Schema, model} from "mongoose";

const UserSchema = new Schema({
    firstName : {
        type: String,
        required: true,
        trim: true,
    },
    lastName : {
        type: String,
        trim: true,
    },
    userName : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase : true,
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength : 6,
    },
    friends : [{
        type: Schema.Types.ObjectId,
        ref : "User"
    }],
    avatar : {
        type : String,
        default: null,
    }
}, {timestamps: true});

UserSchema.index({ userName: "text", firstName: "text", lastName: "text" });


export const User = model('User', UserSchema);