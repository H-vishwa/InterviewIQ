import { motion } from "motion/react";
import { useState } from "react";
import {
  FaBriefcase,
  FaChartLine,
  FaFileUpload,
  FaMicrophoneAlt,
  FaUserTie,
} from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";

const Setup = ({ onStart }) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    try {
      const result = await axios.post(
        serverUrl + "/api/interview/resume",
        formData,
        { withCredentials: true },
      );

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);

      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true },
      );

      if (userData) {
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      }

      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-full flex items-center justify-center px-4 font-sans"
    >
      <div className="grid md:grid-cols-2 bg-[#09090b] rounded-[2rem] overflow-hidden w-full max-w-4xl border border-neutral-800 shadow-2xl">
        
        {/* Left Info Panel */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center py-12 px-10 relative bg-[#121214] border-r border-neutral-800"
        >
          <h1 className="text-3xl font-medium tracking-tight text-white mb-4">
            Start Your AI Interview
          </h1>
          <p className="mb-8 text-xs leading-relaxed text-neutral-400">
            Practice real technical or behavioral interview scenarios dynamically evaluated by AI. Boost your speech delivery, depth, and overall confidence in a safe space.
          </p>

          <div className="space-y-3.5">
            {[
              {
                icon: <FaUserTie className="text-[#f2bf3f] text-lg" />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-[#a83232] text-lg" />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-[#f2bf3f] text-lg" />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="rounded-xl flex items-center space-x-4 bg-[#09090b] border border-neutral-800/60 p-4"
              >
                {item.icon}
                <span className="text-neutral-300 font-medium text-xs tracking-wide">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Setup Panel */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 flex flex-col justify-center"
        >
          <h2 className="mb-8 font-semibold tracking-tight text-2xl text-center text-white">
            Interview Config
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <FaUserTie className="absolute text-neutral-500 top-4 left-4" />
              <input
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="text"
                placeholder="Enter target role"
                className="w-full pl-12 pr-4 py-3.5 bg-[#121214] border border-neutral-800 rounded-xl outline-none transition-all duration-300 focus:ring-1 focus:ring-[#f2bf3f] text-xs text-white"
              />
            </div>
            
            <div className="relative">
              <FaBriefcase className="absolute text-neutral-500 top-4 left-4" />
              <input
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                type="text"
                placeholder="Experience (e.g. 2 years)"
                className="w-full pl-12 pr-4 py-3.5 bg-[#121214] border border-neutral-800 rounded-xl outline-none transition-all duration-300 focus:ring-1 focus:ring-[#f2bf3f] text-xs text-white"
              />
            </div>
            
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-3.5 px-4 bg-[#121214] text-neutral-300 border border-neutral-800 rounded-xl outline-none focus:ring-1 focus:ring-[#f2bf3f] transition-all duration-200 cursor-pointer appearance-none text-xs"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238888a8' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="Technical" className="bg-[#121214] text-white">
                Technical Interview
              </option>
              <option value="HR" className="bg-[#121214] text-white">
                HR Interview
              </option>
            </select>

            {!analysisDone && (
              <div
                onClick={() => document.getElementById("resumeUpload").click()}
                className="bg-[#121214]/50 border border-dashed border-neutral-800 rounded-xl p-8 text-center cursor-pointer hover:border-[#f2bf3f]/80 transition duration-250 flex flex-col items-center justify-center gap-2"
              >
                <FaFileUpload className="text-3xl text-neutral-500 hover:text-[#f2bf3f] transition-colors" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="text-neutral-400 text-xs mt-1">
                  {resumeFile ? resumeFile.name : "Optional: Click to upload resume"}
                </p>
                {resumeFile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-3 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition bg-[#f2bf3f] hover:bg-[#d9ab2c] text-black cursor-pointer"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </button>
                )}
              </div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-neutral-800 bg-[#121214] rounded-xl p-5 space-y-4 text-xs"
              >
                <h3 className="font-semibold text-neutral-400">
                  Resume Analysis Result
                </h3>

                {projects.length > 0 && (
                  <div>
                    <p className="font-semibold text-neutral-300 mb-1">Parsed Projects:</p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-400">
                      {projects.map((p, i) => (
                        <li key={i} className="truncate">{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="font-semibold text-neutral-300 mb-1">Parsed Skills:</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {skills.map((p, i) => (
                        <li
                          key={i}
                          className="bg-[#f2bf3f]/10 border border-[#f2bf3f]/20 text-[#f2bf3f] px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            <button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              className="w-full mt-4 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer bg-[#f2bf3f] text-[#0c0c0c] hover:opacity-90 disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500"
            >
              {loading ? "Initializing..." : "Start Mock Interview"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Setup;
