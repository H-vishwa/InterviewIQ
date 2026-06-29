import logo from "../assets/interview_iq_logo.png";

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-black text-white pt-16 md:pt-24 pb-16 md:pb-36 border-t border-neutral-950 font-sans relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-16 relative z-10">
        
        {/* ── Top Call to Action Row ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-16 border-b border-neutral-900">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-200 max-w-3xl leading-tight font-sans">
            Discover how InterviewIQ can help you <span className="text-white font-semibold">unleash the potential of practice</span> to transform your career.
          </h2>
          
          <button className="flex items-center gap-3 cursor-pointer font-bold text-xs tracking-wider uppercase pl-2.5 pr-6 py-2.5 rounded-full bg-[#f2bf3f] hover:scale-105 text-black font-sans transition-all duration-300 w-fit shrink-0">
            <div className="flex items-center justify-center bg-black text-white rounded-full w-7 h-7 font-bold text-sm">
              →
            </div>
            <span>Book a demo</span>
          </button>
        </div>

        {/* ── Middle Footer Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Brand Info & Newsletter Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="InterviewIQ Logo" className="w-8 h-8 rounded-lg object-contain border border-neutral-800 bg-neutral-950" />
                <span className="text-xl font-bold tracking-[0.2em] text-white uppercase font-sans">
                  InterviewIQ
                </span>
              </div>
              <p className="text-neutral-400 text-sm mt-4 max-w-md leading-relaxed">
                Fusing advanced conversational AI and targeted feedback loops to build resilient technical depth and vocal confidence across global engineering talent pools.
              </p>
            </div>
            
            {/* Newsletter Input Box */}
            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </span>
              <div className="flex items-center bg-[#09090b] border border-neutral-800 rounded-full px-4 py-2 w-full focus-within:border-neutral-700 transition-colors duration-250">
                <svg className="w-4 h-4 text-neutral-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent text-xs text-white placeholder-neutral-600 focus:outline-none flex-grow"
                />
                <button className="bg-[#121214] hover:bg-neutral-800 text-white rounded-full p-2 transition-colors cursor-pointer flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
              <span className="text-[8px] text-neutral-500 tracking-wider font-mono uppercase mt-1">
                By subscribing you agree to our terms.
              </span>
            </div>
          </div>

          {/* Links Column Sets */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Links Block 1 */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                Links
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Press & Media Kit</a></li>
              </ul>
            </div>

            {/* Links Block 2 */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                Platform
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Our Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Why InterviewIQ?</a></li>
              </ul>
            </div>

            {/* Links Block 3 */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                Resources
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blog & Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Research</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            {/* Links Block 4 */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
                Socials
              </span>
              <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">X (Twitter)</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ── Footer Bottom Meta Row ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12 border-t border-neutral-800/60 text-neutral-500 text-[10px] font-mono tracking-widest uppercase mt-8 relative z-10">
          <span>© COPYRIGHT 2026 INTERVIEWIQ.AI</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-white transition-colors duration-200">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-white transition-colors duration-200">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors duration-200">DATA PLATFORM TOS</a>
          </div>
        </div>

      </div>
      
      {/* Background Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[11vw] font-black tracking-[0.02em] bg-gradient-to-b from-neutral-800/80 via-neutral-900/30 to-transparent bg-clip-text text-transparent leading-none text-center uppercase z-0 w-full font-sans">
        InterviewIQ
      </div>
    </footer>
  );
};

export default Footer;
