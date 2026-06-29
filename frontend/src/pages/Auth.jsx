import { IoSparklesSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/fireBase";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import logo from "../assets/interview_iq_logo.png";

const Auth = ({ isModel = false }) => {
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let User = response.user;
      let name = User.displayName;
      let email = User.email;

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        {
          name,
          email,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#09090b] ${
        isModel 
          ? "py-4 bg-transparent" 
          : "min-h-screen flex items-center justify-center px-6 py-20"
      }`}
    >
      {/* Background SVG Illustration matching landing page */}
      {!isModel && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-[center_35%] z-0 pointer-events-none bg-[url('https://cdn.prod.website-files.com/67c4d233d927573fcfd45fce/67e0bb11a8c55a4c86b637ca_BG%20ILLO.svg')] opacity-20" 
            aria-hidden="true"
          />
          <div 
            className="absolute inset-0 bg-zinc-950/40 z-0 pointer-events-none" 
            aria-hidden="true"
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`relative z-10 w-full max-w-lg p-10 md:p-12 rounded-[2rem] bg-[#121214] border border-neutral-800 shadow-2xl ${
          isModel ? "max-w-md p-8 border-neutral-800 bg-neutral-950/95" : ""
        }`}
      >
        <div className="flex justify-center items-center gap-3 mb-6">
          <img src={logo} alt="InterviewIQ Logo" className="w-8 h-8 rounded-lg object-contain border border-neutral-800 bg-neutral-950" />
          <h2 className="font-semibold text-lg text-white font-sans">InterviewIQ</h2>
        </div>

        <h1 className="text-[20px] md:text-2xl font-medium tracking-tight text-center text-white font-sans leading-snug mb-6 flex flex-col items-center gap-2">
          Continue to
          <span className="bg-[#f2bf3f]/10 text-[#f2bf3f] border border-[#f2bf3f]/25 px-5 py-1.5 rounded-full inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider mt-1.5">
            <IoSparklesSharp size={12} className="text-[#f2bf3f]" /> AI Smart Interview
          </span>
        </h1>

        <p className="text-neutral-400 text-center text-xs leading-relaxed mb-12">
          Sign in to access AI-powered Mock Sessions, save your personalized performance logs, and unlock deep vocal/technical analytics.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#f2bf3f] hover:bg-[#d9ab2c] text-xs text-[#0c0c0c] font-bold uppercase tracking-wider rounded-full shadow-md cursor-pointer transition-all duration-300"
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
