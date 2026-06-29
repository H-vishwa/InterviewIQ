import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsPersonCircle, BsCpu, BsActivity, BsCreditCard } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const ModesSection = () => {
  useEffect(() => {
    // Animate pathway cards
    gsap.fromTo(
      ".mode-card",
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".modes-grid-container",
          start: "top 85%",
        }
      }
    );

    // Animate briefing columns
    gsap.fromTo(
      ".briefing-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".briefing-grid",
          start: "top 85%",
        }
      }
    );

    // Animate briefing memo card
    gsap.fromTo(
      ".briefing-card",
      { opacity: 0, scale: 0.98, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".briefing-card",
          start: "top 90%",
        }
      }
    );
  }, []);

  return (
    <section className="w-full bg-[#fafaf9] py-24 text-black border-t border-neutral-200/50 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* ── Modes Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 items-start">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <span className="text-[#a83232] font-semibold text-xs md:text-sm tracking-wider uppercase">
              Interview Modes
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 font-sans leading-tight">
              Four targeted pathways designed to test every dimension of your profile.
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Select the mode that matches your current career goals. Transition seamlessly between soft skills loops and deep engineering drills.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 modes-grid-container">
            {[
              {
                icon: <BsPersonCircle size={22} className="text-amber-600" />,
                bg: "bg-amber-50 border-amber-100",
                title: "HR Interview Mode",
                desc: "Behavioral, leadership, and communication evaluations simulating live HR screening panels."
              },
              {
                icon: <BsCpu size={22} className="text-blue-600" />,
                bg: "bg-blue-50 border-blue-100",
                title: "Technical Mode",
                desc: "Deep role-specific engineering, coding, and architecture queries tailored to your career track."
              },
              {
                icon: <BsActivity size={22} className="text-emerald-600" />,
                bg: "bg-emerald-50 border-emerald-100",
                title: "Confidence Detection",
                desc: "Real-time speech analytics assessing vocal confidence, filler-word counts, and pacing."
              },
              {
                icon: <BsCreditCard size={22} className="text-[#e0a92b]" />,
                bg: "bg-amber-50 border-amber-100",
                title: "Credits System",
                desc: "Flexible, pay-as-you-go mock sessions to unlock premium mock interview loops instantly."
              }
            ].map((mode, idx) => (
              <div 
                key={idx}
                className="mode-card bg-white border border-neutral-200/70 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col gap-4 group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${mode.bg} border flex items-center justify-center`}>
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-950 group-hover:text-amber-600 transition-colors duration-300">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-20 border-t border-neutral-200/60" />

        {/* ── Executive Briefing Section ("Not Going to Work") ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <span className="text-[#a83232] font-semibold text-xs md:text-sm tracking-wider uppercase">
              Executive Briefing
            </span>
          </div>
          
          <div className="lg:col-span-3 flex flex-col gap-10">
            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-neutral-900 font-sans max-w-4xl">
              Single-mode preparation formats are nothing but a mismatch—they are{" "}
              <span className="text-[#a83232] font-semibold">not going to work</span> for comprehensive interview readiness.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 briefing-grid">
              <div className="briefing-item flex flex-col gap-2">
                <span className="text-neutral-400 font-mono text-xs">01 / behavioral screens</span>
                <h4 className="text-sm font-semibold text-neutral-800">Rote HR Answers</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Traditional tech bootcamps completely ignore behavioral loops. Memorized coding is not going to work if you fail the cultural alignment screen.
                </p>
              </div>

              <div className="briefing-item flex flex-col gap-2">
                <span className="text-neutral-400 font-mono text-xs">02 / technical depth</span>
                <h4 className="text-sm font-semibold text-neutral-800">Rigid Coding Templates</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Static Q&A lists fail to test how you handle unexpected follow-up branches. Reciting standard templates is not going to work on live engineering rounds.
                </p>
              </div>

              <div className="briefing-item flex flex-col gap-2">
                <span className="text-neutral-400 font-mono text-xs">03 / speech analytics</span>
                <h4 className="text-sm font-semibold text-neutral-800">Monotone Delivery</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Relying on text-based coding alone ignores vocal confidence, pacing, and filler-word usage. Hesitation and poor delivery are not going to work in real loops.
                </p>
              </div>
            </div>

            {/* Stylized Briefing Board Memo */}
            <div className="briefing-card mt-6 border border-neutral-200 bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#f2bf3f]" />
              <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                <span>INTERVIEWIQ BRIEFING</span>
                <span>STATUS: ACTIVE RECOMMENDATION</span>
              </div>
              <p className="text-sm md:text-base text-neutral-800 leading-relaxed italic font-light">
                "Traditional one-size-fits-all preparation loops are not going to work. Modern hiring processes evaluate soft skills, technical depth, and vocal confidence simultaneously. Candidates must prepare across behavioral screens, custom technical rounds, and live voice analytics. InterviewIQ is the only platform providing these targeted modes."
              </p>
              <div className="flex justify-between items-center border-t border-neutral-100 pt-4 mt-2">
                <div>
                  <h5 className="text-xs font-semibold text-neutral-800">Chief Technology Officer</h5>
                  <p className="text-[10px] text-neutral-400">InterviewIQ Advisory Board</p>
                </div>
                <span className="text-[#a83232] font-mono text-xs font-bold">⟨ DIRECTIVE 01 ⟩</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ModesSection;
