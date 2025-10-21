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
    navigate('/textsummary', { state: chatId });
  };

  useEffect(() => {
    const getMyChat = async () => {
      setFetchingData(true);
      try {
        const response = await axios.get(`${url}/chat/getuserchat`, {
          withCredentials: true,
        });
        console.log(response.data.chatDetails);
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

      {/* Header Section */}
      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header card with glass morphism */}
          <div className="relative">
            <div className="absolute -inset-1 bg-slate-800/20 rounded-3xl blur opacity-50 animate-pulse"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-700 rounded-2xl blur opacity-50 animate-pulse"></div>
                  <div className="relative p-4 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
                    <FaComments className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    My Conversations
                  </h1>
                  <p className="text-slate-300 text-lg mt-2">
                    Access all your chat summaries and continue conversations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {fetchingData ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Enhanced loading animation */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-slate-700 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-700/20 border-t-slate-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaSpinner className="h-8 w-8 text-slate-400 animate-pulse" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Loading Your Conversations
            </h3>
            <p className="text-slate-300 text-center max-w-md">
              Please wait while we fetch your chat history and summaries
            </p>

            {/* Loading dots animation */}
            <div className="flex space-x-2 mt-6">
              <div className="w-3 h-3 bg-slate-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-slate-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-slate-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        ) : chatDetails !== null ? (
          <div>
            {chatDetails.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                {/* Enhanced empty state */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-slate-700 rounded-full blur opacity-50"></div>
                  <div className="relative p-8 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700">
                    {/* <FaMessage className="h-16 w-16 text-slate-400" /> */}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Conversations Yet
                </h3>
                <p className="text-slate-400 text-center max-w-md text-lg leading-relaxed mb-8">
                  Start your first conversation to see your chat history appear here. 
                  Your summaries and discussions will be saved automatically.
                </p>
                
                {/* CTA button */}
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
                >
                  <div className="absolute -inset-1 bg-slate-700 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    ✨ Start First Conversation
                    <FaArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats header */}
                <div className="relative mb-8">
                  <div className="absolute -inset-1 bg-slate-800/10 rounded-2xl blur"></div>
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
                          <FaClock className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            Recent Conversations
                          </h2>
                          <p className="text-slate-400">
                            {chatDetails.length} {chatDetails.length === 1 ? 'conversation' : 'conversations'} found
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/20 rounded-xl border border-slate-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-slate-300 text-sm font-medium">Live Updates</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat cards grid */}
                <div className="grid gap-6">
                  {chatDetails.map((chat, i) => (
                    <div key={i} className="group relative">
                      {/* Card glow effect */}
                      <div className="absolute -inset-1 bg-slate-800/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-3xl shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 overflow-hidden">
                        <div className="p-8">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-slate-800/20 rounded-lg border border-slate-700">
                                  {/* <FaMessage className="h-4 w-4 text-slate-400" /> */}
                                </div>
                                <span className="text-slate-400 text-sm font-medium">
                                  Conversation #{i + 1}
                                </span>
                              </div>
                              
                              {chat.chatMessage.length <= 1 ? (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <p className="text-slate-300 font-medium">Ready to start chatting</p>
                                  </div>
                                  <p className="text-slate-400 text-sm">
                                    This conversation is waiting for your first message
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    <p className="text-slate-400 text-sm font-medium">
                                      {chat.chatMessage.length} messages
                                    </p>
                                  </div>
                                  <p className="text-slate-200 text-lg leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                                    {chat.chatMessage[1].messageContent}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="ml-8 flex-shrink-0">
                              <button 
                                onClick={() => handleChatClick(chat._id)} 
                                className="group/btn relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold shadow-2xl hover:shadow-slate-700/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-slate-700"
                              >
                                <div className="absolute -inset-1 bg-slate-700 rounded-2xl blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                                <span className="relative z-10">Continue</span>
                                <FaArrowRight className="relative z-10 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bottom gradient accent */}
                        <div className="h-1 bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Enhanced error state */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur opacity-50"></div>
              <div className="relative p-8 bg-red-500/10 backdrop-blur-sm rounded-full border border-red-400/30">
                <FaComments className="h-16 w-16 text-red-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Unable to Load Conversations
            </h3>
            <p className="text-slate-400 text-center max-w-md text-lg leading-relaxed mb-8">
              We're having trouble loading your chats right now. Please check your connection and try again.
            </p>
            
            {/* Retry button */}
            <button 
              onClick={() => window.location.reload()}
              className="group relative overflow-hidden bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <div className="absolute -inset-1 bg-red-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
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