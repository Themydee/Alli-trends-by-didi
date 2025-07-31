import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Confetti from "react-confetti";

const ThankYouForShopping = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle window resizing for full-screen confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 300000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary px-4 text-white text-center relative overflow-hidden">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
      <FaCheckCircle size={80} className="text-green-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-black">Thank You for Shopping!</h1>
      <p className="mb-6 max-w-md">
        Your order has been received and is being processed. We appreciate your support and can’t wait to deliver your items.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/orders">
          <button className="btn-secondary px-6 py-2 rounded-md font-semibold shadow-md">
            View Orders
          </button>
        </Link>

        <Link to="/">
          <button className="bg-Primary text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 hover:text-black">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouForShopping;
