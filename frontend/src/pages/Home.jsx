import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import { VscDebugStart } from "react-icons/vsc";
import { useState } from "react";
import AuthModel from "../components/AuthModel";
import { useNavigate } from "react-router-dom";
import { MdOutlineHistory } from "react-icons/md";
import ShinyText from "../components/BitsComponents/ShinyText";
import FeatureSection from "../components/Home/FeatureSection";
import StepsSection from "../components/Home/StepsSection";
import ModesSection from "../components/Home/ModesSection";
import Footer from "../components/Footer";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="flex-1 py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 text-sm md:text-xl">
              <ShinyText
                text="✨ AI Powered Smart Interview Platform"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#9810fa"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </div>
          </div>
          <div className="text-center mb-28">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05 }}
              className="text-2xl max-w-4xl flex flex-col gap-4 md:text-5xl leading-tight font-semibold mx-auto">
              Practice Interview with{" "}
              <motion.span
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className="relative inline-block">
                <span className="bg-purple-50 text-purple-600  px-5 py-1 rounded-full ">
                  AI Intelligence
                </span>
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 mx-auto text-md max-w-2xl">
              Role-Based mock interviews with Smart follow-ups, Adaptive
              difficulty and real-time performance evaluation
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white hover:bg-black hover:text-white text-black transition-all duration-300 border border-white/10 cursor-pointer  shadow-md px-3 md:px-10 py-3">
                <VscDebugStart size={27} className="md:hidden" />
                <span className="hidden md:inline font-semibold">
                  Start Interview
                </span>
              </motion.button>{" "}
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="backdrop-blur-2xl flex gap-2 justify-center items-center text-white border cursor-pointer hover:bg-white hover:text-black  transition-all duration-300 shadow-md px-3 md:px-10 py-3">
                <MdOutlineHistory size={27} className="" />
                <span className="font-semibold">View history</span>
              </motion.button>
            </div>
          </div>
          <StepsSection />
          <FeatureSection />
        </div>
      </div>
      <ModesSection />

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </motion.div>
  );
};

export default Home;
