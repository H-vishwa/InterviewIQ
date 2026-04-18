import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import Auth from "../pages/Auth";

const AuthModel = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center backdrop-blur-2xl px-4 ">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-12 right-7 text-white hover:text-white/80 cursor-pointer text-xl ">
          <FaTimes size={18} />
        </button>
        <Auth isModel={true} />
      </div>
    </div>
  );
};

export default AuthModel;
