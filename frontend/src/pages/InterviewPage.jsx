import { useState } from "react";
import Setup from "../components/InterviewePage/Setup";
import Interview from "../components/InterviewePage/Interview";
import Reports from "../components/InterviewePage/Reports";

const InterviewPage = () => {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div className="min-h-screen">
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
  );
};

export default InterviewPage;
