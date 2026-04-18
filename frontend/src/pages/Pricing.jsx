import { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import ShinyText from "../components/BitsComponents/ShinyText";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch();  
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount = plan.id === "basic" ? 100 : plan.id === "pro" ? 500 : 0;
      const result = await axios.post(
        serverUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        { withCredentials: true },
      );
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async (response) => {
          const verifyPay = await axios.post(
            serverUrl + "/api/payment/verify",
            response,
            { withCredentials: true },
          );
          
          dispatch(setUserData(verifyPay.data.user));
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/");
        },
        theme: {
          color: "#8746e9db",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoadingPlan(null);
    } catch (error) {
      console.log(error);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen py-5 px-6  ">
      <div className="max-w-6xl mx-auto mb-10 flex items-start gap-4">
        <button
          onClick={() => navigate("/")}
          className="mt-1 p-3 rounded-3xl transition bg-white text-black cursor-pointer hover:bg-white/80">
          <FaArrowLeft />
        </button>
        <div className="flex flex-col items-center w-full bg-[#08060d] border border-[#3b3440]/40 rounded-4xl p-7">
          <div className="flex items-center gap-2 rounded-full border border-white/20 border-t-[#4508a2db] bg-[#19171f]  px-5 py-2 ">
            <span className="size-1.5 rounded-full bg-[#8746e9db]"></span>
            <p className="text-base text-white">Choose your Plan</p>
          </div>
          <h1 className="text-lg text-gray-400 mt-3">
            Flexible pricing to match your interview preparation goals
          </h1>
        </div>
      </div>
      <div className="max-w-6xl grid lg:grid-cols-3 gap-5 mx-auto">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              className=" border border-neutral-700/40 p-1.5 rounded-4xl"
              whileHover={!plan.default && { scale: 1.03 }}>
              <div
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative h-full rounded-3xl p-8 transition-all duration-300 border border-[#3b3440]/20 bg-[#08060d] flex flex-col
                ${isSelected ? "border-[#4508a2db] " : ""} 
                ${plan.default ? "cursor-default" : "cursor-pointer"} `}>
                {plan.badge && (
                  <div className="absolute top-3 right-3 text-xs px-4 py-1 bg-[#19171f] rounded-full">
                    {plan.badge}
                  </div>
                )}

                {plan.default && (
                  <div className="absolute top-3 right-3 text-xs px-4 py-1 bg-[#19171f] rounded-full">
                    Default
                  </div>
                )}

                <h3 className="text-xl font-semibold text-center mt-3">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    <ShinyText
                      text={plan.price}
                      speed={2}
                      delay={0}
                      color="#b5b5b5"
                      shineColor="#d8b4fe "
                      spread={120}
                      direction="left"
                      yoyo={false}
                      pauseOnHover={false}
                      disabled={false}
                    />
                  </span>
                  <p className="mt-1 text-gray-400">{plan.credits} Credits</p>
                </div>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
                {/* Features */}
                <div className="mt-6 space-y-3 text-left mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-[#4508a2] text-sm" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) {
                        setSelectedPlan(plan.id);
                      } else {
                        handlePayment(plan);
                      }
                    }}
                    className={`w-full mt-auto py-3 rounded-xl font-semibold transition cursor-pointer ${
                      isSelected
                        ? "bg-[#4508a2] text-white hover:opacity-90"
                        : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                    }`}>
                    {loadingPlan === plan.id
                      ? "Processing..."
                      : isSelected
                        ? "Proceed to Pay"
                        : "Select Plan"}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
