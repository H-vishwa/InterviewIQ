import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  useEffect(() => {
    // Left column animation
    gsap.fromTo(
      ".feature-header-left",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".feature-header-left",
          start: "top 85%",
        }
      }
    );

    // Staggered grid cards
    gsap.fromTo(
      ".feature-grid-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".staggered-cards-container",
          start: "top 80%",
        }
      }
    );

    // Research card at bottom
    gsap.fromTo(
      ".feature-research-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-research-card",
          start: "top 85%",
        }
      }
    );
  }, []);

  const staggeredCards = [
    {
      logo: "ACCURACY",
      label: "98% Evaluation Accuracy",
      tag: "GPT-4o Powered Analysis"
    },
    {
      logo: "ROLES",
      label: "120+ Tech Roles Supported",
      tag: "Frontend, Backend & DevOps"
    },
    {
      logo: "SCENARIOS",
      label: "Dynamic Custom Prep",
      tag: "Infinite Mock Customization"
    },
    {
      logo: "FEEDBACK",
      label: "Comprehensive Reports",
      tag: "Actionable Strengths & Insights"
    },
    {
      logo: "VOICE AI",
      label: "Adaptive Speech Engine",
      tag: "Real-time Conversational Flow"
    },
    {
      logo: "ANALYTICS",
      label: "Performance Tracking",
      tag: "Detailed Progress Analytics"
    }
  ];

  return (
    <section className="w-full text-white font-sans py-16">
      
      {/* Top half: Introduction and staggered card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Copy & CTAs */}
        <div className="flex flex-col gap-6 feature-header-left">
          <span className="text-[#f2bf3f] font-semibold text-xs md:text-sm tracking-wider uppercase">
            Why InterviewIQ?
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white font-sans">
            Your AI-powered
            <br />
            career prep partner
          </h2>
          
          <div className="flex flex-col gap-5 mt-4 max-w-lg text-sm text-neutral-400">
            <div className="flex items-start gap-2.5">
              <span className="text-[#f2bf3f] mt-1">★</span>
              <div>
                <strong className="text-white block font-medium">Enable Realistic Mocking</strong>
                <span className="leading-relaxed">Dynamic audio-visual feedback that simulates live technical panel pressure.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#f2bf3f] mt-1">★</span>
              <div>
                <strong className="text-white block font-medium">Build Targeted Profiles</strong>
                <span className="leading-relaxed">Job-role and experience-specific tailoring backed by precise resume parsing.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#f2bf3f] mt-1">★</span>
              <div>
                <strong className="text-white block font-medium">Ensure Continuous Growth</strong>
                <span className="leading-relaxed">In-depth insights, communication metrics, and optimized answer suggestions.</span>
              </div>
            </div>
          </div>
          
          <p className="text-neutral-500 text-xs mt-2 max-w-sm">
            Own your interview preparation journey with a complete, adaptive simulation platform.
          </p>

          <button className="flex items-center gap-3 cursor-pointer font-bold text-xs tracking-wider uppercase pl-2.5 pr-6 py-2.5 rounded-full bg-[#f2bf3f] text-[#0c0c0c] font-sans transition-all duration-300 hover:scale-105 mt-6 w-fit">
            <div className="flex items-center justify-center bg-[#0c0c0c] text-white rounded-full w-7 h-7 font-bold text-sm">
              →
            </div>
            <span>Start Preparing</span>
          </button>
        </div>

        {/* Right Column: Staggered Grid Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start staggered-cards-container">
          
          {/* Column 1 of Staggered Cards (shifted down on desktop) */}
          <div className="flex flex-col gap-6 sm:mt-12">
            {[staggeredCards[1], staggeredCards[3], staggeredCards[5]].map((card, i) => (
              <div 
                key={i}
                className="feature-grid-card p-8 border border-neutral-800 rounded-2xl bg-neutral-950 flex flex-col justify-between items-center text-center shadow-lg transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60 min-h-[160px]"
              >
                <span className="text-neutral-500 font-mono text-[9px] tracking-widest">{card.logo}</span>
                <div className="flex flex-col items-center gap-1.5 my-3">
                  <span className="text-xs font-semibold text-white">{card.label}</span>
                  <span className="text-[10px] text-[#f2bf3f] tracking-wide font-mono">{card.tag}</span>
                </div>
                <div className="flex items-center gap-1 text-[#f2bf3f] text-[7px] tracking-widest font-bold">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 of Staggered Cards */}
          <div className="flex flex-col gap-6">
            {[staggeredCards[0], staggeredCards[2], staggeredCards[4]].map((card, i) => (
              <div 
                key={i}
                className="feature-grid-card p-8 border border-neutral-800 rounded-2xl bg-neutral-950 flex flex-col justify-between items-center text-center shadow-lg transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60 min-h-[160px]"
              >
                <span className="text-neutral-500 font-mono text-[9px] tracking-widest">{card.logo}</span>
                <div className="flex flex-col items-center gap-1.5 my-3">
                  <span className="text-xs font-semibold text-white">{card.label}</span>
                  <span className="text-[10px] text-[#f2bf3f] tracking-wide font-mono">{card.tag}</span>
                </div>
                <div className="flex items-center gap-1 text-[#f2bf3f] text-[7px] tracking-widest font-bold">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Featured Research Card */}
      <div className="feature-research-card mt-24 border border-neutral-800 rounded-3xl p-8 md:p-12 bg-neutral-950/60 relative overflow-hidden shadow-2xl">
        
        {/* Subtle grid pattern inside card */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <span className="text-[#f2bf3f] font-mono text-xs tracking-wider uppercase">
              | NEW IN AI RESEARCH
            </span>
            <h3 className="text-2xl md:text-4xl font-normal leading-[1.1] text-white mt-4 max-w-4xl font-sans">
              InterviewIQ introduces VoiceInsight: a real-time conversational analysis model evaluating candidate confidence, technical depth, and filler-word usage dynamically.
            </h3>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-neutral-900 pt-8">
            
            {/* Star bullet list */}
            <div className="flex flex-col gap-4 max-w-xl text-xs md:text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <span className="text-[#f2bf3f] mt-1">★</span>
                <span>
                  <strong className="text-white block font-medium">Tone & Latency Analysis</strong>
                  Measures voice confidence, volume variation, and response latency to assess candidate readiness under pressure.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#f2bf3f] mt-1">★</span>
                <span>
                  <strong className="text-white block font-medium">Semantic Code Evaluation</strong>
                  Analyzes raw technical logic, architectural choices, and complexity optimization suggestions instantly.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#f2bf3f] mt-1">★</span>
                <span>
                  <strong className="text-white block font-medium">Contextual Follow-Ups</strong>
                  Dynamically generates follow-up questions tailored specifically to the details of your previous responses.
                </span>
              </div>
            </div>
            
            <button className="flex items-center gap-2 cursor-pointer font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 text-white w-fit transition-all duration-300 shrink-0">
              <span>Explore VoiceInsight</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeatureSection;
