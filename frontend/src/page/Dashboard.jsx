import React, { useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { dataArr } from "../Data/TextSummaryData";
import CreateGroupChat from "./CreateGroupChat";

const Dashboard = () => {

  // const dataArr = dataArr;
  const [selectTopic, setSelectTopic] = useState(false);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const { user, isLogin, url } = useMyContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(isLogin)
  useEffect(() => {
    const deleteEmptyChat = async () => {
      try {
        const response = await axios.delete(`${url}/chat/deleteEmptyChats`, {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log("Error in deleting empty chats, Error: ", error);
      }
    };
    deleteEmptyChat();
  }, []);
  const handleCreateChatSummary = async (txt) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/chat/summary/create`,
        { summaryType: txt },
        {
          withCredentials: true,
        }
      );
      const chatId = response.data.chatDetails._id;
      navigate("/textsummary", { state: chatId });
    } catch (error) {
      console.log("Error in creating chat, Error: ", error);
    } finally {
      setLoading(false);
      setSelectTopic(false);
    }
  };

  if (showGroupChat) {
    return <CreateGroupChat onBack={() => setShowGroupChat(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 z-0">
      {/* Header Section */}
      <div className="relative pt-20 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Enhanced title with gradient text */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Text Summarizer
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Transform your lengthy texts into clear, concise summaries with
            AI-powered precision
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Smart Text Summarization Card */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 hover:border-slate-700">
            {/* Card header */}
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Smart Text Summarization
              </h2>
            </div>

            <button
              onClick={() => setSelectTopic(true)}
              disabled={loading}
              className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xl px-8 py-4 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 border border-slate-700"
            >
              <span className="relative z-10 flex items-center text-md">
                {loading ? (
                  <>
                    Creating Summary...
                  </>
                ) : (
                  <>
                    <span className="mr-3">✨</span>
                    Start New Summary
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Group Chat Card */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 hover:border-slate-700">
            {/* Card header */}
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Collaborative Chat
              </h2>
            </div>

            <button
              onClick={() => setShowGroupChat(true)}
              className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xl px-8 py-4 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-slate-700"
            >
              <span className="relative z-10 flex items-center text-md">
                <span className="mr-3">👥</span>
                Create Group Chat
              </span>
            </button>
          </div>

        </div>
      </div>

      {selectTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={() => !loading && setSelectTopic(false)}
          >
            {" "}
          </div>

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col z-[101]">

            {/* Modal Content */}
            <div className="relative bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header - Fixed */}
              <div className="px-8 pt-8 pb-6 border-b border-slate-800/50 bg-slate-900/80 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">
                        Choose Summary Type
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Select the format that best suits your needs
                      </p>
                    </div>
                  </div>

                  {/* Close button in header */}
                  <button
                    onClick={() => setSelectTopic(false)}
                    disabled={loading}
                    className="ml-4 p-2 rounded-lg hover:bg-slate-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    aria-label="Close modal"
                  >
                  </button>
                </div>
              </div>

              {/* Scrollable Options */}
              <div className="px-8 py-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 gap-2">
                  {dataArr.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleCreateChatSummary(item.value)}
                      disabled={loading}
                      className="group relative w-full px-4 py-2 text-left bg-slate-800/40 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-xl mr-2 flex-shrink-0">
                            {item.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-md font-semibold text-white group-hover:text-slate-100">
                              {item.label}
                            </span>
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 ml-2">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="px-6 py-4 border-t border-slate-800/50 bg-slate-900/80 flex-shrink-0">
                <button
                  onClick={() => setSelectTopic(false)}
                  disabled={loading}
                  className="w-full px-6 py-3 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;