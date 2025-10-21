import { CohereClientV2 } from "cohere-ai";
import { Chat } from "../Schema/Chat.js";
import { Message } from "../Schema/Message.js";
import { User } from "../Schema/User.js";
import { insArr } from "../Data/Instruction.js";



export const createChatForSummary = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const {summaryType} = req.body;
    const newChat = new Chat({
      chatUser: userId,
      chatMessage: [],
    });
    const index = insArr.findIndex(item => item.type === summaryType);
    if(index === -1)
    {
      return res.status(404).json({message: "Invalid Summary type"});
    }
    const systemMessage = new Message({
      messageContent: insArr[index].prompt,
      messageRole: "system",
      messageType: "text",
      chat: newChat._id,
      messageUser: user.id,
    });
    // await newChat.save();
    // await systemMessage.save();
    await Promise.all([newChat.save(), systemMessage.save()]); // Atomicity and consistency.

    newChat.chatMessage.push(systemMessage._id);
    await newChat.save();
    // console.log(chatDetails)
    const chatDetails = await newChat.populate({
      path: "chatMessage",
      select: "messageContent messageRole messageType",
    });
    return res
      .status(200)
      .json({ Message: "Chat Created", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in creating chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ Message: "Error in creating chat for summarizer" });
  }
};

export const getChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chatDetails = await Chat.findById(chatId).populate({
      path: "chatMessage",
      select: "messageContent messageRole messageType chat messageUser",
    });
    return res
      .status(200)
      .json({ Message: "Fetched Chat", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in fetching chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ Message: "Error in fetching chat for summarizer" });
  }
};
export const getUserChat = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const chatDetails = await Chat.find({ chatUser: userId })
      .populate({
        path: "chatMessage",
        select: "messageContent messageRole messageType chat messageUser",
      })
      .sort({ updatedAt: -1 });
    return res
      .status(200)
      .json({ Message: "Fetched Chat", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in fetching chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ Message: "Error in fetching chat for summarizer" });
  }
};
export const addTextMsg = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { textMsg, chatId } = req.body;
    const userMessage = new Message({
      messageContent: textMsg,
      messageRole: "user",
      messageType: "text",
      chat: chatId,
      messageUser: userId,
    });
    await userMessage.save();
    const chatMsg = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { chatMessage: userMessage._id },
      },
      { new: true }
    ).populate({
      path: "chatMessage",
      select: "messageContent messageRole messageType",
    });

    const cohereAPI = process.env.Cohere_API;

    const cohere = new CohereClientV2({ token: cohereAPI });

    const msgArr = [{}];
    for (let i = 0; i < chatMsg.chatMessage.length; i++) {
      msgArr.push({
        role: chatMsg.chatMessage[i].messageRole,
        content: chatMsg.chatMessage[i].messageContent,
      });
    }
    msgArr.shift();
    // console.log(msgArr)
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: msgArr,
    });
    // console.log(response)

    const assistantMessage = new Message({
      messageContent: response.message.content[0].text,
      messageRole: "assistant",
      messageType: "text",
      chat: chatId,
      messageUser: userId,
    });
    await assistantMessage.save();
    const assistantchat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { chatMessage: assistantMessage._id },
      },
      { new: true }
    ).populate({
      path: "chatMessage",
      select: "messageContent messageRole messageType",
    });

    return (
      res
        .status(200)
        // .json({ Message: "Text Added", msgArr, response});
        .json({ Message: "Text Added", chatDetails: assistantchat })
    );
  } catch (error) {
    console.log("Error in adding text, Error: ", error);
    return res.status(500).json({ Message: "Error in adding text" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ Message: "Chat not found" });
    }
    await Message.deleteMany({ chat: chatId });
    await Chat.findByIdAndDelete(chatId);
    return res.status(200).json({ Message: "Chat Deleted" });
  } catch (error) {
    console.log("Error in deleting chat, Error: ", error);
    return res.status(500).json({ Message: "Error in deleting chat" });
  }
};
export const addToFav = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { chatId } = req.body;
    const temp = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favouriteChat: chatId },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Added in favourites" });
  } catch (error) {
    console.log("Error in adding to favourite, Error: ", error);
    return res.status(500).json({ message: "Error in adding to favourite" });
  }
};
export const getFavChat = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    // const userDetails = await User.findById(userId).populate({
    //   path: "favouriteChat",
    //   select: "chatMessage",
    //   // path: "chatMessage",
    //   // select: "messageContent messageRole messageType chat messageUser",
    // });
    const userDetails = await User.findById(userId);
    const userFav = userDetails.favouriteChat;
    // console.log(userFav[0]);
    const chats = await Chat.find({ _id: { $in: userFav} }).populate({
        path: "chatMessage",
        select: "messageContent messageRole messageType chat messageUser",
      })
      .sort({ updatedAt: -1 });;
    // console.log(chats);
    return res.status(200).json({ message: "Fetched favourites", chats});
  } catch (error) {
    console.log("Error in fetching favourite chat, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in fetching favourite chat" });
  }
};
