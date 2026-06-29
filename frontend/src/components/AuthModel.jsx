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
    <div 
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-7 text-white hover:text-neutral-300 cursor-pointer text-xl z-20"
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>
        <Auth isModel={true} />
      </div>
    </div>
  );
};

export default AuthModel;
