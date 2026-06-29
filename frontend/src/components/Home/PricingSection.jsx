import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { setUserData } from "../../redux/userSlice";
import AuthModel from "../AuthModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: ".pricing-grid-container",
          start: "top 85%",
        }
      }
    );
  }, []);

  const handlePayment = async (plan) => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    
    // Free plan is default
    if (plan.id === "free") {
      navigate("/interview");
      return;
    }

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
        },
        theme: {
          color: "#f2bf3f",
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

  const plans = [
    {
      id: "free",
      name: "Free Pack",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting their technical interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      buttonStyle: "bg-neutral-100 hover:bg-neutral-200 text-neutral-800",
      buttonText: userData ? "Currently Active" : "Get Started Free"
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused mock practice and targeted skill improvements.",
      features: [
        "150 AI Interview Credits",
        "Detailed Performance Feedback",
        "Advanced Analytics & Graphs",
        "Full Interview History",
      ],
      buttonStyle: "bg-black hover:bg-neutral-800 text-white",
      buttonText: "Buy Starter Pack"
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
      buttonStyle: "bg-[#f2bf3f] hover:bg-[#d9ab2c] text-[#0c0c0c]",
      buttonText: "Upgrade to Pro"
    },
  ];

  return (
    <section id="pricing" className="w-full bg-[#fafaf9] py-24 text-black border-t border-neutral-200/50 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#a83232] font-semibold text-xs md:text-sm tracking-wider uppercase">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 mt-4 font-sans">
            Simple, transparent plans for your prep
          </h2>
          <p className="text-neutral-500 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Choose the package that fits your career goals. Unlock premium mock credits and expert feedback logs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 pricing-grid-container">
          {plans.map((plan, idx) => {
            const isFreeActive = plan.id === "free" && userData;
            return (
              <div
                key={idx}
                className={`pricing-card bg-white rounded-3xl p-8 border flex flex-col justify-between min-h-[460px] relative transition-all duration-300 hover:shadow-lg ${
                  plan.id === "pro" 
                    ? "border-[#f2bf3f] shadow-[0_4px_20px_rgba(242,191,63,0.15)]" 
                    : "border-neutral-200/80 shadow-sm"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 bg-[#f2bf3f]/10 text-[#b38515] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-[#f2bf3f]/30">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">
                    {plan.name}
                  </h3>
                  
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-neutral-950">
                      {plan.price}
                    </span>
                    <span className="text-neutral-500 text-xs font-mono">
                      / {plan.credits} Credits
                    </span>
                  </div>
                  
                  <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-8 space-y-3.5">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="text-[#f2bf3f] text-xs shrink-0" />
                        <span className="text-neutral-600 text-xs font-medium leading-none">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  disabled={loadingPlan === plan.id || isFreeActive}
                  onClick={() => handlePayment(plan)}
                  className={`w-full py-3 mt-8 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isFreeActive 
                      ? "bg-neutral-100 text-neutral-400 cursor-default" 
                      : plan.buttonStyle
                  }`}
                >
                  {loadingPlan === plan.id ? "Processing..." : plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </section>
  );
};

export default PricingSection;
