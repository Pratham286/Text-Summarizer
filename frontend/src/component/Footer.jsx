import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative bg-slate-950 border-t border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden">
      <div className="relative z-10 w-full px-6 py-4">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center gap-4 text-center">
          <div className="text-slate-300 font-serif text-sm font-medium">
            ✨ Designed and Developed by Pratham
          </div>
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/pratham-chaurasiya-a3a96a251/"
              className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 border border-slate-700"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href="https://github.com/Pratham286"
              className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 border border-slate-700"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
          <div className="text-slate-400 font-serif text-sm flex items-center gap-2">
            <span>© 2025</span>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 font-medium">
              Text Summarizer
            </span>
          </div>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:grid grid-cols-3 items-center py-2">
          <div className="text-slate-300 font-serif text-sm">
            <span className="font-medium">
              ✨ Designed and Developed by Pratham
            </span>
          </div>
          
          <div className="flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/pratham-chaurasiya-a3a96a251/"
              className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 relative overflow-hidden border border-slate-700"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="h-7 w-7 text-slate-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            </a>
            <a 
              href="https://github.com/Pratham286"
              className="group p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 relative overflow-hidden border border-slate-700"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-7 w-7 text-slate-400 group-hover:text-white transition-colors duration-300 relative z-10" />
              <div className="absolute inset-0 bg-slate-600/0 group-hover:bg-slate-600/20 transition-all duration-300"></div>
            </a>
          </div>
          
          <div className="text-right">
            <div className="text-slate-400 font-serif text-sm flex items-center justify-end gap-2">
              <span>© 2025</span>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300 font-medium">
                Text Summarizer
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800"></div>
    </div>
  );
};

export default Footer;