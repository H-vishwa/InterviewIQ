import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { MdHistory } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

const Navbar = () => {
  const [showCreditPopUp, setShowCreditPopUp] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const creditRef = useRef(null);
  const userRef = useRef(null);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (creditRef.current && !creditRef.current.contains(event.target)) {
        setShowCreditPopUp(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopUp(false);
      setShowUser(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center px-5 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl rounded-md shadow-xl px-8 py-4 flex justify-between items-center relative backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-white text-black rounded-lg px-1 py-1 font-semibold">
            <BsRobot size={24} />
          </div>
          <h1 className="text-lg font-semibold hidden md:block">
            InterviewIQ.ai
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-6 relative">
          {/* Credits Popup */}
          <div className="relative" ref={creditRef}>
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  true;
                }
                setShowCreditPopUp(!showCreditPopUp);
                setShowUser(false);
              }}
              className="flex items-center gap-2 hover:text-gray-300 hover:bg-white/5 font-bold rounded-3xl px-3 py-2 text-md cursor-pointer transition-all duration-200">
              <BsCoin size={20} />
              {userData?.credits || 0}
            </button>
            {showCreditPopUp && (
              <div className="absolute flex flex-col justify-center bg-white text-black items-center gap-2 text-center rounded-lg -right-1 mt-3 w-55 border border-[#232A37] p-5 z-50">
                <p>Need more credits to continue Interviews.</p>
                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full px-5 py-2 bg-black/10 hover:bg-black/20 rounded-md font-semibold transition-all duration-200 cursor-pointer">
                  Buy more credits
                </button>
              </div>
            )}
          </div>

          {/* User Popup */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  true;
                }
                setShowUser(!showUser);
                setShowCreditPopUp(false);
              }}
              className="flex items-center gap-2 text-black bg-gray-100 hover:bg-gray-300 font-bold rounded-3xl p-2 md:px-3 md:py-1 text-md cursor-pointer transition-all duration-200">
              {userData ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>
            {showUser && (
              <div className="absolute flex flex-col justify-center bg-white text-black items-center gap-2 rounded-lg -right-1 mt-3 w-50 border border-[#232A37] p-5 z-50">
                <p className="text-xl font-semibold">{userData?.name}</p>
                <button className="w-full flex justify-center items-center gap-3 p-2 hover:text-blue-700 bg-black/10 hover:bg-black/20 rounded-md font-semibold transition-all duration-200 cursor-pointer">
                  <MdHistory size={20} />
                  History
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center gap-3 p-2 hover:text-red-700 bg-black/10 hover:bg-black/20 rounded-md font-semibold transition-all duration-300 cursor-pointer">
                  <HiOutlineLogout size={20} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Navbar;
