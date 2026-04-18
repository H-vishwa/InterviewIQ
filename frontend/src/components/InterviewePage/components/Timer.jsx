import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  return (
    <div className="w-15 h-15">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "20px",
          pathColor: "#4508a2db",
          textColor: "#fff",
          trailColor: "#adb5bd",
        })}
      />
    </div>
  );
};

export default Timer;
