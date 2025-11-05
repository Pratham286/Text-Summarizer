import React, { useEffect, useState } from 'react'
import { useMyContext } from '../context/MyContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiMaximize2 } from "react-icons/fi";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";

const ChatBar = ({isMenuOpen, setIsMenuOpen}) => {
    const {isLogin, url, user} = useMyContext();
    const [chatDetails, setChatDetails] = useState(null); 
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isLogin) {
            const fetchChat = async () => {
                try {
                    const response = await axios.get(`${url}/chat/getuserchat`, {withCredentials: true});
                    console.log(response.data.chatDetails);
                    setChatDetails(response.data.chatDetails);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchChat();
        }
    }, [isLogin, url])

   const handleClick = (chatId) => {
    navigate('/textsummary', { 
        state: chatId,
        replace: true 
    });
}

    return (
        <div className="h-full bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl max-w-sm backdrop-blur-md">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-slate-900/20 pointer-events-none"></div>
          
          {isMenuOpen ? (
            <div className="h-full flex flex-col relative z-10">
              {/* Enhanced Header */}
              <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
                <div className="flex items-center">
                  <button 
                    onClick={() => {setIsMenuOpen(!isMenuOpen)}} 
                    className="group p-2 hover:bg-slate-700/60 rounded-xl transition-all duration-300 mr-3 shadow-lg hover:shadow-slate-700/25 hover:scale-105"
                  >
                    <RiArrowLeftWideFill className='h-5 w-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300'/>
                  </button>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center mr-3 shadow-lg border border-slate-700">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      💬 My Chats
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Chat List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {chatDetails ? (
                    chatDetails.length > 0 ? (
                      chatDetails.map((chat, i) => (
                        <div key={i} className="group bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 hover:shadow-2xl hover:shadow-slate-700/20 hover:border-slate-600 hover:bg-slate-700/90 transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.02]">
                          <div onClick={() => {handleClick(chat._id)}} className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                {chat.chatMessages.length <= 1 ? (
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 bg-slate-600 rounded-full mr-3 shadow-lg animate-pulse"></div>
                                    <div>
                                      <p className="text-slate-300 text-sm font-medium">✨ Ready to start chatting</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start">
                                    <div className="w-3 h-3 bg-slate-600 rounded-full mr-3 mt-1.5 shadow-lg flex-shrink-0"></div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-slate-200 text-sm line-clamp-2 leading-relaxed font-medium mb-1">
                                        {chat.chatMessages[1].messageContent}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-3">
                                <div className="p-1 rounded-lg bg-slate-700/20">
                                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-slate-700">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <p className="text-slate-300 font-medium">💭 No chats yet</p>
                        <p className="text-slate-400 text-sm mt-1">Start a new conversation to get started</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12">
                      <div className="relative mx-auto mb-4 w-12 h-12">
                        <div className="absolute inset-0 border-4 border-slate-800/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-slate-300 font-medium">🔄 Loading chats...</p>
                      <p className="text-slate-400 text-sm mt-1">Please wait while we fetch your conversations</p>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-900/60 backdrop-blur-sm relative">
              {/* Collapsed state background glow */}
              <div className="absolute inset-0 bg-slate-800/5 rounded-lg"></div>
              
              <button 
                onClick={() => {setIsMenuOpen(!isMenuOpen)}} 
                className="group relative p-4 bg-slate-800/60 hover:bg-slate-700/80 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-slate-700/20 transform hover:scale-110 border border-slate-700 hover:border-slate-600"
              >
                <RiArrowRightWideFill className='h-6 w-6 text-slate-400 group-hover:text-slate-300 transition-colors duration-300' />
                
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
              </button>
            </div>
          )}

          <style jsx>{`
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(51, 65, 85, 0.3);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #475569, #64748b);
              border-radius: 10px;
              box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #64748b, #94a3b8);
            }
          `}</style>
        </div>
    )
}

export default ChatBar