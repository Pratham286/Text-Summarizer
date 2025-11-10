import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { FaArrowRight, FaComments, FaSpinner, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyChats = () => {
  const { user, url } = useMyContext();
  const [chatDetails, setChatDetails] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate("/textsummary", { state: chatId });
  };

  useEffect(() => {
    const getMyChat = async () => {
      setFetchingData(true);
      try {
        const response = await axios.get(`${url}/chat/getuserchat`, {
          withCredentials: true,
        });
        // console.log(response.data.chatDetails);
        setChatDetails(response.data.chatDetails);
      } catch (error) {
        console.log("Error in fetching user chats, error : ", error);
      } finally {
        setFetchingData(false);
      }
    };
    getMyChat();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative z-10 pt-8 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    My Conversations
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {fetchingData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSpinner className="h-8 w-8 text-slate-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Loading Your Conversations
            </h3>
            <p className="text-slate-300 text-center max-w-md">
              Please wait while we fetch your chat history and summaries
            </p>
          </div>
        ) : chatDetails !== null ? (
          <div>
            {chatDetails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Conversations Yet
                </h3>
                <p className="text-slate-400 text-center max-w-md text-md leading-relaxed mb-4">
                  Start your first conversation to see your chat history appear
                  here. Your summaries and discussions will be saved
                  automatically.
                </p>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-bold text-md px-8 py-4 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
                >
                  <span className="relative z-10 flex items-center">
                    ✨ Start First Conversation
                    <FaArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-6">
                  {chatDetails.map((chat, i) => (
                    <div key={i} className="group relative">
                      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-3xl shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 overflow-hidden">
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              {chat.chatMessages.length <= 1 ? (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <p className="text-slate-300 font-medium">
                                      Ready to start chatting
                                    </p>
                                  </div>
                                  <p className="text-slate-400 text-sm">
                                    This conversation is waiting for your first
                                    message
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <p className="ml-6 text-slate-200 text-md leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                                    {chat.chatMessages[1].messageContent}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="ml-8 flex-shrink-0">
                              <button
                                onClick={() => handleChatClick(chat._id)}
                                className="group/btn relative overflow-hidden flex items-center gap-3 px-8 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold shadow-2xl hover:shadow-slate-700/30 transform hover:scale-105 transition-all duration-300 border border-slate-700"
                              >
                                <span className="relative z-10">Continue</span>
                                <FaArrowRight className="relative z-10 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
              <div className="relative p-8 bg-red-500/10 backdrop-blur-sm rounded-full border border-red-400/30">
                <FaComments className="h-16 w-16 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Unable to Load Conversations
            </h3>
            <p className="text-slate-400 text-center max-w-md text-md leading-relaxed mb-8">
              We're having trouble loading your chats right now. Please check
              your connection and try again.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="group relative overflow-hidden bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center">
                🔄 Try Again
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
