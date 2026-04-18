import React from "react";
import { BsRobot } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="flex justify-center px-4 pb-10 bg-black">
      <div className="w-full max-w-7xl rounded-3xl border-b border-t border-[#343740]/25 py-8 px-3 text-center ">
        <div className="flex justify-center items-center gap-3 mb-3 ">
          <div className="bg-white text-black p-2 rounded-lg">
            <BsRobot size={16} />
          </div>
          <h2 className="font-semibold">InterviewIQ.ai</h2>
        </div>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>
      </div>
    </div>
  );
};

export default Footer;
