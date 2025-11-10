import React from "react";
import { FaUser, FaArrowRight, FaCheck } from "react-icons/fa";

const SearchedUserProfile = ({
  username,
  fullname,
  handleClick,
  isSelected = false,
}) => {
  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-6 cursor-pointer transition-all duration-200 group ${
        isSelected
          ? "bg-slate-800/50 border-l-slate-600"
          : "bg-transparent hover:bg-slate-800/30"
      } border-l-4 border-l-transparent hover:border-l-slate-700`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 border ${
          isSelected
            ? "bg-slate-700 border-slate-600"
            : "bg-slate-800 border-slate-700 group-hover:bg-slate-700"
        }`}
      >
        <FaUser
          className={`h-5 w-5 transition-colors duration-200 ${
            isSelected
              ? "text-slate-300"
              : "text-slate-400 group-hover:text-slate-300"
          }`}
        />
      </div>
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold mb-1 transition-colors duration-200 ${
            isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
          }`}
        >
          {username}
        </h3>
        <p
          className={`text-sm transition-colors duration-200 ${
            isSelected
              ? "text-slate-300"
              : "text-slate-400 group-hover:text-slate-300"
          }`}
        >
          {fullname}
        </p>
      </div>
      <div
        className={`transition-all duration-200 ${
          isSelected
            ? "text-slate-300"
            : "text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1"
        }`}
      >
        {isSelected ? (
          <FaCheck className="h-5 w-5" />
        ) : (
          <FaArrowRight className="h-5 w-5" />
        )}
      </div>
    </div>
  );
};

export default SearchedUserProfile;
