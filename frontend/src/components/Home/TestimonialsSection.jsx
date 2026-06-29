import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SiGoogle, SiMeta, SiNetflix, SiStripe } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";

import developersImg from "../../assets/case_study_developers.png";
import conferenceImg from "../../assets/case_study_conference.png";

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Software Engineer at Google",
      quote: "InterviewIQ completely changed how I prepared for my Google loops. The voice-based AI simulated the panel pressure perfectly, and the system design follow-ups forced me to think deep about trade-offs. I got my offer last month!",
      company: "Google",
      logo: <SiGoogle size={22} className="transition-colors duration-300" />,
      color: "#4285F4"
    },
    {
      name: "David Chen",
      role: "Senior Solutions Architect at Microsoft",
      quote: "The resume-based questions were incredibly accurate. It parsed my Kubernetes projects and asked exact scenario-based questions about scaling and recovery that I faced in the real interview. Worth every credit.",
      company: "Microsoft",
      logo: <FaMicrosoft size={20} className="transition-colors duration-300" />,
      color: "#00A4EF"
    },
    {
      name: "Aria Novak",
      role: "Product Engineer at Meta",
      quote: "I struggled with mock interviews because of nerves. Practicing with the AI voice mode let me fail and iterate in a safe space. The tone and filler-word evaluations helped me speak much more confidently.",
      company: "Meta",
      logo: <SiMeta size={22} className="transition-colors duration-300" />,
      color: "#0668E1"
    },
    {
      name: "Marcus Vance",
      role: "Senior Backend Developer at Netflix",
      quote: "The system design questions are outstanding. It doesn't just check if your solution is correct, it questions your design choices adaptively. That simulated the actual Netflix culture perfectly.",
      company: "Netflix",
      logo: <SiNetflix size={22} className="transition-colors duration-300" />,
      color: "#E50914"
    },
    {
      name: "Elena Rostova",
      role: "Staff Engineer at Stripe",
      quote: "Having a downloadable PDF with direct code improvements was like having a staff engineer review my answers. I optimized my coding loops and solved both technical rounds with ease.",
      company: "Stripe",
      logo: <SiStripe size={22} className="transition-colors duration-300" />,
      color: "#635BFF"
    }
  ];

  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#09090b] py-24 text-white border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* ── Testimonials Section ── */}
        <div className="text-center mb-16">
          <span className="text-[#f2bf3f] font-semibold text-xs md:text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mt-4 font-sans">
            What candidates say about working with InterviewIQ
          </h2>
          <p className="text-neutral-400 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            From entry-level graduates securing first offers, to staff engineers leveling up to big tech companies.
          </p>
        </div>

        {/* Large Testimonial Card */}
        <div className="bg-[#121214] rounded-[2rem] border border-neutral-800 text-white relative overflow-hidden shadow-2xl">
          <div className="px-6 py-12 md:p-16 flex flex-col items-center text-center">
            
            {/* User Avatar Circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-[#f2bf3f] to-[#a83232] flex items-center justify-center text-white text-xl font-bold border-2 border-neutral-800 shadow-xl mb-8">
              {testimonials[activeTab].name[0]}
            </div>

            {/* Testimonial Quote */}
            <div className="min-h-[180px] md:min-h-[140px] flex items-center justify-center max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm md:text-lg md:leading-relaxed text-neutral-200 font-light"
                >
                  "{testimonials[activeTab].quote}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Credentials */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">
                {testimonials[activeTab].name}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                {testimonials[activeTab].role}
              </p>
            </div>

          </div>

          {/* Testimonial Footer Tabs / Partner logos */}
          <div className="border-t border-neutral-800 grid grid-cols-5 bg-black/40">
            {testimonials.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex flex-col items-center justify-center py-6 px-2 transition-all duration-300 border-t-2 relative ${
                  activeTab === idx
                    ? "bg-[#18181b]/60 text-white"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/10"
                }`}
                style={{
                  borderTopColor: activeTab === idx ? tab.color : "transparent"
                }}
              >
                <div 
                  style={{
                    color: activeTab === idx ? tab.color : "currentColor"
                  }}
                  className="transition-transform duration-300 hover:scale-110"
                >
                  {tab.logo}
                </div>
                <span className="hidden md:inline text-[9px] font-mono tracking-widest uppercase mt-2 opacity-80">
                  {tab.company}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Divider */}
        <hr className="my-20 border-t border-neutral-800/60" />

        {/* ── Customer Stories Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mb-16">
          <div className="lg:col-span-1">
            <span className="text-[#f2bf3f] font-semibold text-xs md:text-sm tracking-wider uppercase">
              Customer Stories
            </span>
          </div>
          
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] tracking-tight text-white font-sans max-w-3xl">
              Real-world success: How developers and candidates land top roles using InterviewIQ.
            </h3>
            
            <button className="flex items-center gap-3 cursor-pointer font-bold text-xs tracking-wider uppercase pl-2.5 pr-6 py-2.5 rounded-full bg-[#f2bf3f] hover:scale-105 text-black font-sans transition-all duration-300 w-fit">
              <div className="flex items-center justify-center bg-black text-white rounded-full w-7 h-7 font-bold text-sm">
                →
              </div>
              <span>View all cases</span>
            </button>
          </div>
        </div>

        {/* Case Study 1 (Image Left, Copy Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-800 bg-[#121214]">
            <img 
              src={developersImg} 
              alt="Liam collaborating with developers" 
              className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-fit flex items-center justify-center text-amber-500 font-bold text-xs tracking-widest bg-amber-950/20 px-3 py-1 rounded-full border border-amber-900/40 uppercase">
              🎯 Google Offer
            </div>
            <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
              How a self-taught engineer cracked the Google Systems Design loop in 4 weeks
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Liam leveraged InterviewIQ's adaptive voice simulations and detailed scorecard audits to parse complex systems design blueprints, identify memory leaks, and present architectural trade-offs confidently during his interviews.
            </p>
            <a href="#" className="font-bold text-xs uppercase tracking-wider text-[#f2bf3f] hover:text-white flex items-center gap-1 transition-colors duration-250">
              Read Case <span className="text-sm">→</span>
            </a>
            
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-800/60 mt-2">
              <div>
                <span className="text-3xl font-light text-white">+120</span>
                <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-1">Mock Rounds Practiced</p>
              </div>
              <div>
                <span className="text-3xl font-light text-white">L6</span>
                <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-1">Target Role Level Achieved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study 2 (Copy Left, Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 order-2 md:order-1">
            <div className="w-fit flex items-center justify-center text-blue-400 font-bold text-xs tracking-widest bg-blue-950/20 px-3 py-1 rounded-full border border-blue-900/40 uppercase">
              Bootcamp Integration
            </div>
            <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
              InterviewIQ partners with leading coding bootcamps to scale AI-driven mock loops
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our partnership integrates real-time tone analytics and dynamic voice assessment into curriculum paths, preparing thousands of graduating developers for rigorous tech industry standards.
            </p>
            <a href="#" className="font-bold text-xs uppercase tracking-wider text-[#f2bf3f] hover:text-white flex items-center gap-1 transition-colors duration-250">
              Read Case <span className="text-sm">→</span>
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-800 bg-[#121214] order-1 md:order-2">
            <img 
              src={conferenceImg} 
              alt="InterviewIQ Stage Panel Presentation" 
              className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
