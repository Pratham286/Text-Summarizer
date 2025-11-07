import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChatRouter() {
  const navigate = useNavigate();
  
  const chatOptions = [
    {
      path: '/mychats',
      label: 'Personal Chats',
      description: 'View your one-on-one conversations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'slate',
      emoji: '💬'
    },
    {
      path: '/mygroupchats',
      label: 'Group Chats',
      description: 'Manage your group conversations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'slate',
      emoji: '👥'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Header Section */}
      <div className="relative pt-20 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
            My Chats
          </h1>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chatOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => navigate(option.path)}
              className="group relative overflow-hidden"
            >
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-slate-800 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-slate-800/20 transition-all duration-500 hover:border-slate-700 transform hover:scale-105 hover:-translate-y-2">
            

                {/* Content */}
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

                {/* Arrow indicator */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                    <span className="text-sm font-semibold mr-2">Open</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
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