import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaArrowRight, FaFrown } from "react-icons/fa";
import SearchedUserProfile from "../component/SearchedUserProfile";

function SearchPage() {
  const [word, setWord] = useState("");
  const { url, user } = useMyContext();
  // console.log(user);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchUsers = async () => {
        if (!word.trim()) {
          setUserList([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        try {
          const response = await axios.post(
            `${url}/friends/searchuser`,
            { query: word },
            { withCredentials: true }
          );
          // console.log(response.data);
          setUserList(response.data.users);
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }, 500); // Delay for 500ms

    return () => clearTimeout(delayDebounce);
  }, [word, url]);

  const handleProfile = (u) => {
    const userId = u._id;

    if (user.id === userId) {
      navigate("/profile");
    } else {
      navigate("/userprofile", {
        state: {
          userId: userId,
        },
      });
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative z-10">
        <section className="pt-20 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Discover People
            </h1>

            <p className="text-md text-slate-400 mb-5 max-w-3xl mx-auto">
              Find new friends and connections
            </p>
          </div>
        </section>
        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-6 w-6 text-slate-500" />
                </div>
                <input
                  name="word"
                  id="word"
                  value={word}
                  onChange={(e) => {
                    setWord(e.target.value);
                  }}
                  placeholder="Search for users by name or username..."
                  className="w-full pl-12 pr-4 py-4 text-md bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 rounded-lg outline-none focus:border-slate-600 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-400">Searching for users...</p>
                </div>
              ) : word.trim() === "" ? (
                <></>
              ) : userList.length > 0 ? (
                <div>
                  <div className="p-6 border-b border-slate-800">
                    <h3 className="text-md font-semibold text-white">
                      Search Results ({userList.length})
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-800">
                    {userList.map((u, i) => (
                      <div
                        key={i}
                        className="hover:bg-slate-800 transition-colors duration-200"
                      >
                        <SearchedUserProfile
                          username={u.username}
                          fullname={u.fName + " " + u.lName}
                          handleClick={() => handleProfile(u)}
                        />
                      </div>
                    ))}
                  </div>
                  {userList.length === 5 && (
                    <div className="p-6 border-t border-slate-800">
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            navigate("/searchResult", {
                              state: {
                                word: word,
                              },
                            });
                          }}
                          type="button"
                          className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium shadow-lg transition-all duration-200 border border-slate-700"
                        >
                          Show More Results
                          <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-6">
                    <FaFrown className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No Results Found!
                  </h3>
                  <button
                    onClick={() => setWord("")}
                    className="px-6 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200 hover:bg-slate-900"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default SearchPage;
