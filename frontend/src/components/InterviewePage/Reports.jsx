import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import ShinyText from "../BitsComponents/ShinyText";

const Reports = ({ report }) => {
  if (!report) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <p className="text-lg bg-[#08060d] p-10 rounded-2xl border border-[#3b3440]/30 ">
          <ShinyText
            text="Loading Report..."
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#9810fa"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </p>
      </div>
    );
  }

  const navigate = useNavigate();
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job oppurtunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvements before Interviews.";
    shortTagline = " Good foundation, Refine articulation.";
  } else {
    performanceText = " Significant improvement required.";
    shortTagline = " Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // =================TITLE===================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(116, 34, 197);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;
    doc.setDrawColor(116, 34, 197);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 10;

    doc.setFillColor(246, 240, 253);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, {
      align: "center",
    });

    currentY += 25;
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}/10`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}/10`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}/10`, margin + 10, currentY + 26);

    currentY += 40;

    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 48;

    // question Table

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["S.no.", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 4,
        valign: "top",
      },
      headStyles: {
        fillColor: [116, 34, 197],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 20, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen mx-12 px-4 md:px-6 py-8 ">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-center">
        <div className=" w-full flex items-start md:items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-3xl transition bg-white text-black cursor-pointer hover:bg-white/80">
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex-nowrap">
              Interview Analytics Dashboard
            </h1>
            <p className="mt-2 ml-1 text-sm text-gray-400 font-semibold">
              AI powered performance insights
            </p>
          </div>
        </div>
        <button
          onClick={downloadPDF}
          className="text-sm md:text-base mt-5 font-bold bg-white hover:bg-white/85 cursor-pointer transition-all duration-300 text-black px-5 py-3 rounded-2xl text-nowrap">
          Download PDF
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-7 text-center rounded-3xl bg-[#08060d] border border-[#3b3440]/40 cursor-pointer">
            <h3 className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>
            <div className="relative w-20 h-20  sm:w-22 sm:h-22 mx-auto mb-3">
              <CircularProgressbar
                value={percentage}
                text={`${score}`}
                styles={buildStyles({
                  textSize: "15px",
                  pathColor: "#4508a2db",
                  textColor: "#fff",
                  trailColor: "#adb5bd",
                })}
              />
            </div>
            <p className="text-gray-400 text-xs mb-3">Out of 10</p>
            <div className="mt-4">
              <p className="font-semibold">{performanceText}</p>
              <p className="text-gray-500 text-sm mt-1">{shortTagline}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-7  rounded-3xl bg-[#08060d] border border-[#3b3440]/40 cursor-pointer">
            <h3 className="text-gray-300 font-bold mb-4 text-lg">
              Skill Evaluation
            </h3>
            <div className="space-y-4">
              {skills.map((item, index) => (
                <div className="" key={index}>
                  <div className="flex  justify-between">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm font-semibold text-[#6634b1]">
                      {item.value}
                    </span>
                  </div>
                  <div className="bg-white rounded-full h-2 mt-1">
                    <div
                      className="h-full rounded-full bg-[#4508a2db]"
                      style={{ width: `${item.value * 10}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-7  rounded-3xl bg-[#08060d] border border-[#3b3440]/40 cursor-pointer">
            <h3 className="text-gray-300 font-bold mb-4 text-lg">
              Performance Trend
            </h3>
            <div className="h-64 md:h-110">
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray={"3 3"} />
                  <XAxis dataKey={"name"} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#14121a",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#ccc" }}
                  />
                  <Area
                    type={"monotone"}
                    dataKey="score"
                    stroke="#4508a2db"
                    fill="#4608a27e"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-7  rounded-3xl bg-[#08060d] border border-[#3b3440]/40 cursor-pointer mt-10">
        <h3 className="text-gray-300 font-bold mb-4 text-lg">
          Question breakdown
        </h3>
        <div className="space-y-4">
          {questionWiseScore.map((q, index) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-[#3b3440]/40 px-5 py-4"
              key={index}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-[12px] mb-2 text-gray-300/50">
                    Question {index + 1}
                  </p>
                  <p className="font-semibold leading-relaxed text-gray-300">
                    {q.question || "Question is not available"}
                  </p>
                </div>
                <div className="px-3 py-2 rounded-lg hover:bg-gray-100/5 ">
                  {q.score ?? 0}/10
                </div>
              </div>

              <div className="p-4 rounded-lg border-2 border-[#4508a2db]/30 bg-[#4508a2db]/5">
                <p className="text-xs font-semibold mb-1 text-[#b27fff] ">
                  AI Feedback
                </p>
                <p className="text-sm leading-relaxed">
                  {q.feedback && q.feedback.trim() !== ""
                    ? q.feedback
                    : "No feedback available for this question"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>{" "}
    </div>
  );
};

export default Reports;
