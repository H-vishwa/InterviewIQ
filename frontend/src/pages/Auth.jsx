import { GiArtificialHive } from "react-icons/gi";
import { IoSparklesSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/fireBase";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Auth = (isModel = false) => {
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
      className={`
  w-full
  ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
`}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`
  w-full
  ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-4xl"}
 bg-[#222328] shadow-2xl border border-[#232A37]
`}>
        <div className="flex justify-center items-center gap-3 mb-6 ">
          <div className="bg-black p-2  rounded-lg">
            <GiArtificialHive size={20} />
          </div>
          <h2 className="font-semibold text-lg">InterviewQ.AI</h2>
        </div>
        <h1 className="text-[20px] md:text-3xl font-bold leading-snug mb-4 text-center">
          Continue with{" "}
          <span className="bg-[#e1deea] text-[#7b48e8] px-5 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparklesSharp size={16} /> AI Smart Interview
          </span>
        </h1>
        <p className="text-gray-400 text-center text-sm  md:text-base leading-relaxed mb-20">
          Sign in to AI-powered Mock Interviews, Track your progress, And unlock
          Detailed performance insight
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white text-lg text-black font-semibold rounded-2xl shadow-md cursor-pointer">
          <FcGoogle size={22} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
