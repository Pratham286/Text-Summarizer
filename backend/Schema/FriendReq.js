import { model, Schema } from "mongoose";

const FriendRequestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
    required: true,
  },
}, { timestamps: true });

FriendRequestSchema.index({ receiver: 1, status: 1 });

FriendRequestSchema.index({ sender: 1, status: 1 });

FriendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const FriendRequest = model("FriendRequest", FriendRequestSchema);