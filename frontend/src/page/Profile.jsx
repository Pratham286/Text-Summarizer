import React, { useEffect } from "react";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaComments, FaHeart, FaCog, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const Profile = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();

  
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 mb-8 relative overflow-hidden">
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-700 backdrop-blur-sm">
                    <FaUser className="h-8 w-8 text-slate-400" />
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Welcome back, {user?.username || "User"}!
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* My Chats Card */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className="p-3 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                    <HiChatBubbleLeftRight className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">My Chats</h3>
                    <p className="text-slate-300 text-base text-sm">View and manage all your conversations</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/mychats")}
                  className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-slate-700/25 transition-all duration-300 transform backdrop-blur-sm border border-slate-700"
                >
                  View All Chats
                </button>
              </div>
            </div>

            {/* Favorite Chats Card */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className="p-3 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                    <FaHeart className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Favorite Chats</h3>
                    <p className="text-slate-300 text-base text-sm">Access your most important conversations</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/favChats")}
                  className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-slate-700/25 transition-all duration-300 transform  backdrop-blur-sm border border-slate-700"
                >
                  View Favorites
                </button>
              </div>
            </div>
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-6">
                <div className="p-3 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                  <HiChatBubbleLeftRight className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">My Group Chats</h3>
                  <p className="text-slate-300 text-base text-sm">View and manage all your group chats</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/mygroupchats")}
                className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-slate-700/25 transition-all duration-300 transform backdrop-blur-sm border border-slate-700"
              >
                View Group Chats
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;