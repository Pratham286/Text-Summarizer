import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative bg-gray-950 border-t border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden">
      <div className="relative z-10 w-full px-6 py-4">
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
            <span className="text-slate-300 font-medium">
              BrieflyAI 
            </span>
          </div>
        </div>

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
            </a>
          </div>
          
          <div className="text-right">
            <div className="text-slate-400 font-serif text-sm flex items-center justify-end gap-2">
              <span>© 2025</span>
              <span className="text-slate-300 font-medium">
                BrieflyAI 
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;