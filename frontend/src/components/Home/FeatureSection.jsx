import { motion } from "motion/react";
import evalImg from "../../assets/ai-ans.png";
import resumeImg from "../../assets/resume.png";
import pdfImg from "../../assets/pdf.png";
import analyticsImg from "../../assets/history.png";
import { BsBarChart, BsFileEarmarkText } from "react-icons/bs";
const FeatureSection = () => {
  return (
    <div className="mb-52">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-semibold text-center mb-16">
        Advanced AI <span className="text-purple-500">Capabilities</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:mx-30">
        {[
          {
            image: evalImg,
            icon: <BsBarChart size={20} />,
            title: "AI Answer Evaluation",
            desc: "Scores communication, technical accuracy and confidence.",
          },

          {
            image: resumeImg,
            icon: <BsFileEarmarkText size={20} />,
            title: "Resume Based Interview",
            desc: "Project-specific questions based on uploaded resume.",
          },
          {
            image: pdfImg,
            icon: <BsFileEarmarkText size={20} />,
            title: "Downloadable PDF Report",
            desc: "Detailed strengths, weaknesses and improvement insights.",
          },
          {
            image: analyticsImg,
            icon: <BsBarChart size={20} />,
            title: "History & Analytics",
            desc: "Track progress with performance graphs and topic analysis.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className=" bg-black p-8 shadow-sm hover:shadow-[0px_20px_150px_10px_rgba(106,72,106,0.22)] transition-all  border border-[#343740]/35 rounded-2xl">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex justify-center w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="md:w-full h-auto object-contain max-h-40"
                />
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex justify-start items-center mb-4">
                  <div className=" text-purple-500 w-12 h-12 flex justify-center items-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="leading-relaxed text-gray-500 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
