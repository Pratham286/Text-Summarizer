import React from "react";
import {
  FaRocket,
  FaBrain,
  FaComments,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaUserFriends,
} from "react-icons/fa";
import { HiChatBubbleLeftRight, HiSparkles } from "react-icons/hi2";
import { IoMdStats } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { FiLogIn } from "react-icons/fi";
// import { features } from '../Data/Featuredata';

const Home = () => {
  const { user, url } = useMyContext();
  const navigate = useNavigate();

  const features = [
    {
      icon: FaBrain,
      title: "Multi-Mode Summarization",
      description:
        "Summarize any text in seven unique ways — short, medium, long, bullet-point, simplified, key-phrases, or story-mode — tailored to your needs.",
    },
    {
      icon: FaComments,
      title: "Interactive AI Chat",
      description:
        "Engage in dynamic conversations with AI to refine, expand, or simplify your text summaries effortlessly.",
    },
    {
      icon: FaHeart,
      title: "Chat Management",
      description:
        "Easily add important chats to favorites, revisit them anytime, or delete unwanted ones with a single click.",
    },
    {
      icon: IoMdStats,
      title: "Smart Conversation Insights",
      description:
        "Stay organized with automatic tracking of your summaries and chat interactions, helping you monitor your workflow.",
    },
    {
      icon: FaUserFriends,
      title: "Group Chat with AI",
      description:
        "Create shared chats with multiple users where everyone can collaborate and interact with the AI simultaneously.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative z-10">
        <section className="pt-10 pb-10 px-4">
          <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 mb-8">
                <HiSparkles className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm font-medium">
                  Powered by Cohere AI
                </span>
              </div>
              <div className="border border-slate-600 py-4 rounded-lg">

              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Welcome to <span className="text-sky-500">BrieflyAI</span>
              </h1>

              <p className="text-md lg:text-md text-slate-200 mb-10 max-w-3xl mx-auto">
                Experience the future of conversation with our intelligent AI
                assistant. Get instant responses, summarize content, and manage
                your chats like never before.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-md">
                {user ? (
                  <button
                  onClick={() => navigate("/")}
                  className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 border border-slate-700"
                  >
                    Go to Dashboard
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/signup")}
                      className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 border border-slate-700"
                      >
                      Get Started
                      <FaRocket className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => navigate("/login")}
                      className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 border border-slate-700"
                    >
                      Sign In
                      <FiLogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>
                </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto border border-slate-700 py-4 rounded-lg px-4 py-2">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-md text-slate-200 max-w-2xl mx-auto">
                Discover the capabilities that make our AI chat platform the
                perfect companion for all your conversational needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <feature.icon className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Home;
