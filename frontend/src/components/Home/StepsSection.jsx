import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  SiGoogle, 
  SiMeta, 
  SiApple, 
  SiNetflix, 
  SiNvidia, 
  SiTesla, 
  SiUber, 
  SiAirbnb, 
  SiStripe, 
  SiOpenai 
} from "react-icons/si";
import { FaMicrosoft, FaAmazon } from "react-icons/fa6";

const StepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle active steps every 4 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="w-full bg-[#fafaf9] py-24 text-black border-y border-neutral-200/50">
      
      {/* Dynamic Keyframes for floating 3D layers and audio visualizer */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1.4); }
        }
        @keyframes layer-hover-setup {
          0%, 100% { transform: translate(-50%, -50%) translateZ(35px); }
          50% { transform: translate(-50%, -50%) translateZ(45px); }
        }
        @keyframes layer-hover-simulation {
          0%, 100% { transform: translate(-50%, -50%) translateZ(105px); }
          50% { transform: translate(-50%, -50%) translateZ(115px); }
        }
        @keyframes layer-hover-reports {
          0%, 100% { transform: translate(-50%, -50%) translateZ(175px); }
          50% { transform: translate(-50%, -50%) translateZ(185px); }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 md:px-16 font-sans">
        
        {/* Red Tagline */}
        <span className="text-[#a83232] font-semibold text-xs md:text-sm tracking-wider uppercase">
          Supporting Candidates to become Interview-Ready
        </span>

        {/* Large Styled Headline */}
        <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight text-neutral-400 mt-4 max-w-4xl font-sans">
          InterviewIQ builds the simulation that enables candidates and developers across the{" "}
          <span className="text-neutral-500 font-normal">tech industry</span>{" "}
          <span className="text-neutral-900 font-semibold">
            to own, practice and master their interviews, confidently, adaptively and at scale.
          </span>
        </h2>

        {/* Dark Container Box */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-16 bg-[#09090b] rounded-[2rem] border border-neutral-800 p-8 md:p-14 text-white relative overflow-hidden shadow-2xl transition-all duration-300"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Details & CTAs */}
            <div className="flex flex-col h-full justify-between min-h-[300px]">
              <div>
                <span className="text-[#f2bf3f] font-bold text-xs tracking-wider uppercase">
                  END-TO-END AI INTERVIEW PRACTICE
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-4 mb-6 leading-[1.1] min-h-[120px] md:min-h-[150px]">
                  {activeStep === 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      Custom Roles.
                      <br />
                      Resume Upload.
                      <br />
                      Target Preparation.
                    </motion.div>
                  )}
                  {activeStep === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      Voice Interview.
                      <br />
                      Adaptive AI.
                      <br />
                      Dynamic Flow.
                    </motion.div>
                  )}
                  {activeStep === 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      Deep Analysis.
                      <br />
                      Score Breakdown.
                      <br />
                      Code Feedback.
                    </motion.div>
                  )}
                </h3>

                <p className="text-neutral-400 text-sm md:text-base max-w-md leading-relaxed mb-8 min-h-[80px]">
                  {activeStep === 0 && "Tailor the mock interview to your specific profile. Upload a resume, select your target job title, and AI will prepare relevant, real-world questions."}
                  {activeStep === 1 && "Converse naturally with our AI interviewer. It listens to your spoken answers and asks relevant follow-up questions, simulating a live panel."}
                  {activeStep === 2 && "Receive a comprehensive performance assessment including communication score, technical accuracy, code optimizations, and full transcripts."}
                </p>
              </div>

              <button
                className="flex items-center gap-2 cursor-pointer font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-full border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 text-white w-fit transition-all duration-300"
              >
                <span>Start practicing</span>
                <span className="text-sm">→</span>
              </button>
            </div>

            {/* Right Column: 3D Isometric Stack */}
            <div className="flex justify-center items-center py-10 min-h-[320px] md:min-h-[400px]">
              <div className="relative w-full max-w-[320px] md:max-w-[380px] h-[300px] md:h-[350px] [perspective:1000px] flex items-center justify-center lg:translate-x-50">
                <div className="relative w-full h-full [transform-style:preserve-3d] [transform:rotateX(52deg)_rotateZ(-45deg)] transition-all duration-700">
                  
                  {/* Bottom Layer (Setup) */}
                  <div
                    style={{
                      transform: activeStep === 0 ? undefined : "translate(-50%, -50%) translateZ(0px)",
                      opacity: activeStep === 0 ? 1 : 0.45,
                    }}
                    className={`absolute w-60 h-36 md:w-68 md:h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-all duration-500 p-4 flex flex-col justify-between shadow-lg cursor-pointer ${
                      activeStep === 0
                        ? "border-[#f2bf3f] bg-[#f2bf3f]/10 shadow-[0_0_30px_rgba(242,191,63,0.2)] animate-[layer-hover-setup_3s_ease-in-out_infinite]"
                        : "border-neutral-800 bg-[#121214]"
                    }`}
                    onMouseEnter={() => setActiveStep(0)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-neutral-500 font-mono">01 / SETUP</span>
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeStep === 0 ? "bg-[#f2bf3f] animate-pulse" : "bg-neutral-700"}`} />
                    </div>
                    <div className="flex flex-col gap-2 my-2 w-full">
                      <div className="h-1.5 w-2/3 bg-neutral-800 rounded-sm overflow-hidden relative">
                        <div className={`absolute top-0 left-0 h-full bg-[#f2bf3f] rounded-sm transition-all duration-[1200ms] ease-out ${activeStep === 0 ? "w-2/3" : "w-0"}`} />
                      </div>
                      <div className="h-1.5 w-1/2 bg-neutral-800 rounded-sm overflow-hidden relative">
                        <div className={`absolute top-0 left-0 h-full bg-[#f2bf3f]/80 rounded-sm transition-all duration-[1200ms] ease-out delay-150 ${activeStep === 0 ? "w-1/2" : "w-0"}`} />
                      </div>
                      <div className="h-1.5 w-4/5 bg-neutral-800 rounded-sm overflow-hidden relative">
                        <div className={`absolute top-0 left-0 h-full bg-neutral-600 rounded-sm transition-all duration-[1200ms] ease-out delay-300 ${activeStep === 0 ? "w-4/5" : "w-0"}`} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                      <span>PROFILE_READY</span>
                      <span className={activeStep === 0 ? "text-[#f2bf3f] font-bold" : "text-neutral-500"}>100%</span>
                    </div>
                  </div>

                  {/* Middle Layer (Voice Simulation) */}
                  <div
                    style={{
                      transform: activeStep === 1 ? undefined : "translate(-50%, -50%) translateZ(70px)",
                      opacity: activeStep === 1 ? 1 : 0.45,
                    }}
                    className={`absolute w-60 h-36 md:w-68 md:h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-all duration-500 p-4 flex flex-col justify-between shadow-lg cursor-pointer ${
                      activeStep === 1
                        ? "border-[#a83232] bg-[#a83232]/10 shadow-[0_0_30px_rgba(168,50,50,0.2)] animate-[layer-hover-simulation_3s_ease-in-out_infinite]"
                        : "border-neutral-800 bg-[#121214]"
                    }`}
                    onMouseEnter={() => setActiveStep(1)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-neutral-500 font-mono">02 / SIMULATION</span>
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeStep === 1 ? "bg-red-500 animate-pulse" : "bg-neutral-700"}`} />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 h-10 my-2">
                      {[6, 14, 8, 16, 22, 18, 10, 20, 12, 15, 6].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            height: `${h}px`,
                            animationDelay: `${i * 0.08}s`,
                          }}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            activeStep === 1
                              ? "bg-red-400 animate-[wave-pulse_1s_ease-in-out_infinite]"
                              : "bg-neutral-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-red-400">
                      <span>AUDIO_INPUT_ACTIVE</span>
                      <span>REC</span>
                    </div>
                  </div>

                  {/* Top Layer (Analysis/Reports) */}
                  <div
                    style={{
                      transform: activeStep === 2 ? undefined : "translate(-50%, -50%) translateZ(140px)",
                      opacity: activeStep === 2 ? 1 : 0.45,
                    }}
                    className={`absolute w-60 h-36 md:w-68 md:h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border transition-all duration-500 p-4 flex flex-col justify-between shadow-lg cursor-pointer ${
                      activeStep === 2
                        ? "border-emerald-500 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.25)] animate-[layer-hover-reports_3s_ease-in-out_infinite]"
                        : "border-neutral-800 bg-[#121214]"
                    }`}
                    onMouseEnter={() => setActiveStep(2)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-neutral-500 font-mono">03 / REPORTS</span>
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeStep === 2 ? "bg-emerald-500 animate-pulse" : "bg-neutral-700"}`} />
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 flex items-center justify-center text-[8px] font-bold text-emerald-400 relative overflow-hidden shrink-0">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-emerald-500"
                            strokeWidth="3.5"
                            strokeDasharray="100, 100"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            style={{
                              strokeDasharray: activeStep === 2 ? "88, 100" : "0, 100",
                              transition: "stroke-dasharray 1.5s ease-in-out 0.3s"
                            }}
                          />
                        </svg>
                        <span className="relative z-10">88%</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        <div className="h-1 bg-neutral-800 w-full rounded-sm overflow-hidden relative">
                          <div className={`absolute top-0 left-0 h-full bg-emerald-500 rounded-sm transition-all duration-[1200ms] ease-out ${activeStep === 2 ? "w-full" : "w-0"}`} />
                        </div>
                        <div className="h-1 bg-neutral-800 w-4/5 rounded-sm overflow-hidden relative">
                          <div className={`absolute top-0 left-0 h-full bg-emerald-500 rounded-sm transition-all duration-[1200ms] ease-out delay-150 ${activeStep === 2 ? "w-4/5" : "w-0"}`} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400">
                      <span>REPORT_GENERATED.pdf</span>
                      <span>DONE</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Bottom Interactive Columns */}
          <div className="mt-14 pt-8 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                name: "INTERVIEW SETUP",
                desc: "Select customized roles, difficulty, or upload a resume to shape the AI interviewer's target profile.",
              },
              {
                num: "02",
                name: "SMART SIMULATION",
                desc: "Conduct a realistic voice interview with adaptive questions that branch dynamically off your responses.",
              },
              {
                num: "03",
                name: "DETAILED REPORTS",
                desc: "Obtain transcripts, communication scores, answers analysis, and concrete code improvement suggestions.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`cursor-pointer group flex flex-col gap-2 p-4 rounded-xl transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-neutral-900 border border-neutral-800 shadow-md"
                    : "hover:bg-neutral-900/40 border border-transparent"
                }`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      activeStep === idx ? "text-[#f2bf3f]" : "text-neutral-500"
                    }`}
                  >
                    {step.num}
                  </span>
                  <h4
                    className={`text-xs tracking-wider uppercase font-semibold transition-colors duration-300 ${
                      activeStep === idx ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                    }`}
                  >
                    {step.name}
                  </h4>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <hr className="my-20 border-t border-neutral-200/60" />

        {/* Section Header: Target Employers */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <span className="text-[#a83232] font-semibold text-xs md:text-sm tracking-wider uppercase">
              Target Employers
            </span>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.2] tracking-tight text-neutral-800 font-sans">
              Candidates rely on InterviewIQ to prepare for the rigorous engineering and system design standards of global tech leaders.
            </h3>
          </div>
        </div>

        {/* Grid of Company Logos */}
        <div className="mt-12 bg-white rounded-2xl border border-neutral-200/60 overflow-hidden grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {[
            { icon: <SiGoogle size={30} className="text-[#4285F4] md:text-neutral-400 group-hover:text-[#4285F4] transition-colors duration-300" /> },
            { icon: <FaMicrosoft size={26} className="text-[#00A4EF] md:text-neutral-400 group-hover:text-[#00A4EF] transition-colors duration-300" /> },
            { icon: <SiMeta size={30} className="text-[#0668E1] md:text-neutral-400 group-hover:text-[#0668E1] transition-colors duration-300" /> },
            { icon: <FaAmazon size={28} className="text-[#FF9900] md:text-neutral-400 group-hover:text-[#FF9900] transition-colors duration-300" /> },
            { icon: <SiApple size={30} className="text-[#000000] md:text-neutral-400 group-hover:text-[#000000] transition-colors duration-300" /> },
            { icon: <SiNetflix size={30} className="text-[#E50914] md:text-neutral-400 group-hover:text-[#E50914] transition-colors duration-300" /> },
            { icon: <SiNvidia size={32} className="text-[#76B900] md:text-neutral-400 group-hover:text-[#76B900] transition-colors duration-300" /> },
            { icon: <SiTesla size={28} className="text-[#E82127] md:text-neutral-400 group-hover:text-[#E82127] transition-colors duration-300" /> },
            { icon: <SiUber size={30} className="text-[#000000] md:text-neutral-400 group-hover:text-[#000000] transition-colors duration-300" /> },
            { icon: <SiAirbnb size={32} className="text-[#FF5A5F] md:text-neutral-400 group-hover:text-[#FF5A5F] transition-colors duration-300" /> },
            { icon: <SiStripe size={30} className="text-[#635BFF] md:text-neutral-400 group-hover:text-[#635BFF] transition-colors duration-300" /> },
            { icon: <SiOpenai size={28} className="text-[#000000] md:text-neutral-400 group-hover:text-[#10a37f] transition-colors duration-300" /> },
          ].map((logo, idx) => (
            <div 
              key={idx} 
              className="group flex items-center justify-center p-8 hover:bg-neutral-50/50 border-r border-b border-neutral-100 transition-all duration-300 min-h-[110px]"
            >
              {logo.icon}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StepsSection;
