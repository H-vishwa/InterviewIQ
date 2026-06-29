import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "motion/react";
import { VscDebugStart } from "react-icons/vsc";
import { useState, useEffect } from "react";
import AuthModel from "../components/AuthModel";
import { useNavigate } from "react-router-dom";
import { MdOutlineHistory } from "react-icons/md";
import ShinyText from "../components/BitsComponents/ShinyText";
import FeatureSection from "../components/Home/FeatureSection";
import StepsSection from "../components/Home/StepsSection";
import ModesSection from "../components/Home/ModesSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import PricingSection from "../components/Home/PricingSection";
import Footer from "../components/Footer";
import { animate } from "animejs";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  // Words that roll on the hero section matching the branding
  const rollingWords = ["Adaptive", "Intelligent", "Interactive", "Immersive", "Insightful"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rollingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const renderAnimatedText = (text) => {
    return text.split("").map((char, idx) => (
      <span
        key={idx}
        className="inline-block hero-letter opacity-0"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    // Animate hero title letters
    animate(".hero-letter", {
      opacity: [0, 1],
      y: [20, 0],
      duration: 600,
      stagger: 12,
      delay: 200
    });

    // Animate subtitle
    animate(".hero-subtitle", {
      opacity: [0, 1],
      y: [20, 0],
      duration: 1000,
      delay: 750
    });

    // Animate CTA buttons
    animate(".hero-cta-btn", {
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 800,
      stagger: 120,
      delay: 950
    });
  }, []);

  return (
    <motion.div className="flex flex-col relative overflow-x-hidden min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative flex-1 overflow-hidden min-h-screen flex flex-col">
        {/* Background SVG Illustration from reference (fully visible) */}
        <div className="absolute inset-0 bg-cover bg-[center_35%] z-0 pointer-events-none bg-[url('https://cdn.prod.website-files.com/67c4d233d927573fcfd45fce/67e0bb11a8c55a4c86b637ca_BG%20ILLO.svg')] opacity-100" />
        {/* Soft gray overlay for blending without blocking visibility */}
        <div
          className="absolute inset-0 bg-zinc-900/20 z-0"
          aria-hidden="true"
        />

        {/* Blended Navbar */}
        <div className="relative z-20 w-full">
          <Navbar />
        </div>

        {/* ── Headline & CTAs Container ── */}
        <div className="relative z-10 flex flex-col justify-between flex-1 px-16 py-16 font-sans max-w-7xl mx-auto w-full">
          {/* Headline — allowed to grow fully across the width */}
          <div className="flex-1 flex items-center md:pl-12 -mt-50">
            <h1 className="font-semibold text-white text-7xl leading-[1.02] tracking-[-0.04em] font-sans">
              <span className="inline-block">{renderAnimatedText("Smart mock interviews for")}</span>
              <br />
              <span className="inline-block">{renderAnimatedText("modern tech careers.")}</span>
              <br />
              <span className="inline-flex h-[1.1em] overflow-hidden relative w-full [perspective:1000px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rollingWords[wordIndex]}
                    initial={{ rotateX: 85, y: 25, opacity: 0 }}
                    animate={{ rotateX: 0, y: 0, opacity: 1 }}
                    exit={{ rotateX: -85, y: -25, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#f2bf3f] absolute left-0 origin-center"
                  >
                    {rollingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>

          {/* Subtitle & Buttons — pinned to the bottom-right */}
          <div className="flex justify-end w-full mt-10 md:mt-0">
            <div className="flex flex-col gap-6 max-w-md">
              <p className="hero-subtitle opacity-0 text-sm md:text-base text-white/60 leading-relaxed font-sans">
                Role-Based mock interviews with Smart follow-ups, Adaptive
                difficulty and real-time performance evaluation
              </p>

              <div className="flex flex-wrap gap-3 font-sans">
                {/* Primary — yellow pill matching reference design */}
                <button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/interview");
                  }}
                  className="hero-cta-btn opacity-0 flex items-center gap-3 cursor-pointer font-bold text-xs tracking-wider uppercase pl-2.5 pr-6 py-2.5 rounded-full bg-[#f2bf3f] text-[#0c0c0c] font-sans transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center bg-[#0c0c0c] text-white rounded-full w-7 h-7 font-bold text-sm">
                    →
                  </div>
                  <span>Start Interview</span>
                </button>

                {/* Secondary — transparent outline pill */}
                <button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }
                    navigate("/history");
                  }}
                  className="hero-cta-btn opacity-0 flex items-center justify-center gap-2 cursor-pointer font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white bg-white/5 font-sans transition-all duration-300 hover:bg-white/10"
                >
                  View history
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of page */}
      <StepsSection />

      <div id="features" className="max-w-7xl mx-auto w-full px-6 md:px-16 mt-28">
        <FeatureSection />
      </div>
      <ModesSection />
      <TestimonialsSection />
      <PricingSection />

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </motion.div>
  );
};

export default Home;
