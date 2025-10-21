import React from 'react';
import { FaRocket, FaBrain, FaComments, FaHeart, FaStar, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { HiChatBubbleLeftRight, HiSparkles } from 'react-icons/hi2';
import { IoMdStats } from 'react-icons/io';

const Home = () => {
  // Mock user state - set to null to see non-logged in view, or add object to see logged in view
  const user = null; // Change to { username: "John" } to test logged in state
  const navigate = (path) => console.log(`Navigate to: ${path}`);

  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Conversations",
      description: "Experience intelligent conversations with advanced AI technology that understands context and provides meaningful responses."
    },
    {
      icon: FaComments,
      title: "Smart Text Summarization",
      description: "Transform lengthy content into concise, actionable insights with our advanced summarization capabilities."
    },
    {
      icon: FaHeart,
      title: "Favorite Management",
      description: "Save and organize your most important conversations for easy access and future reference."
    },
    {
      icon: IoMdStats,
      title: "Conversation Analytics",
      description: "Track your interaction patterns and gain insights into your communication preferences."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Users", icon: FaStar },
    { number: "50K+", label: "Conversations", icon: FaComments },
    { number: "99.9%", label: "Uptime", icon: FaCheckCircle },
    { number: "24/7", label: "Support", icon: FaHeart }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 mb-8">
                <HiSparkles className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm font-medium">Powered by Advanced AI</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Welcome to{' '}
                <span className="text-slate-400">
                  AI Chat
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
                Experience the future of conversation with our intelligent AI assistant. 
                Get instant responses, summarize content, and manage your chats like never before.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {user ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 border border-slate-700"
                  >
                    Go to Dashboard
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/signup')}
                      className="group px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center gap-2 border border-slate-700"
                    >
                      Get Started
                      <FaRocket className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => navigate('/login')}
                      className="px-8 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200 hover:bg-slate-900"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Discover the capabilities that make our AI chat platform the perfect companion for all your conversational needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <feature.icon className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        {!user && (
          <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-slate-900 rounded-lg p-10 border border-slate-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-6">
                  <HiChatBubbleLeftRight className="h-8 w-8 text-slate-400" />
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Ready to Start Chatting?
                </h2>
                
                <p className="text-lg text-slate-400 mb-8">
                  Join thousands of users who are already experiencing the future of AI conversation. 
                  Sign up now and start your journey today.
                </p>
                
                <button
                  onClick={() => navigate('/signup')}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 border border-slate-700"
                >
                  Get Started Now
                  <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Welcome Back Section for Logged In Users */}
        {user && (
          <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-slate-900 rounded-lg p-10 border border-slate-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-6">
                  <FaHeart className="h-8 w-8 text-slate-400" />
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Welcome Back, {user.username}!
                </h2>
                
                <p className="text-lg text-slate-400 mb-8">
                  Ready to continue your AI conversations? Access your dashboard to view your chats, 
                  favorites, and start new intelligent discussions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 border border-slate-700"
                  >
                    Go to Dashboard
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => navigate('/profile')}
                    className="inline-flex items-center gap-2 px-8 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200 hover:bg-slate-900"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;