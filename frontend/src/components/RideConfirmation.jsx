import React, { useState, useRef } from "react";
import { MapPin, User } from 'lucide-react';

export const RideConfirmation = ({ ride, onBack, onConfirm }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (index > 0 && otp[index] === "") {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current.focus();
      } else if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleConfirm = () => {
    const otpString = otp.join("");
    if (otpString.length === 4) {
      onConfirm(otpString);
    } else {
      setError("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-xl">{ride.passenger}</h4>
            <p className="text-gray-600">Rating: ⭐ {ride.passengerRating}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="text-green-600 mt-1" size={16} />
            <div>
              <p className="text-sm font-medium">Pickup Location</p>
              <p className="text-sm text-gray-600">{ride.pickup}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="text-red-500 mt-1" size={16} />
            <div>
              <p className="text-sm font-medium">Drop Location</p>
              <p className="text-sm text-gray-600">{ride.destination}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Note:</span> Fare is fixed at ₹10 for rides within PU campus as per university guidelines.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Enter 4-digit OTP
          </label>
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                ref={inputRefs[index]}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            ))}
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-6 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
          >
            Confirm Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideConfirmation;