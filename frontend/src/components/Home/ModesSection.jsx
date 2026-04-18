import { motion } from "motion/react";
import confidenceImg from "../../assets/confi.png";
import hrImg from "../../assets/HR.png";
import techImg from "../../assets/tech.png";
import creditImg from "../../assets/credit.png";
const ModesSection = () => {
  return (
    <div className="  bg-center bg-cover px-10 pt-10 pb-20 mb-30">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-semibold text-center mb-16">
        Multiple <span className="text-purple-500">Modes</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:mx-30">
        {[
          {
            img: hrImg,
            title: "HR Interview Mode",
            desc: "Behavioral and communication based evaluation.",
          },
          {
            img: techImg,
            title: "Technical Mode",
            desc: "Deep technical questioning based on selected role.",
          },
          {
            img: confidenceImg,
            title: "Confidence Detection",
            desc: "Basic tone and voice analysis insights.",
          },
          {
            img: creditImg,
            title: "Credits System",
            desc: "Unlock premium interview sessions easily ",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 0.95 }}
            className=" bg-black p-8 shadow-sm hover:shadow-[0px_20px_150px_10px_rgba(106,72,106,0.22)] transition-all  border border-[#343740]/30 rounded-2xl">
            <div className="flex justify-between items-center gap-6">
              <div className="w-2/3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-gray-500 text-sm">
                  {item.desc}
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="md:w-full h-auto object-contain max-h-20"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModesSection;
