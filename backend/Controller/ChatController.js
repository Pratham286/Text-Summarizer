import { CohereClientV2 } from "cohere-ai";
import { Chat } from "../Schema/Chat.js";
import { Message } from "../Schema/Message.js";
import { User } from "../Schema/User.js";
import { insArr } from "../Data/Instruction.js";

export const createChatForSummary = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { summaryType } = req.body;

    if (!summaryType) {
      return res.status(400).json({ message: "Summary type is required" });
    }

    const index = insArr.findIndex((item) => item.type === summaryType);
    if (index === -1) {
      return res.status(404).json({ message: "Invalid Summary type" });
    }
    const newChat = new Chat({
      chatUsers: [userId],
      chatMessages: [],
      isGroupChat: false,
      createdBy: userId,
    });
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

    newChat.chatMessages.push(systemMessage._id);
    await newChat.save();
    // console.log(chatDetails)
    const chatDetails = await newChat.populate({
      path: "chatMessages",
      select: "messageContent messageRole messageType isDeleted",
    });
    return res
      .status(201)
      .json({ message: "Chat Created", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in creating chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in creating chat for summarizer" });
  }
};

export const getChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const userId = req.user.id;
    if (!chatId) {
      return res.status(400).json({ message: "No ChatId Found" });
    }
    const chatDetails = await Chat.findById(chatId).populate({
      path: "chatMessages",
      select:
        "messageContent messageRole messageType chat messageUser isDeleted",
    });
    if (!chatDetails) {
      return res.status(404).json({ message: "No Chat Found" });
    }
    if (!chatDetails.chatUsers.includes(userId)) {
      return res
        .status(403)
        .json({ message: "User is not allowed to open this chat" });
    }
    return res
      .status(200)
      .json({ message: "Fetched Chat", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in fetching chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in fetching chat for summarizer" });
  }
};
export const getUserChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatDetails = await Chat.find({
      chatUsers: { $in: [userId] },
      isGroupChat: false,
    })
      .populate({
        path: "chatMessages",
        select:
          "messageContent messageRole messageType chat messageUser isDeleted",
      })
      .sort({ updatedAt: -1 }); // Latest chat first
    return res
      .status(200)
      .json({ message: "Fetched Chat", chatDetails: chatDetails });
  } catch (error) {
    console.log("Error in fetching chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in fetching chat for summarizer" });
  }
};
export const addTextMsg = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { textMsg, chatId } = req.body;

    if(!textMsg || !chatId)
    {
      return res.status(400).json({ message: "Invalid Inputs" });
    }
        const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.chatUsers.includes(userId)) {
      return res.status(403).json({ message: "Access denied to this chat" });
    }  
    const cohereAPI = process.env.Cohere_API;
    if (!cohereAPI) {
      console.error("Cohere API key not found");
      return res.status(500).json({ message: "AI service configuration error" });
    }
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
        $push: { chatMessages: userMessage._id },
      },
      { new: true }
    ).populate({
      path: "chatMessages",
      select: "messageContent messageRole messageType isDeleted",
    });

    // const cohereAPI = process.env.Cohere_API;

    const cohere = new CohereClientV2({ token: cohereAPI });

    // app.get("/cohere", async (req, res) => {
    //   try {
    //     const response = await cohere.chat({
    //       model: "command-a-03-2025",
    //       messages: [
    //         {
    //           role: "system",
    //           content: "You respond in concise sentences.",
    //         },
    //         { role: "user", content: "Hello" },
    //         {
    //           role: "assistant",
    //           content: "Hi, how can I help you today?",
    //         },
    //         {
    //           role: "user",
    //           content: "I Don't want your help",
    //         },
    //       ],
    //     });
    //     console.log(response.message);
    //     console.log(response.message.content[0].text);

    //     return res.status(200);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // const msgArr = [{}];
    // for (let i = 0; i < chatMsg.chatMessages.length; i++) {
    //   msgArr.push({
    //     role: chatMsg.chatMessages[i].messageRole,
    //     content: chatMsg.chatMessages[i].messageContent,
    //   });
    // }
    // msgArr.shift();
    // console.log(msgArr)

    const msgArr = chatMsg.chatMessages.map((m) => ({
      role: m.messageRole,
      content: m.messageContent,
    }));

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
        $push: { chatMessages: assistantMessage._id },
      },
      { new: true }
    ).populate({
      path: "chatMessages",
      select: "messageContent messageRole messageType isDeleted",
    });

    return (
      res
        .status(200)
        // .json({ Message: "Text Added", msgArr, response});
        .json({ message: "Text Added", chatDetails: assistantchat })
    );
  } catch (error) {
    console.log("Error in adding text, Error: ", error);
    return res.status(500).json({ message: "Error in adding text" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const userId = req.user.id;
    if(!chatId)
    {
      return res.status(400).json({message : "Chat Id not found"});
    }
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.chatUsers.includes(userId)) {
      return res.status(403).json({ message: "Access denied to delete this chat" });
    }
    await Promise.all([
      Message.deleteMany({ chat: chatId }),
      Chat.findByIdAndDelete(chatId),
    ])
    return res.status(200).json({ message: "Chat Deleted" });
  } catch (error) {
    console.error("Error in deleting chat, Error: ", error);
    return res.status(500).json({ message: "Error in deleting chat" });
  }
};
export const addToFav = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chatId } = req.body;
    if(!chatId)
    {
      return res.status(400).json({message : "Chat Id not found"});
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.chatUsers.includes(userId)) {
      return res.status(403).json({ message: "Access denied to this chat" });
    }
    const user = await User.findById(userId);
    if (user.favouriteChats.includes(chatId)) {
      return res.status(400).json({ message: "Chat already in favorites" });
    }
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { favouriteChats: chatId },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Added in favourites" });
  } catch (error) {
    console.error("Error in adding to favourite, Error: ", error);
    return res.status(500).json({ message: "Error in adding to favourite" });
  }
};
export const getFavChat = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId).select("favouriteChats");
    
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    const userFav = userDetails.favouriteChats;

    const chats = await Chat.find({ _id: { $in: userFav } })
      .populate({
        path: "chatMessages",
        select:
          "messageContent messageRole messageType chat messageUser isDeleted",
      })
      .sort({ updatedAt: -1 });
    return res.status(200).json({ message: "Fetched favourites", chats });
  } catch (error) {
    console.error("Error in fetching favourite chat, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in fetching favourite chat" });
  }
};

