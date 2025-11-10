import React from "react";
import { useNavigate } from "react-router-dom";

function ChatRouter() {
  const navigate = useNavigate();

  const chatOptions = [
    {
      path: "/mychats",
      label: "Personal Chats",
      description: "View your one-on-one conversations",
      color: "slate",
      emoji: "💬",
    },
    {
      path: "/mygroupchats",
      label: "Group Chats",
      description: "Manage your group conversations",
      color: "slate",
      emoji: "👥",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative pt-20 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            My Chats
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chatOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate(option.path)}
              className="group relative overflow-hidden"
            >
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 hover:border-slate-700 transform hover:scale-105 hover:-translate-y-2">
                <div className="text-left mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{option.emoji}</span>
                    <h2 className="text-2xl font-bold text-white group-hover:text-slate-100 transition-colors duration-300">
                      {option.label}
                    </h2>
                  </div>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                    <span className="text-sm font-semibold mr-2">Open</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatRouter;
