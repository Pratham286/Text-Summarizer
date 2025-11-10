import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "../context/MyContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserFriends,
  FaUserPlus,
  FaUserTimes,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function UserProfile() {
  const { url } = useMyContext();
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otherUser, setOtherUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [friendReqSentByMe, setFriendReqSentByMe] = useState(false);
  const [friendReqSentByOther, setFriendReqSentByOther] = useState(false);

  const refresh = () => setTrigger((t) => !t);

  useEffect(() => {
    if (!userId) {
      setOtherUser(null);
      setIsFriend(false);
      setFriendReqSentByMe(false);
      setFriendReqSentByOther(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let mounted = true;

    const fetchProfileAndRelation = async () => {
      try {
        setLoading(true);
        const userReq = axios.post(
          `${url}/auth/getuser`,
          { userId },
          { withCredentials: true, signal: controller.signal }
        );

        const relationReq = axios.get(`${url}/friends/relation/${userId}`, {
          withCredentials: true,
          signal: controller.signal,
        });

        const [userRes, relationRes] = await Promise.allSettled([
          userReq,
          relationReq,
        ]);

        if (!mounted) return;

        if (userRes.status === "fulfilled") {
          const userDetails = userRes.value.data?.userDetails || null;
          setOtherUser(userDetails);
          const friendship = userRes.value.data?.friendship;
          if (friendship) {
            setIsFriend(Boolean(friendship.isFriend));
            setFriendReqSentByMe(Boolean(friendship.sentByMe));
            setFriendReqSentByOther(Boolean(friendship.sentByOther));
          }
        } else {
          console.error("getUser failed:", userRes.reason);
        }
        if (relationRes.status === "fulfilled") {
          const status = relationRes.value.data?.status || {};
          setIsFriend(Boolean(status.areFriends));
          setFriendReqSentByMe(Boolean(status.requestSent));
          setFriendReqSentByOther(Boolean(status.requestReceived));
        } else {
          console.error("relation fetch failed:", relationRes.reason);
        }
      } catch (err) {
        if (!axios.isCancel?.(err)) console.error("fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfileAndRelation();

    return () => {
      mounted = false;
      try {
        controller.abort();
      } catch (e) {}
    };
  }, [userId, trigger, url]);

  const handleSendFriendReq = async () => {
    if (!userId || loading) return;
    setLoading(true);
    const prevSentByMe = friendReqSentByMe;
    setFriendReqSentByMe(true); 

    try {
      await axios.post(
        `${url}/friends/sendfriendreq`,
        { otherUser: userId },
        { withCredentials: true }
      );
      refresh();
    } catch (err) {
      console.error("send friend req err:", err);
      setFriendReqSentByMe(prevSentByMe); 
    } finally {
      setLoading(false);
    }
  };

  const handleRetractFriendReq = async () => {
    if (!userId || loading) return;
    setLoading(true);
    const prevSent = friendReqSentByMe;
    setFriendReqSentByMe(false); 

    try {
      await axios.post(
        `${url}/friends/retractfriendreq`,
        { otherUser: userId },
        { withCredentials: true }
      );
      refresh();
    } catch (err) {
      console.error("retract friend req err:", err);
      setFriendReqSentByMe(prevSent); 
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async () => {
    if (!userId || loading) return;
    setLoading(true);
    const prevIsFriend = isFriend;
    setIsFriend(false);

    try {
      await axios.post(
        `${url}/friends/removefriend`,
        { otherUser: userId },
        { withCredentials: true }
      );
      refresh();
    } catch (err) {
      console.error("remove friend err:", err);
      setIsFriend(prevIsFriend);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptFriendReq = async () => {
    if (!userId || loading) return;
    setLoading(true);
    const prevIsFriend = isFriend;
    const prevReqByOther = friendReqSentByOther;
    setIsFriend(true);
    setFriendReqSentByOther(false);

    try {
      await axios.post(
        `${url}/friends/acceptfriendreq`,
        { otherUser: userId },
        { withCredentials: true }
      );
      refresh();
    } catch (err) {
      console.error("accept friend req err:", err);
      setIsFriend(prevIsFriend);
      setFriendReqSentByOther(prevReqByOther);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectFriendReq = async () => {
    if (!userId || loading) return;
    setLoading(true);
    const prevReqByOther = friendReqSentByOther;
    setFriendReqSentByOther(false);

    try {
      await axios.post(
        `${url}/friends/declinefriendreq`,
        { otherUser: userId },
        { withCredentials: true }
      );
      refresh();
    } catch (err) {
      console.error("reject friend req err:", err);
      setFriendReqSentByOther(prevReqByOther);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <div className="relative z-10">
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              User Profile
            </h1>
          </div>
        </section>
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">

            <div className="bg-slate-900 rounded-lg p-8 border border-slate-800 mb-6">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-700">
                    <FaUser className="h-12 w-12 text-slate-400" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {otherUser?.username || "User"}
                  </h2>
                  <p className="text-slate-400 mb-4">
                    {otherUser?.firstname && otherUser?.lastname
                      ? `${otherUser.firstname} ${otherUser.lastname}`
                      : ""}
                  </p>
                  <div className="mt-4">
                    {loading ? (
                      <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <span className="text-slate-400 text-sm">Loading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                        {isFriend ? (
                          <>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                              <FaUserFriends className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-300 text-sm font-medium">
                                Friends
                              </span>
                            </div>
                            <button
                              onClick={handleRemoveFriend}
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium border border-slate-700 transition-all duration-200"
                            >
                              <FaUserTimes className="h-4 w-4" />
                              Remove Friend
                            </button>
                          </>
                        ) : friendReqSentByMe ? (
                          <>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                              <span className="text-slate-300 text-sm font-medium">
                                Request Sent
                              </span>
                            </div>
                            <button
                              onClick={handleRetractFriendReq}
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium border border-slate-700 transition-all duration-200"
                            >
                              <FaTimes className="h-4 w-4" />
                              Retract Request
                            </button>
                          </>
                        ) : friendReqSentByOther ? (
                          <>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                              <span className="text-slate-300 text-sm font-medium">
                                Wants to connect
                              </span>
                            </div>
                            <button
                              onClick={handleAcceptFriendReq}
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium border border-slate-700 transition-all duration-200"
                            >
                              <FaCheck className="h-4 w-4" />
                              Accept
                            </button>
                            <button
                              onClick={handleRejectFriendReq}
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium border border-slate-700 transition-all duration-200"
                            >
                              <FaTimes className="h-4 w-4" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                              <span className="text-slate-400 text-sm font-medium">
                                Not Connected
                              </span>
                            </div>
                            <button
                              onClick={handleSendFriendReq}
                              disabled={loading}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium border border-slate-700 transition-all duration-200"
                            >
                              <FaUserPlus className="h-4 w-4" />
                              Send Friend Request
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
