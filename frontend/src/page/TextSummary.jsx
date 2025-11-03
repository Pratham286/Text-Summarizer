import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaTrash, FaSpinner } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import MessageContent from "../component/MessageContent";

const TextSummary = () => {
  const location = useLocation();
  const chatId = location.state || null;
  const { url } = useMyContext();
  const [chatData, setChatData] = useState();
  const [messageData, setMessageData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [favPopUp, setFavPopUp] = useState(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      setIsSubmitting(true);
      try {
        const data = {
          textMsg: message,
          chatId: chatId,
        };
        const response = await axios.post(`${url}/chat/addtext`, data, {
          withCredentials: true,
        });
        console.log(response);
        setMessage(""); // Clear input after sending
      } catch (error) {
        console.log("Error in sending message, Error: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.post(
          `${url}/chat/getChat`,
          { chatId: chatId },
          { withCredentials: true }
        );
        setChatData(response.data.chatDetails);
        setMessageData(response.data.chatDetails.chatMessages.slice(1));
      } catch (error) {
        console.log("Error in fetching chat, Error: ", error);
      }
    };
    fetchChat();
  }, [isSubmitting, chatId]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/chat/delete/${chatId}`, {
        withCredentials: true,
      });
      window.location.href = "/dashboard"; // This will navigate and refresh
    } catch (error) {
      console.log("Error in deleting message, Error: ", error);
    }
  };

  const handleFav = async () => {
    try {
      const response = await axios.post(
        `${url}/chat/addtofav`,
        { chatId: chatId },
        { withCredentials: true }
      );
      setFavPopUp(false);
    } catch (error) {
      console.log("Error in adding to favourites, Error: ", error);
    }
  };

  if (isSubmitting && messageData?.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      
        <div className="flex flex-col items-center relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-800 border-t-slate-400 shadow-2xl"></div>
            <div className="absolute inset-0 rounded-full bg-slate-700/10 blur-md"></div>
            <FaSpinner className="absolute inset-0 m-auto h-7 w-7 text-slate-500" />
          </div>
          <div className="mt-8 text-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-xl text-white font-semibold">Processing your message...</p>
            <p className="mt-2 text-sm text-slate-400 font-medium">Please wait while AI generates response</p>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-700 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-slate-600 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-slate-700 rounded-full animate-ping delay-2000"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-slate-600 rounded-full animate-ping delay-3000"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Backdrop for popups */}
      {(deletePopUp || favPopUp) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40"></div>
      )}

      <div className={`transition-all duration-500 ${(deletePopUp || favPopUp) ? "blur-sm scale-95" : ""} relative z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 h-[calc(100vh-3rem)] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-slate-800 rounded-xl transition-all duration-300 border border-slate-800"
                  >
                    <IoMdArrowBack className="h-5 w-5 text-slate-400" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
                      <HiChatBubbleLeftRight className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">Chat Conversation</h1>
                      <p className="text-slate-400 text-xs mt-0.5">Intelligent AI Assistant</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    onClick={handleClick}
                    className="p-2 hover:bg-slate-800 rounded-xl transition-all duration-300 border border-slate-800"
                  >
                    <BsThreeDots className="h-5 w-5 text-slate-400" />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 py-2 min-w-[200px] z-30">
                      <button
                        onClick={() => {
                          setDeletePopUp(true);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        <FaTrash className="h-3.5 w-3.5" />
                        <span>Delete Chat</span>
                      </button>
                      <button
                        onClick={() => {
                          setFavPopUp(true);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        <FaHeart className="h-3.5 w-3.5" />
                        <span>Add to Favorites</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto bg-slate-950">
              {messageData !== null ? (
                messageData.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center max-w-md mx-auto px-6">
                      <div className="p-6 bg-slate-900 rounded-full inline-block mb-6 shadow-2xl border border-slate-800">
                        <HiChatBubbleLeftRight className="h-16 w-16 text-slate-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Start Your Conversation</h3>
                      <p className="text-slate-400 text-base leading-relaxed">
                        Begin chatting by typing a message below. Your intelligent conversation will appear here.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-4 space-y-4">
                    {messageData.map((msgData) => (
                      <MessageContent
                        role={msgData.messageRole}
                        content={msgData.messageContent}
                        key={msgData._id}
                      />
                    ))}
                    {isSubmitting && (
                      <div className="flex items-center gap-3 text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-700 border-t-slate-400"></div>
                        <span className="text-sm font-medium">AI is thinking...</span>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-3 text-slate-400 bg-slate-900 p-5 rounded-xl border border-slate-800">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-700 border-t-slate-400"></div>
                    <span className="text-base font-medium">Loading conversation...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full p-4 border border-slate-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-slate-700 transition-all duration-300 bg-slate-950 hover:bg-slate-900 font-medium text-white placeholder-slate-500 text-sm leading-relaxed"
                    rows="3"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSubmitting}
                  className="p-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:opacity-50 text-white rounded-xl transition-all duration-300 shadow-lg border border-slate-700"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  ) : (
                    <IoMdSend className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletePopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 max-w-md w-full">
            <div className="text-center">
              <div className="p-4 bg-slate-800 rounded-full inline-block mb-5 border border-slate-700">
                <FaTrash className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Delete Chat?</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                This action cannot be undone. All messages in this chat will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletePopUp(false)}
                  className="flex-1 px-6 py-3 border border-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium shadow-lg transition-all duration-300 text-sm border border-slate-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Favorites Modal */}
      {favPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8 max-w-md w-full">
            <div className="text-center">
              <div className="p-4 bg-slate-800 rounded-full inline-block mb-5 border border-slate-700">
                <FaHeart className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Add to Favorites?</h3>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                This chat will be added to your favorites list for easy access.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setFavPopUp(false)}
                  className="flex-1 px-6 py-3 border border-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFav}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium shadow-lg transition-all duration-300 text-sm border border-slate-700"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextSummary;