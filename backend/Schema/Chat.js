import mongoose, { model, Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    chatUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    chatName: {
      type: String,
      trim: true,
      maxlength: 50,
      required: function () { // runValidation req when updating chat
        return this.isGroupChat;
      },
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

ChatSchema.index({ chatUsers: 1 }); // to find all chats of user

export const Chat = model("Chat", ChatSchema);
