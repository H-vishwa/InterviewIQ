import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { MdHistory as HistoryIcon } from "react-icons/md";
import { FaUserAstronaut, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";
import logo from "../assets/interview_iq_logo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
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
      setShowMenu(false);
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
    <div className={`fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300 ${
      scrolled 
        ? "bg-[#09090b]/85 backdrop-blur-md border-b border-white/5 py-3.5 shadow-lg" 
        : "bg-transparent border-b border-transparent py-5"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl mx-auto px-4 md:px-16 flex justify-between items-center relative"
      >
        {/* Left Side: Logo & Brand name */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="InterviewIQ Logo" className="w-8 h-8 rounded-lg object-contain border border-neutral-800 bg-neutral-950" />
          <h1 className="text-base md:text-lg font-bold tracking-[0.12em] text-white uppercase font-sans">
            InterviewIQ
          </h1>
        </div>

        {/* Right Side: Menu Dropdown Controller */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 border border-white/5 hover:border-white/40 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase rounded-full px-4 py-2 cursor-pointer transition-all duration-200 text-white font-sans bg-neutral-950"
            aria-label="Toggle menu"
          >
            <span className="mr-0.5">Menu</span>
            {showMenu ? <FaTimes size={11} /> : <FaBars size={11} />}
          </button>

          {/* Unified Dropdown Drawer Panel */}
          {showMenu && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-[#121214] border border-white/5 rounded-[1.75rem] p-5 z-50 shadow-2xl flex flex-col gap-5 text-left font-sans">
              
              {/* 1. Navigation Links */}
              <div className="flex flex-col gap-2.5 pb-4 border-b border-white/5">
                <span className="text-[9px] font-bold text-neutral-500 tracking-widest font-mono uppercase">Navigate</span>
                <span 
                  onClick={() => { handleNavClick("features"); setShowMenu(false); }} 
                  className="text-[13px] font-semibold text-neutral-300 hover:text-white cursor-pointer transition-colors py-0.5"
                >
                  About Platform
                </span>
                <span 
                  onClick={() => { handleNavClick("footer"); setShowMenu(false); }} 
                  className="text-[13px] font-semibold text-neutral-300 hover:text-white cursor-pointer transition-colors py-0.5"
                >
                  Contact Us
                </span>
              </div>

              {/* 2. Credits & Transactions */}
              <div className="flex flex-col gap-2.5 pb-4 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-neutral-500 tracking-widest font-mono uppercase">Balance</span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                    <BsCoin size={12} />
                    <span>{userData?.credits || 0} Credits</span>
                  </div>
                </div>
                <button
                  onClick={() => { handleNavClick("pricing"); setShowMenu(false); }}
                  className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer text-center"
                >
                  Buy credits
                </button>
              </div>

              {/* 3. Account Settings */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[9px] font-bold text-neutral-500 tracking-widest font-mono uppercase">Account</span>
                {userData ? (
                  <div className="flex flex-col gap-2.5">
                    <div className="text-xs text-neutral-400 font-medium truncate bg-[#09090b] border border-neutral-800/80 px-3.5 py-2.5 rounded-xl">
                      Signed in as <span className="font-semibold text-white">{userData.name.split(" ")[0]}</span>
                    </div>
                    
                    <button
                      onClick={() => { navigate("/history"); setShowMenu(false); }}
                      className="w-full flex items-center gap-2.5 py-1 text-[13px] font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <HistoryIcon size={16} className="text-neutral-400" />
                      My History Logs
                    </button>

                    <button
                      onClick={() => { navigate("/interview"); setShowMenu(false); }}
                      className="w-full flex items-center gap-2.5 py-1 text-[13px] font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <BsRobot size={16} className="text-neutral-400" />
                      Start Mock Session
                    </button>

                    <button
                      onClick={() => { handleLogout(); setShowMenu(false); }}
                      className="w-full flex items-center gap-2.5 py-1 text-[13px] font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer mt-1"
                    >
                      <HiOutlineLogout size={16} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowAuth(true); setShowMenu(false); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#f2bf3f]/40 hover:bg-[#f2bf3f]/10 text-xs font-bold text-[#f2bf3f] uppercase tracking-wider rounded-full cursor-pointer transition-all duration-200"
                  >
                    <FaUserAstronaut size={11} />
                    Log In / Sign Up
                  </button>
                )}
              </div>

            </div>
          )}
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Navbar;
