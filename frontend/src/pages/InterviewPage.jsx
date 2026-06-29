import { useState } from "react";
import Setup from "../components/InterviewePage/Setup";
import Interview from "../components/InterviewePage/Interview";
import Reports from "../components/InterviewePage/Reports";

const InterviewPage = () => {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div className={`relative w-full bg-[#09090b] ${step === 3 ? "min-h-screen overflow-y-auto" : "min-h-screen md:h-screen overflow-y-auto md:overflow-hidden"}`}>
      {/* Background SVG Illustration matching landing page */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_35%] z-0 pointer-events-none bg-[url('https://cdn.prod.website-files.com/67c4d233d927573fcfd45fce/67e0bb11a8c55a4c86b637ca_BG%20ILLO.svg')] opacity-20" 
        aria-hidden="true"
      />
      {/* Blending overlay */}
      <div 
        className="absolute inset-0 bg-zinc-950/40 z-0 pointer-events-none" 
        aria-hidden="true"
      />

      <div className={`relative z-10 w-full ${step === 3 ? "min-h-screen" : "min-h-full md:h-full"}`}>
        {step === 1 && (
          <Setup
            onStart={(data) => {
              setInterviewData(data);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <Interview
            interviewData={interviewData}
            onFinish={(report) => {
              setInterviewData(report);
              setStep(3);
            }}
          />
        )}
        {step === 3 && <Reports report={interviewData} />}
      </div>
    </div>
  );
};

export default InterviewPage;
