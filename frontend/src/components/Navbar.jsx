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
import logo from "../assets/interview_iq_logo.png";

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

  const handleNavClick = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full border-b border-white/10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto px-8 md:px-16 py-5 flex justify-between items-center relative"
      >
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="InterviewIQ Logo" className="w-8 h-8 rounded-lg object-contain border border-neutral-800 bg-neutral-950" />
            <h1 className="text-lg font-bold tracking-[0.12em] text-white uppercase font-sans">
              InterviewIQ
            </h1>
          </div>

          {/* Navigation Links matching the reference style */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] text-white/50 font-sans">
            <span 
              onClick={() => handleNavClick("features")} 
              className="hover:text-white cursor-pointer transition-colors uppercase"
            >
              About
            </span>
            <span 
              onClick={() => handleNavClick("footer")} 
              className="hover:text-white cursor-pointer transition-colors uppercase"
            >
              Contact
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Controls styled as thin pill outlines */}
        <div className="flex items-center gap-4 relative">
          {/* Credits Popup */}
          <div className="relative" ref={creditRef}>
            <button
              onClick={() => {
                if (!userData) { setShowAuth(true); return; }
                setShowCreditPopUp(!showCreditPopUp);
                setShowUser(false);
              }}
              className="flex items-center gap-2 border border-white/25 hover:border-white/50 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full px-5 py-2.5 cursor-pointer transition-all duration-200 text-white font-sans"
            >
              <BsCoin size={14} className="text-amber-400" />
              <span>Credits: {userData?.credits || 0}</span>
            </button>
            {showCreditPopUp && (
              <div className="absolute flex flex-col justify-center bg-[#16171d] text-white items-center gap-2 text-center rounded-lg right-0 mt-3 w-56 border border-white/10 p-5 z-50 shadow-2xl">
                <p className="text-xs text-white/70">Need more credits to continue mock interviews?</p>
                <button
                  onClick={() => { handleNavClick("pricing"); setShowCreditPopUp(false); }}
                  className="w-full px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold rounded-full transition-all duration-200 cursor-pointer"
                >
                  Buy credits
                </button>
              </div>
            )}
          </div>

          {/* User Popup */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                if (!userData) { setShowAuth(true); return; }
                setShowUser(!showUser);
                setShowCreditPopUp(false);
              }}
              className="flex items-center gap-2 border border-[#f2bf3f]/40 hover:bg-white/5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full px-5 py-2.5 cursor-pointer transition-all duration-200 text-white font-sans"
            >
              {userData ? (
                <span>{userData.name.split(" ")[0]}</span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaUserAstronaut size={12} />
                  Login
                </span>
              )}
            </button>
            {showUser && (
              <div className="absolute flex flex-col justify-center bg-[#16171d] text-white items-center gap-2.5 rounded-lg right-0 mt-3 w-52 border border-white/10 p-5 z-50 shadow-2xl">
                <p className="text-xs text-white/60 border-b border-white/10 pb-2 w-full text-center truncate">{userData?.name}</p>
                
                <button
                  onClick={() => { navigate("/history"); setShowUser(false); }}
                  className="w-full flex items-center justify-start gap-2.5 p-2 text-[11px] font-bold tracking-wider hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <MdHistory size={15} className="text-neutral-400" />
                  MY HISTORY
                </button>

                <button
                  onClick={() => { navigate("/interview"); setShowUser(false); }}
                  className="w-full flex items-center justify-start gap-2.5 p-2 text-[11px] font-bold tracking-wider hover:bg-white/5 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <BsRobot size={15} className="text-neutral-400" />
                  MOCK INTERVIEW
                </button>

                <hr className="w-full border-white/10 my-0.5" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-2.5 p-2 text-[11px] font-bold tracking-wider text-red-400 hover:bg-red-950/20 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <HiOutlineLogout size={15} />
                  LOGOUT
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
