import React, { useEffect, useState } from "react";
import { dataArr } from "../Data/TextSummaryData";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateGroupChat = ({ onBack }) => {
    const { url, user } = useMyContext();
  const [friend, setFriend] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([user.id]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectTopic, setSelectTopic] = useState(false);
  const navigate = useNavigate();
//   console.log(user.id)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${url}/friends/friendlist`, {
          withCredentials: true,
        });
        console.log(response.data);
        setFriend(response.data.friends);
      } catch (error) {
        console.log("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [url]);

  const handleFriendSelect = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const handleCreateGroup = () => {
    if (selectedFriends.length < 1) {
      alert("Please select at least 1 friend to create a group");
      return;
    }
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    setSelectTopic(true);
  };

  const confirmCreateGroup = async (summaryType) => {
    try {
        setLoading(true);
        const response = await axios.post(`${url}/chat/creategroupchat`, {summaryType, usersList: selectedFriends, groupName}, {
            withCredentials: true,
        });
        const chatId = response.data.chatDetails._id;
        navigate("/textsummary", { state: chatId });
        console.log("Group chat created successfully:", response.data);
    } catch (error) {
        console.log("Error in creating group chat, Error: ", error);
    }
    finally{
        setLoading(false);
        setSelectTopic(false);
        if(onBack) onBack();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 z-0">
      {/* Header Section */}
      <div className="relative pt-20 pb-16 z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="absolute left-6 top-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </button>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Create Group Chat
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Select friends to create a new group conversation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20 relative z-10">
        {/* Main Card */}
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">
          
          {/* Group Name Input */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>

          {/* Selected Friends Count */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Select Friends
              </h2>
              <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-lg">
                {selectedFriends.length} selected
              </span>
            </div>
          </div>

          {/* Friends List */}
          <div className="space-y-2 mb-8 max-h-96 overflow-y-auto">
            {friend.map((friendItem) => {
              const isSelected = selectedFriends.includes(friendItem._id);
              return (
                <button
                  key={friendItem._id}
                  onClick={() => handleFriendSelect(friendItem._id)}
                  className={`w-full px-4 py-3 text-left rounded-xl transition-all border ${
                    isSelected
                      ? "bg-slate-700/50 border-slate-600 shadow-md"
                      : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                          isSelected
                            ? "bg-slate-600 text-white"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {friendItem.fName?.substring(0, 1).toUpperCase()}
                      </div>

                      {/* Friend Name */}
                      <span
                        className={`ml-3 font-medium ${
                          isSelected ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {friendItem.username}
                      </span>
                    </div>

                    {/* Checkbox Indicator */}
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-slate-600 border-slate-500"
                          : "bg-slate-800 border-slate-600"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Create Group Button */}
          <button
            onClick={handleCreateGroup}
            disabled={selectedFriends.length < 1 || !groupName.trim()}
            className="group relative overflow-hidden w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-slate-700"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-xl">👥</span>
              <span>Create Group Chat</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>

          {/* Helper Text */}
          {selectedFriends.length === 0 && (
            <p className="text-center text-sm text-slate-400 mt-3">
              Select at least 1 friend to create a group
            </p>
          )}
        </div>
      </div>

      {/* Summary Type Selection Modal */}
      {selectTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={() => !loading && setSelectTopic(false)}
          >
            {" "}
          </div>

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col z-[101]">

            {/* Modal Content */}
            <div className="relative bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header - Fixed */}
              <div className="px-8 pt-8 pb-6 border-b border-slate-800/50 bg-slate-900/80 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">
                        Choose Summary Type
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Select the format that best suits your group
                      </p>
                    </div>
                  </div>

                  {/* Close button in header */}
                  <button
                    onClick={() => setSelectTopic(false)}
                    disabled={loading}
                    className="ml-4 p-2 rounded-lg hover:bg-slate-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 text-slate-400 hover:text-white"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Options */}
              <div className="px-8 py-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 gap-2">
                  {dataArr.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => confirmCreateGroup(item.value)}
                      disabled={loading}
                      className="group relative w-full px-4 py-2 text-left bg-slate-800/40 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-xl mr-2 flex-shrink-0">
                            {item.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-md font-semibold text-white group-hover:text-slate-100">
                              {item.label}
                            </span>
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 ml-2">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer - Fixed */}
              <div className="px-6 py-4 border-t border-slate-800/50 bg-slate-900/80 flex-shrink-0">
                <button
                  onClick={() => setSelectTopic(false)}
                  disabled={loading}
                  className="w-full px-6 py-3 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupChat;