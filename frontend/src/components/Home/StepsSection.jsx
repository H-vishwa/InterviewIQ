import { motion } from "motion/react";
import { BsClock, BsMic, BsRobot } from "react-icons/bs";
const StepsSection = () => {
  return (
    <div className="mb-28 flex flex-col md:flex-row justify-center items-center gap-10">
      {[
        {
          icon: <BsRobot size={24} />,
          step: "STEP 1",
          title: "Role & Experience Selection",
          desc: "AI adjusts difficulty based on selected job role.",
        },
        {
          icon: <BsMic size={24} />,
          step: "STEP 2",
          title: "Smart Voice Interview",
          desc: "Dynamic follow-up questions based on your answers.",
        },
        {
          icon: <BsClock size={24} />,
          step: "STEP 3",
          title: "Timer Based Simulation",
          desc: "Real interview pressure with time tracking",
        },
      ].map((item, i) => (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 + i * 0.2 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          key={i}
          className={` bg-black hover:bg-black/95 rounded-3xl border border-[#343740]/50 hover:border-[#31343f]/70 p-10 w-95 max-w-[90%] shadow-md md:shadow-2xl transition-all duration-300`}>
          <div className="text-center">
            <div className=" flex items-center justify-center gap-2">
              <div className="px-1 py-1 bg-black/50 flex items-center justify-center shadow-lg ">
                {item.icon}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[10px] md:text-sm tracking-wider text-start font-semibold text-purple-600">
                  {item.step}
                </div>
                <h3 className="text-sm md:text-lg font-semibold mb-3">
                  {item.title}
                </h3>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-500">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StepsSection;
