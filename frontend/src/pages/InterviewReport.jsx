import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import Reports from "../components/InterviewePage/Reports";
import ShinyText from "../components/BitsComponents/ShinyText";

const InterviewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/interview/report/" + id,
          { withCredentials: true },
        );
        setReport(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReport();
  }, []);

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

  return <Reports report={report} />;
};

export default InterviewReport;
