import React, { useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dataArr = [
    { value: "short", label: "Short", description: "Quick and concise summary", icon: "⚡" },
    { value: "medium", label: "Medium", description: "Balanced overview with key details", icon: "⚖️" },
    { value: "long", label: "Long", description: "Comprehensive detailed summary", icon: "📝" },
    { value: "bullet-points", label: "Bullet Points", description: "Organized key points", icon: "📋" },
    { value: "simplified", label: "Simplified", description: "Easy to understand version", icon: "🎯" },
    { value: "key-phrases", label: "Key Phrases", description: "Important terms and concepts", icon: "🔑" },
    { value: "story-mode", label: "Story Mode", description: "Narrative-style summary", icon: "📖" },
  ];

  const [selectTopic, setSelectTopic] = useState(false);
  const { user, isLogin, url } = useMyContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateChatSummary = async (txt) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/chat/summary/create`, {summaryType : txt},  {
        withCredentials: true,
      });
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
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* Background overlay for modal */}
      {selectTopic && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40"></div>
      )}

      {/* Header Section */}
      <div className="relative pt-20 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Enhanced icon container */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-slate-700 rounded-3xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-700">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* Enhanced title with gradient text */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Text Summarizer
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Transform your lengthy texts into clear, concise summaries with AI-powered precision
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
              <div className="relative w-16 h-16 mr-6">
                <div className="absolute inset-0 bg-slate-700 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-full h-full bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-700">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Smart Text Summarization
              </h2>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-4xl">
              Get intelligent summaries of your text content with multiple formatting options. 
              Choose from short overviews to detailed analyses, bullet points to story-mode narratives.
            </p>

            {/* Enhanced CTA button */}
            <button
              onClick={() => setSelectTopic(true)}
              disabled={loading}
              className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-slate-700/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 border border-slate-700"
            >
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-slate-700 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Summary...
                  </>
                ) : (
                  <>
                    <span className="mr-3">✨</span>
                    Start New Summary
                    <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"></div>
          
          <div className="relative transform transition-all max-h-[90vh] overflow-hidden">
            {/* Modal glow effect */}
            <div className="absolute -inset-2 bg-slate-800 rounded-3xl blur opacity-20 animate-pulse"></div>
            
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full mx-auto">
              
              {/* Enhanced Header */}
              <div className="px-10 pt-10 pb-8 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-slate-700 rounded-2xl blur opacity-50 animate-pulse"></div>
                    <div className="relative w-full h-full bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-700">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white text-center mb-3">
                  Choose Summary Type
                </h2>
                <p className="text-slate-300 text-center text-lg">
                  Select the format that best suits your needs
                </p>
              </div>

              {/* Enhanced Options */}
              <div className="px-10 py-8 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  {dataArr.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleCreateChatSummary(item.value)}
                      disabled={loading}
                      className="group relative w-full px-8 py-6 text-left bg-slate-800/50 hover:bg-slate-700/60 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-700/20 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                    >
                      {/* Button glow effect */}
                      <div className="absolute -inset-1 bg-slate-700/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-4 filter drop-shadow-lg">{item.icon}</span>
                          <div>
                            <span className="text-xl font-bold text-white group-hover:text-slate-200 block mb-2 transition-colors duration-300">
                              {item.label}
                            </span>
                            <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                              {item.description}
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                          <svg
                            className="w-8 h-8 text-slate-400"
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

              {/* Enhanced Footer */}
              <div className="px-10 pb-10 border-t border-slate-800 bg-slate-900/30">
                <button
                  onClick={() => setSelectTopic(false)}
                  disabled={loading}
                  className="group w-full px-8 py-5 mt-6 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-600 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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