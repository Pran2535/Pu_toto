import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.jpg';
import TotoImage from '../assets/toto.png';

const Riding = ({ selectedVehicle }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [rideEnded, setRideEnded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const puMessages = [
    "Did you know? PU is ranked among India's top universities! 🎓", 
    "PU's beautiful campus spans over 550 acres of lush greenery! 🌳", 
    "Home to 78 teaching and research departments across 16 faculties! 📚", 
    "PU's alumni include former Prime Ministers and Nobel laureates! ⭐", 
    "Founded in 1882, PU is one of India's oldest universities! 🏛️", 
    "The iconic Student Center is the heart of campus life! 🎉", 
    "PU's library houses over 7 lakh books and manuscripts! 📖", 
    "The Gandhi Bhawan is a architectural marvel worth visiting! 🏛️", 
    "Enjoy the serene atmosphere of Botanical Gardens! 🌺", 
    "Don't miss the evening chai at famous PU Coffee House! ☕"
  ];

  useEffect(() => {
    const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    const messageTimer = setInterval(() => {
      setCurrentMessage(puMessages[Math.floor(Math.random() * puMessages.length)]);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (showToast) setTimeout(() => setShowToast(false), 3000);
  }, [showToast]);

  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const handleEndRide = () => {
    setRideEnded(true);
    setShowToast(true);
    setTimeout(() => navigate("/start"), 2000);
  };

  return (
    <div className="relative">
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg animate-[slideIn_0.5s_ease-out]">
          <div className="flex items-center">
            <div className="text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700 font-medium">Ride Ended Successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 bg-white p-3 rounded-full shadow-md">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600">
          <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-blue-600 font-bold text-xl">PUTOTO</span>
      </div>

      <div className="h-screen w-screen">
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Map" className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-6" style={{ height: "40vh" }}>
        <div className="h-full overflow-y-auto space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={TotoImage} alt="Toto Vehicle" className="w-16 h-16 rounded-full object-cover border-4 border-blue-500" />
              <div>
                <h2 className="text-2xl font-bold">Toto</h2>
                <p className="text-gray-600">₹10 fare within PU</p>
              </div>
            </div>
            <div className="text-3xl font-mono font-bold text-blue-600">{formatTime(elapsedTime)}</div>
          </div>

          {currentMessage && (
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-blue-700 font-medium animate-pulse">{currentMessage}</p>
            </div>
          )}

          <div className="bg-indigo-50 p-4 rounded-xl">
            <h3 className="font-semibold text-indigo-900 mb-2">Ride Safety</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Keep your belongings secure</li>
              <li>• Follow campus speed limits</li>
              <li>• Share ride details with friends if needed</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-yellow-800">Payment Note:</p>
            </div>
            <p className="text-sm text-yellow-700">Pay ₹10 in cash as set by PU authorities for travel within campus.</p>
          </div>

          <button onClick={handleEndRide} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
            End Ride
          </button>

          {rideEnded && (
            <div className="text-center text-green-500 font-semibold animate-pulse">
              Thank you for riding with PUTOTO!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Riding;
