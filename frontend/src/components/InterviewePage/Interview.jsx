import { motion } from "motion/react";
import maleVideo from "../../assets/Videos/male-ai.mp4";
import femaleVideo from "../../assets/Videos/female-ai.mp4";
import Timer from "./components/Timer";
import { FaArrowRight, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";

const Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAiPlaying, setIsAiPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  // To get the AI Voices This UseEffect is Created
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female"),
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male"),
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "female" ? femaleVideo : maleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAiPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAiPlaying(false);

        if (isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  // To start the Intropase this useEffect is created
  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`,
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.",
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);
        if (isMicOn) {
          startMic();
        }
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase) {
      return;
    }
    if (!currentQuestion) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  // To handle Mic On and off
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAiPlaying) {
      try {
        recognitionRef.current.start();
      } catch (error) {}
    }
  };
  const stopMic = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {}
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }

    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) {
      return;
    }

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true },
      );

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText(" Alright, Let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) {
        startMic();
      }
    }, 500);
  };

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
    try {
      const result = await axios.post(
        serverUrl + "/api/interview/finish",
        {
          interviewId,
        },
        { withCredentials: true },
      );
      onFinish(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isIntroPhase) {
      return;
    }
    if (!currentQuestion) {
      return;
    }

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  // HTML and CSS
  return (
    <div className="min-h-full py-12 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-6xl min-h-full md:h-[90vh] rounded-[2rem] bg-[#09090b] border border-neutral-800 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl">
        <div className="w-full md:w-[30%] flex flex-col items-center justify-between p-6 space-y-6 border-b md:border-b-0 md:border-r border-neutral-800 bg-[#121214]">
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full rounded-2xl overflow-hidden shadow-[0px_10px_30px_rgba(242,191,63,0.1)] border border-neutral-800">
              <video
                src={videoSource}
                key={videoSource}
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-cover"
              />
            </div>
            {subtitle && (
              <div className="w-full rounded-xl p-4 border border-neutral-800 bg-[#09090b]/50">
                <p className="text-xs sm:text-sm font-medium text-center leading-relaxed text-neutral-300">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
          <div className="w-full rounded-2xl px-5 py-4 space-y-4 border border-neutral-800 bg-[#09090b]/65">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">Interview Status</span>
              {isAiPlaying && (
                <span className="font-semibold text-emerald-400 animate-pulse">
                  AI Speaking
                </span>
              )}
            </div>
            <div className="h-[1px] bg-neutral-800" />
            <div className="flex justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit}
              />
            </div>
            <div className="h-[1px] bg-neutral-800" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {currentIndex + 1}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Current</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white text-opacity-80">
                  {questions.length}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10 relative bg-[#09090b]">
          <h2 className="text-lg font-medium tracking-tight text-white mb-6">
            AI Smart Interview Session
          </h2>
          {!isIntroPhase && (
            <div className="relative mb-6 p-5 border border-neutral-800 bg-[#121214] rounded-2xl">
              <p className="text-[10px] uppercase font-mono tracking-wider mb-2 text-[#f2bf3f]">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <div className="text-sm sm:text-base font-semibold leading-relaxed text-white">
                {currentQuestion?.question}
              </div>
            </div>
          )}
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            placeholder="Type or speak your answer here..."
            className="flex-1 p-5 rounded-2xl outline-none focus:ring-1 focus:ring-[#f2bf3f] transition-all duration-200 border border-neutral-800 bg-[#121214] text-neutral-300 text-sm resize-none"
          />
          {!feedback ? (
            <div className="flex items-center gap-4 mt-6">
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-250 cursor-pointer ${
                  isMicOn 
                    ? "bg-[#a83232] text-white hover:opacity-90" 
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                }`}
              >
                {isMicOn ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaMicrophoneSlash size={20} />
                )}
              </motion.button>
              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting || !answer.trim()}
                whileTap={{ scale: 0.98 }}
                className="disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500 bg-[#f2bf3f] hover:bg-[#d9ab2c] text-[#0c0c0c] transition-all duration-300 flex-1 py-3.5 cursor-pointer text-xs font-bold uppercase tracking-wider h-12 sm:h-14 flex justify-center items-center rounded-full"
              >
                {isSubmitting ? "Submitting Answer..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-5 rounded-2xl border border-neutral-800 bg-[#121214] space-y-4"
            >
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-300">{feedback}</p>
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-full bg-[#f2bf3f] hover:bg-[#d9ab2c] text-[#0c0c0c] transition-all duration-300 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Next Question <FaArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
