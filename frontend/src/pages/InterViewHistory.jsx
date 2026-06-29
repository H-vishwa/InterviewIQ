import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";

const InterViewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/interview/get-interview",
          { withCredentials: true },
        );

        setInterviews(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMyInterviews();
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-[#09090b] py-10 text-white font-sans">
      {/* Background SVG Illustration matching landing page */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_35%] z-0 pointer-events-none bg-[url('https://cdn.prod.website-files.com/67c4d233d927573fcfd45fce/67e0bb11a8c55a4c86b637ca_BG%20ILLO.svg')] opacity-20" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-zinc-950/40 z-0 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[90%] w-[90vw] lg:w-[70vw] mx-auto">
        
        {/* Header */}
        <div className="mb-10 w-full flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-full transition bg-[#121214] border border-neutral-800 text-white cursor-pointer hover:bg-neutral-800"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-xl md:text-3xl font-medium tracking-tight text-white">
              Interview History
            </h1>
            <p className="mt-1 text-xs text-neutral-400 font-mono">
              Past Interviews & Analytics logs
            </p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className="py-16 text-center bg-[#121214] rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 text-sm">No interviews found. Start your first mock session above!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="p-4 bg-[#121214] border border-neutral-800 rounded-2xl transition-all duration-300 cursor-pointer hover:border-[#f2bf3f] shadow-lg flex flex-col justify-between min-h-[190px]"
              >
                <div>
                  <div className="mb-3 bg-[#09090b] px-4 py-3 rounded-xl border border-neutral-800/40">
                    <h3 className="text-sm font-semibold text-white truncate">{item.role}</h3>
                    <p className="text-[10px] text-[#f2bf3f] uppercase font-mono tracking-wider mt-1">
                      {item.mode} • {item.experience}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex flex-col">
                    <p className="text-xs text-neutral-500 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold text-white">
                        {item.finalScore || 0}
                      </span>
                      <span className="text-neutral-500 text-[10px] font-mono">/10</span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      item.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default InterViewHistory;
