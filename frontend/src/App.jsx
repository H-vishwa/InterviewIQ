import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import Lenis from "lenis";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const InterviewPage = lazy(() => import("./pages/InterviewPage"));
const InterViewHistory = lazy(() => import("./pages/InterViewHistory"));
const InterviewReport = lazy(() => import("./pages/InterviewReport"));

export const serverUrl = import.meta.env.VITE_SERVER_URL;

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
    <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/user/current-user", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    getUser();
  }, [dispatch]);
  return (
    <div className="relative min-h-screen">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/history" element={<InterViewHistory />} />
          <Route path="/report/:id" element={<InterviewReport />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
