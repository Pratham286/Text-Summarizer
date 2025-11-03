import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { FaArrowRight, FaHeart, FaSpinner, FaStar, FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavChat = () => {
  const { url, user } = useMyContext();
  const [fetched, isFetched] = useState(false);
  const [favChatArr, setFavChatArr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavChat = async () => {
      isFetched(true);
      try {
        const response = await axios(`${url}/chat/getfavchat`, {
          withCredentials: true,
        });
        setFavChatArr(response.data.chats);
      } catch (error) {
        console.log("Error in fetching chat, Error: ", error);
      } finally {
        isFetched(false);
      }
    };
    fetchFavChat();
  }, []);

  const handleClick = (chatId) => {
    navigate('/textsummary', { state: chatId });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
    

      {/* Header Section */}
      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header card with glass morphism */}
          <div className="relative">
            <div className="absolute -inset-1 bg-slate-800/20 rounded-3xl blur opacity-50"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-6 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-700 rounded-2xl blur opacity-50"></div>
                  <div className="relative p-4 bg-slate-800 rounded-2xl shadow-2xl">
                    <FaHeart className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Favorite Conversations
                  </h1>
                  <p className="text-slate-300 text-lg mt-2">
                    Your most cherished chats and memorable summaries ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20 relative z-10">
        {fetched ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Enhanced loading animation */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-slate-700 rounded-full blur opacity-30"></div>
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-800 border-t-slate-400"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaHeart className="h-8 w-8 text-slate-400" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Loading Your Favorites
            </h3>
            <p className="text-slate-300 text-center max-w-md">
              Gathering your most beloved conversations and summaries
            </p>

            {/* Loading hearts animation */}
            <div className="flex space-x-3 mt-6">
              <FaHeart className="w-4 h-4 text-slate-500 animate-bounce" />
              <FaHeart className="w-4 h-4 text-slate-400 animate-bounce delay-100" />
              <FaHeart className="w-4 h-4 text-slate-500 animate-bounce delay-200" />
            </div>
          </div>
        ) : (
          <div>
            {favChatArr !== null ? (
              favChatArr.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  {/* Enhanced empty state */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-slate-700 rounded-full blur opacity-50"></div>
                    <div className="relative p-8 bg-slate-900 rounded-full border border-slate-800">
                      <FaHeartBroken className="h-16 w-16 text-slate-400" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    No Favorites Yet
                  </h3>
                  <p className="text-slate-400 text-center max-w-md text-lg leading-relaxed mb-8">
                    You haven't marked any conversations as favorites yet. Start exploring and save your best chats by clicking the heart icon!
                  </p>
                  
                  {/* CTA buttons */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
                    >
                      <div className="absolute -inset-1 bg-slate-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center">
                        ✨ Start Chatting
                      </span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/mychats')}
                      className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-800"
                    >
                      <span className="relative z-10 flex items-center">
                        💬 View All Chats
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats header */}
                  <div className="relative mb-8">
                    <div className="absolute -inset-1 bg-slate-800/10 rounded-2xl blur"></div>
                    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-slate-800 rounded-xl shadow-lg">
                            <FaStar className="h-6 w-6 text-slate-400" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">
                              Your Favorite Collection
                            </h2>
                            <p className="text-slate-400">
                              {favChatArr.length} {favChatArr.length === 1 ? 'favorite conversation' : 'favorite conversations'}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
                          <FaHeart className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300 text-sm font-medium">Curated Collection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Favorite chat cards grid */}
                  <div className="grid gap-6">
                    {favChatArr.map((chat, i) => (
                      <div key={i} className="group relative">
                        {/* Card glow effect */}
                        <div className="absolute -inset-1 bg-slate-700/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        
                        <div className="relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden">
                          <div className="p-8">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                    <FaHeart className="h-4 w-4 text-slate-400" />
                                  </div>
                                  <span className="text-slate-400 text-sm font-medium">
                                    Favorite #{i + 1}
                                  </span>
                                  <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                                    <span className="text-slate-300 text-xs font-bold">★ LOVED</span>
                                  </div>
                                </div>
                                
                                {chat.chatMessages.length <= 1 ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                                      <p className="text-slate-300 font-medium flex items-center gap-2">
                                        <FaHeart className="h-3 w-3 text-slate-400" />
                                        Ready to start your favorite chat
                                      </p>
                                    </div>
                                    <p className="text-slate-400 text-sm">
                                      This beloved conversation is waiting for your first message
                                    </p>
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                      <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                        {/* <FaMessage className="h-3 w-3" /> */}
                                        {chat.chatMessages.length} messages • Favorited
                                      </p>
                                    </div>
                                    <p className="text-slate-200 text-lg leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                                      {chat.chatMessages[1].messageContent}
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              <div className="ml-8 flex-shrink-0">
                                <button 
                                  onClick={() => handleClick(chat._id)} 
                                  className="group/btn relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
                                >
                                  <div className="absolute -inset-1 bg-slate-600 rounded-2xl blur opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                                  <span className="relative z-10 flex items-center gap-2">
                                    <FaHeart className="h-3 w-3" />
                                    {chat.chatMessages.length <= 1 ? 'Start Favorite' : 'Continue'}
                                  </span>
                                  <FaArrowRight className="relative z-10 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Bottom gradient accent - enhanced for favorites */}
                          <div className="h-1 bg-slate-700 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                {/* Enhanced error state */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-slate-700/20 rounded-full blur opacity-50"></div>
                  <div className="relative p-8 bg-slate-900 rounded-full border border-slate-800">
                    <FaHeartBroken className="h-16 w-16 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Unable to Load Favorites
                </h3>
                <p className="text-slate-400 text-center max-w-md text-lg leading-relaxed mb-8">
                  We're having trouble loading your favorite chats right now. Please check your connection and try again.
                </p>
                
                {/* Retry button */}
                <button 
                  onClick={() => window.location.reload()}
                  className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
                >
                  <div className="absolute -inset-1 bg-slate-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    🔄 Try Again
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced floating particles effect with hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Floating hearts */}
        <div className="absolute top-1/5 left-1/5">
          <FaHeart className="w-3 h-3 text-slate-800 animate-bounce delay-1000" />
        </div>
        <div className="absolute top-3/5 right-1/5">
          <FaHeart className="w-2 h-2 text-slate-800 animate-bounce delay-2000" />
        </div>
        <div className="absolute bottom-1/5 left-3/5">
          <FaHeart className="w-4 h-4 text-slate-800 animate-bounce delay-3000" />
        </div>
      </div>
    </div>
  );
};

export default FavChat;