export const deleteEmptyChat = async (req, res) => {
  try {
          const userId = req.user.id;

    const result = await Chat.deleteMany({
      chatMessages: { $size: 1 },
      chatUsers: userId,
    });

    await Message.deleteMany({
      chat: { $exists: false } 
    });

    return res.status(200).json({ 
      message: `Deleted ${result.deletedCount} empty chat(s)`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error in deleting chats", error);
    return res.status(500).json({ message: "Error in deleting chats" });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const { summaryType, usersList, groupName } = req.body;

    if(!summaryType || !usersList || !groupName)
    {
      return res.status(400).json({message : "Invalid Inputs"});
    }
    if(usersList.length <=1)
    {
      return res.status(400).json({message : "Need More Members"});
    }
    const newChat = new Chat({
      chatUsers: usersList,
      chatMessages: [],
      isGroupChat: true,
      createdBy: userId,
      chatName: groupName,
    });
    const index = insArr.findIndex((item) => item.type === summaryType);
    if (index === -1) {
      return res.status(404).json({ message: "Invalid Summary type" });
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

    newChat.chatMessages.push(systemMessage._id);
    await newChat.save();
    // console.log(chatDetails)
    const chatDetails = await newChat.populate({
      path: "chatMessages",
      select: "messageContent messageRole messageType isDeleted",
    });
    return res
      .status(201)
      .json({ Message: "Chat Created", chatDetails: chatDetails });
  } catch (error) {
    return res.status(500).json({ message: "Error in creating group chat" });
  }
};

export const getUserGroupChat = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const chatDetails = await Chat.find({
      chatUsers: { $in: [userId] },
      isGroupChat: true,
    })
      .populate({
        path: "chatMessages",
        select:
          "messageContent messageRole messageType chat messageUser isDeleted",
      })
      .sort({ updatedAt: -1 });
    return res
      .status(200)
      .json({ message: "Fetched Chat", chatDetails: chatDetails });
  } catch (error) {
    console.error("Error in fetching chat for summarizer, Error: ", error);
    return res
      .status(500)
      .json({ message: "Error in fetching chat for summarizer" });
  }
};
export const getUsersOfGroup = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.user.id;
    if (!chatId) {
      return res.status(400).json({ message: "ChatId not found" });
    }
    const chat = await Chat.findById(chatId)
      .populate({
        path: "chatMessages",
        select: "messageContent messageRole messageType chat messageUser isDeleted",
      })
      .populate({
        path: "chatUsers",
        select: "fName lName username email",
      });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.chatUsers.some(user => user._id.toString() === userId)) {
      return res.status(403).json({ message: "Access denied to this group" });
    }
    return res
      .status(200)
      .json({ message: "Fetched users of group chat", chat });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching users of group chat"});
  }
};
