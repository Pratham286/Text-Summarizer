import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { MdOutlineSmartToy } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useMyContext } from "../context/MyContext";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineLogout, MdLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp, IoChatbox } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);
  const { isLogin, setIsLogin, url } = useMyContext();

  const handleOpen = () => {
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/auth/logout`,{} ,{
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
    <div className="relative bg-gray-950 sticky top-0 z-50 h-16 shadow-lg backdrop-blur-md border-b border-slate-800">
      <div className="relative w-full flex justify-between px-6 items-center mx-auto h-full ">
        <div
          onClick={handleHomeClick}
          className="flex font-bold text-xl px-3 py-2 font-serif text-white hover:text-slate-300 transition-all duration-200 cursor-pointer transform hover:scale-105"
        >
          <MdOutlineSmartToy className="h-6 w-6 mr-2" />
          BrieflyAI
        </div>

        <div className="hidden md:block text-sm">
          {isLogin ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/search")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <IoSearchSharp className="h-4 w-4" />
                <span>Search</span>
              </button>

              <button
                onClick={() => navigate("/chat")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <IoChatbox className="h-4 w-4"/>
                Chats
              </button>

              <button
                onClick={() => navigate("/mygroupchats")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <MdOutlineGroup className="h-4 w-4"/>
                Group Chats
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <FaUser className="h-4 w-4"/>
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <MdOutlineLogout className="h-4 w-4"/>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <IoMdPersonAdd className="h-4 w-4"/>
                Sign up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                <MdLogin className="h-4 w-4"/>
                Sign in
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
                    navigate("/search");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <IoSearchSharp className="h-4 w-4" />
                  <span>Search</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/chat");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <IoChatbox className="h-4 w-4"/>
                  Chats
                </button>
                <button
                  onClick={() => {
                    navigate("/mygroupchats");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <MdOutlineGroup className="h-4 w-4"/>
                  Group Chats
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <FaUser className="h-4 w-4"/>
                  My Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <MdOutlineLogout className="h-4 w-4"/>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 text-left border border-slate-700"
                >
                  <IoMdPersonAdd className="h-4 w-4"/>
                  Sign up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 border border-slate-700 text-left"
                >
                  <MdLogin className="h-4 w-4"/>
                  Sign in
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