import React, { useEffect } from "react";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaComments, FaHeart, FaCog, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoMdStats } from "react-icons/io";

const Profile = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();

  
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 mb-8 relative overflow-hidden">
            {/* Header gradient overlay */}
            <div className="absolute inset-0 bg-slate-900/30 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-700 backdrop-blur-sm">
                    <FaUser className="h-16 w-16 text-slate-400" />
                  </div>
                  <div className="absolute -inset-2 bg-slate-700/30 rounded-full blur-md animate-pulse"></div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    Welcome back, {user?.username || "User"}!
                  </h1>
                  <p className="text-slate-300 text-lg font-medium mb-4">
                    Your AI conversation companion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-800/20 rounded-xl backdrop-blur-sm border border-slate-700">
                    <HiChatBubbleLeftRight className="h-6 w-6 text-slate-400" />
                  </div>
                  <span className="text-3xl font-bold text-white">{userStats.totalChats}</span>
                </div>
                <h3 className="text-slate-300 font-semibold">Total Chats</h3>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-800/20 rounded-xl backdrop-blur-sm border border-slate-700">
                    <FaHeart className="h-6 w-6 text-slate-400" />
                  </div>
                  <span className="text-3xl font-bold text-white">{userStats.favoriteChats}</span>
                </div>
                <h3 className="text-slate-300 font-semibold">Favorite Chats</h3>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-800/20 rounded-xl backdrop-blur-sm border border-slate-700">
                    <FaComments className="h-6 w-6 text-slate-400" />
                  </div>
                  <span className="text-3xl font-bold text-white">{userStats.messagesCount}</span>
                </div>
                <h3 className="text-slate-300 font-semibold">Messages Sent</h3>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-800 p-6 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-800/20 rounded-xl backdrop-blur-sm border border-slate-700">
                    <IoMdStats className="h-6 w-6 text-slate-400" />
                  </div>
                  <span className="text-3xl font-bold text-white">98%</span>
                </div>
                <h3 className="text-slate-300 font-semibold">Satisfaction</h3>
              </div>
            </div>
          </div> */}

          {/* Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* My Chats Card */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-6">
                  <div className="p-4 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                    <HiChatBubbleLeftRight className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">My Chats</h3>
                    <p className="text-slate-300 text-base">View and manage all your conversations</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/mychats")}
                  className="w-full px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-slate-700/25 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700"
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
                  <div className="p-4 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
                    <FaHeart className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Favorite Chats</h3>
                    <p className="text-slate-300 text-base">Access your most important conversations</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/favChats")}
                  className="w-full px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-slate-700/25 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-slate-700"
                >
                  View Favorites
                </button>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-800 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/30 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-800/20 rounded-xl backdrop-blur-sm border border-slate-700">
                  <FaCog className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quick Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700 backdrop-blur-sm">
                  <p className="text-slate-300 font-medium mb-2">Theme Preference</p>
                  <p className="text-white text-sm">Dark Mode</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700 backdrop-blur-sm">
                  <p className="text-slate-300 font-medium mb-2">Language</p>
                  <p className="text-white text-sm">English</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700 backdrop-blur-sm">
                  <p className="text-slate-300 font-medium mb-2">Notifications</p>
                  <p className="text-white text-sm">Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;