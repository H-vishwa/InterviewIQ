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
      <div className="min-h-screen flex justify-center items-center bg-[#09090b]">
        <p className="text-lg bg-[#121214] p-10 rounded-2xl border border-neutral-800">
          <ShinyText
            text="Loading Report..."
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#f2bf3f"
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
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvements before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================= TITLE ===================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(242, 191, 63); // Gold Theme
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;
    doc.setDrawColor(242, 191, 63);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 10;

    doc.setFillColor(254, 252, 243); // Light gold tint
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, {
      align: "center",
    });

    currentY += 25;
    doc.setFillColor(250, 250, 250);
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
        fillColor: [242, 191, 63], // Gold header
        textColor: [12, 12, 12],   // Dark text
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 20, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
      },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-[#09090b] py-8 text-white font-sans">
      {/* Background SVG Illustration matching landing page */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_35%] z-0 pointer-events-none bg-[url('https://cdn.prod.website-files.com/67c4d233d927573fcfd45fce/67e0bb11a8c55a4c86b637ca_BG%20ILLO.svg')] opacity-20" 
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-zinc-950/40 z-0 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 mx-1 md:mx-12 px-4 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/history")}
            className="p-3 rounded-full transition bg-[#121214] border border-neutral-800 text-white cursor-pointer hover:bg-neutral-800"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-xl md:text-3xl font-medium tracking-tight text-white">
              Interview Analytics Dashboard
            </h1>
            <p className="mt-1 text-xs text-neutral-400 font-mono">
              AI powered performance insights
            </p>
          </div>
        </div>
        
        <button
          onClick={downloadPDF}
          className="w-full md:w-fit text-xs font-bold uppercase tracking-wider bg-[#f2bf3f] hover:bg-[#d9ab2c] text-black px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
        >
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-7 text-center rounded-[1.5rem] bg-[#121214] border border-neutral-800 cursor-pointer shadow-lg"
          >
            <h3 className="text-neutral-400 mb-4 sm:mb-6 text-xs uppercase font-mono tracking-wider">
              Overall Performance
            </h3>
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 mx-auto mb-3">
              <CircularProgressbar
                value={percentage}
                text={`${score}`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#f2bf3f", // Gold
                  textColor: "#fff",
                  trailColor: "#27272a",
                })}
              />
            </div>
            <p className="text-neutral-500 text-xs mb-3 font-mono">Out of 10</p>
            <div className="mt-4 border-t border-neutral-800/60 pt-4">
              <p className="font-semibold text-white text-sm">{performanceText}</p>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed">{shortTagline}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="p-7 rounded-[1.5rem] bg-[#121214] border border-neutral-800 cursor-pointer shadow-lg"
          >
            <h3 className="text-neutral-400 mb-6 text-xs uppercase font-mono tracking-wider">
              Skill Evaluation
            </h3>
            <div className="space-y-5">
              {skills.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-neutral-300">{item.label}</span>
                    <span className="font-bold text-[#f2bf3f] font-mono">
                      {item.value}/10
                    </span>
                  </div>
                  <div className="bg-neutral-800 rounded-full h-2">
                    <div
                      className="h-full rounded-full bg-[#f2bf3f]"
                      style={{ width: `${item.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
            className="p-7 rounded-[1.5rem] bg-[#121214] border border-neutral-800 cursor-pointer shadow-lg h-full"
          >
            <h3 className="text-neutral-400 mb-6 text-xs uppercase font-mono tracking-wider">
              Performance Trend
            </h3>
            <div className="h-64 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f2bf3f" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f2bf3f" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                  <YAxis domain={[0, 10]} stroke="#71717a" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0c0c0e",
                      border: "1px solid #27272a",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                    labelStyle={{ color: "#f2bf3f", fontWeight: "bold" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#f2bf3f"
                    fillOpacity={1}
                    fill="url(#colorScore)"
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
        className="p-7 rounded-[1.5rem] bg-[#121214] border border-neutral-800 cursor-pointer mt-8 shadow-lg"
      >
        <h3 className="text-neutral-400 mb-6 text-xs uppercase font-mono tracking-wider">
          Question breakdown
        </h3>
        <div className="space-y-4">
          {questionWiseScore.map((q, index) => (
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-neutral-800 bg-[#09090b]/40 px-5 py-4"
              key={index}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider mb-1 text-neutral-500">
                    Question {index + 1}
                  </p>
                  <p className="font-semibold text-neutral-200 text-sm">
                    {q.question || "Question is not available"}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-[#121214] text-xs font-mono font-bold text-[#f2bf3f]">
                  Score: {q.score ?? 0}/10
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#f2bf3f]/15 bg-[#f2bf3f]/5">
                <p className="text-[10px] uppercase font-mono tracking-wider mb-1 text-[#f2bf3f]">
                  AI Feedback
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {q.feedback && q.feedback.trim() !== ""
                    ? q.feedback
                    : "No feedback available for this question"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Reports;
