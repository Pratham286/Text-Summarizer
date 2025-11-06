import React, { useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const dataArr = [
    {
      value: "short",
      label: "Short",
      description: "Quick and concise summary",
      icon: "⚡",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Balanced overview with key details",
      icon: "⚖️",
    },
    {
      value: "long",
      label: "Long",
      description: "Comprehensive detailed summary",
      icon: "📝",
    },
    {
      value: "bullet-points",
      label: "Bullet Points",
      description: "Organized key points",
      icon: "📋",
    },
    {
      value: "simplified",
      label: "Simplified",
      description: "Easy to understand version",
      icon: "🎯",
    },
    {
      value: "key-phrases",
      label: "Key Phrases",
      description: "Important terms and concepts",
      icon: "🔑",
    },
    {
      value: "story-mode",
      label: "Story Mode",
      description: "Narrative-style summary",
      icon: "📖",
    },
  ];

  const [selectTopic, setSelectTopic] = useState(false);
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

          {/* Floating particles around header */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-600/40 rounded-full animate-ping delay-0"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-slate-500/50 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-slate-600/30 rounded-full animate-ping delay-2000"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* Enhanced Main Card with glass morphism */}
        <div className="relative">
          {/* Card glow effect */}
          <div className="absolute -inset-1 bg-slate-800 rounded-3xl blur opacity-20 animate-pulse"></div>

          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 hover:border-slate-700">
            {/* Card header */}
            <div className="flex items-center mb-8">
              <div className="relative w-12 h-12 mr-4">
                <div className="absolute inset-0 bg-slate-700 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-full h-full bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-700">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Smart Text Summarization
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed mb-10 max-w-4xl">
              Get intelligent summaries of your text content with multiple
              formatting options. Choose from short overviews to detailed
              analyses, bullet points to story-mode narratives.
            </p>

            {/* Enhanced CTA button */}
            <button
              onClick={() => setSelectTopic(true)}
              disabled={loading}
              className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xl px-8 py-4 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 border border-slate-700"
            >
              <span className="relative z-10 flex items-center text-md">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-4 h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Summary...
                  </>
                ) : (
                  <>
                    <span className="mr-3">✨</span>
                    Start New Summary
                    <svg
                      className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </span>

              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal with glass morphism */}
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
            {/* Modal glow effect */}
            <div className="absolute -inset-1 bg-slate-700/20 rounded-3xl blur opacity-50"></div>

            {/* Modal Content */}
            <div className="relative bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header - Fixed */}
              <div className="px-8 pt-8 pb-6 border-b border-slate-800/50 bg-slate-900/80 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                      <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700/50">
                        <svg
                          className="w-6 h-6 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                    </div>
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
                    <svg
                      className="w-5 h-5 text-slate-400 hover:text-slate-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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
                        <div className="w-6 h-6 ml-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <svg
                            className="w-full h-full text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
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
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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
