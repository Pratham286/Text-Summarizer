import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import ProtectedRoute from "./authenticate/ProtectedRoute";
import TextSummary from "./page/TextSummary";
import Profile from "./page/Profile";
import MyChats from "./page/MyChats";
import FavChat from "./page/FavChat";
import ChatBar from "./component/ChatBar";
import { useState, useEffect } from "react";
import { useMyContext } from "./context/MyContext";
import GroupChat from "./page/GroupChat";
import ChatRouter from "./page/ChatRouter";
import SearchPage from "./page/SearchPage";
import UserProfile from "./page/UserProfile";

function App() {


  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-30">
        <Header />
      </div>

        <main className="flex-1 overflow-auto relative">
          <div className="relative z-40 min-h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/textSummary" element={<TextSummary />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mychats" element={<MyChats />} />
                <Route path="/favchats" element={<FavChat />} />
                <Route path="/mygroupchats" element = {<GroupChat />}/>
                <Route path="/chat" element={<ChatRouter />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/userprofile" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>

        </main>
    
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}

export default App;