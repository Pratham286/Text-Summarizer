import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useMyContext } from "../context/MyContext";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const { isLogin, setIsLogin, url } = useMyContext();
  // console.log(isLogin)

  const handleOpen = () => {
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${url}/auth/logout`, {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 200) {
        setIsLogin(false);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Logout, Error", error);
    }
  };
  const handleHomeClick = () => {
    if (isLogin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="relative bg-slate-950 sticky top-0 z-50 h-16 shadow-lg backdrop-blur-md border-b border-slate-800">
      <div className="relative w-full flex justify-between px-6 items-center mx-auto h-full ">
        <div
          onClick={handleHomeClick}
          className="font-bold text-xl px-3 py-2 font-serif text-white hover:text-slate-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          ✨ BrieflyAI
        </div>

        <div className="hidden md:block text-sm">
          {isLogin ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/search")}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                🔍 Search
              </button>
              <button
                onClick={() => navigate("/chat")}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                💬 Chats
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                👤 My Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                ✨ Sign up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-3 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-slate-900"
              >
                🔑 Sign in
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden pr-3 text-sm">
          <div className="relative">
            {isMenuOpen ? (
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-slate-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <RxCross2 className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleOpen}
                className="p-2 rounded-lg bg-slate-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <VscThreeBars className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* For Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-4 mt-2 w-48 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 backdrop-blur-md animate-in slide-in-from-top-2 duration-300">
          <div className="p-4 flex flex-col gap-3 text-sm">
            {isLogin ? (
              <>
                <button
                  onClick={() => {
                    navigate("/mygroupchats");
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  💬 Group Chats
                </button>
                <button
                  onClick={() => {
                    navigate("/chat");
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  💬 Chats
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  👤 My Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  ✨ Sign up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left hover:bg-slate-900"
                >
                  🔑 Sign in
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
