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
      className="min-h-screen flex items-center justify-center px-4 my-10">
      <div className="grid md:grid-cols-2 bg-[#08060d] rounded-4xl  overflow-hidden w-full max-w-4xl ">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center py-12 px-10 relative rounded-4xl bg-[#16171d] border border-[#3b3440]/70">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Start Your AI Interview
          </h1>
          <p className="mb-10 text-sm text-gray-400">
            {" "}
            Practice real interview scenarios powered by AI. Improve
            Communication, technical Skills and confidence{" "}
          </p>

          <div className="space-y-3 ">
            {[
              {
                icon: <FaUserTie className="text-xl" />,
                text: " Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt className="text-xl" />,
                text: " Smart Voice Interview",
              },
              {
                icon: <FaChartLine className="text-xl" />,
                text: " Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl shadow-sm flex items-center space-x-4 bg-[#0c0912] cursor-pointer text-purple-500 p-4">
                {item.icon}
                <span className="text-gray-500 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 ">
          <h2 className="mb-8 font-bold text-3xl text-center">
            Interview SetUp
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <FaUserTie className="absolute text-gray-400 top-4 left-4 " />
              <input
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="text"
                placeholder="Enter role"
                className="w-full pl-12 pr-4 py-3 border bg-[#1a1a24] border-gray-300/5 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#3d0e8a] "
              />
            </div>
            <div className="relative">
              <FaBriefcase className="absolute text-gray-400 top-4 left-4 " />
              <input
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                type="text"
                placeholder="Experience (e.g. 2 years)"
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a24] border border-gray-300/5 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#3d0e8a] "
              />
            </div>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-3 px-4 bg-[#1a1a24] text-[#e8e8f0] border border-[#3b3440]/20 rounded-xl outline-none focus:ring-2 focus:ring-[#3d0e8a] focus:border-[#3d0e8a] transition-all duration-200 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238888a8' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}>
              <option
                value="Technical"
                className=" bg-[#1a1a24] text-[#e8e8f0]">
                Technical Interview
              </option>
              <option value="HR" className="bg-[#1a1a24] text-[#e8e8f0]">
                HR Interview
              </option>
            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="bg-[#1a1a24] border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-[#c787ff]/80 transition ">
                <FaFileUpload className="text-4xl mx-auto text-[#c787ff]/80" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden "
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="font-medium">
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      (e.stopPropagation(), handleUploadResume());
                    }}
                    className="mt-4 px-5 py-2 rounded-lg transition bg-white/10 hover:bg-white/5">
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/15  rounded-xl p-5 space-y-4">
                <h3 className="text-lg font-semibold text-gray-400">
                  Resume Analysis Result
                </h3>

                {projects.length > 0 && (
                  <div className="">
                    <p className="font-medium mb-1">Projects:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {projects.map((p, i) => (
                        <li key={i} className="text-sm">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div className="">
                    <p className="font-medium mb-1">Skills:</p>
                    <ul className="flex flex-wrap gap-2">
                      {skills.map((p, i) => (
                        <li
                          key={i}
                          className="bg-pink-100/10 px-3 py-1 rounded-4xl text-xs">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 px-5 py-2 text-lg font-semibold disabled:bg-[#16171d] disabled:text-white border border-[#3b3440]/50 hover:bg-white hover:text-black rounded-lg transition duration-300 cursor-pointer">
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Setup;
