import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa";

const InterViewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async (params) => {
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
    <div className="min-h-screen py-10  ">
      <div className="max-w-[90%] w-[90vw] lg:w-[70vw] mx-auto ">
        <div className="mb-10 w-full flex items-start md:items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="mt-1 p-3 rounded-3xl transition bg-white text-black cursor-pointer hover:bg-white/80">
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex-nowrap">
              Interview History
            </h1>
            <p className="mt-2 ml-1 text-sm text-gray-400 font-semibold">
              Past Interviews & Analytics
            </p>
          </div>
        </div>
        {interviews.length === 0 ? (
          <div className="py-15 text-center bg-[#08060d] rounded-2xl border border-[#3b3440]/40 ">
            <p className="">No Interviews found. Start your First interview.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="p-3 bg-black border border-[#3b3440]/35 rounded-3xl transition-all duration-300 cursor-pointer">
                <div className="flex flex-col mb-12">
                  <div className="mb-2 bg-white/5 px-4 py-3 rounded-2xl">
                    <h3 className="text-xl mb-1 font-semibold">{item.role}</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {item.mode} • {item.experience}
                    </p>
                  </div>
                  <p className="text-[10px] mx-3 text-right">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between mx-4">
                  <div className="flex flex-col justify-center">
                    <p className=" text-emerald-700 text-lg font-extrabold">
                      {item.finalScore || 0}/10
                    </p>
                    <p className="text-white/80 text-xs">Overall Score</p>
                  </div>
                  <span
                    className={`px-3 py-1 mb-3 rounded-full text-xs font-medium
                    ${
                      item.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-600"
                    }
                      `}>
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
