import React, { useState } from 'react';
import Logo from '../assets/logo.jpg'
import { X, Navigation, Home, Search, User, MapPin, Flag } from 'lucide-react';

const Start = () => {
  const [isFormActive, setIsFormActive] = useState(false);

  const handleInputFocus = () => setIsFormActive(true);
  const handleFormClose = () => setIsFormActive(false);

  return (
    <div className="h-screen w-screen relative bg-gray-100 overflow-hidden">
      {/* Background with Overlay */}
      {!isFormActive && (
        <div className="h-screen w-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />
          <img
            className="h-full w-full object-cover animate-fade-in"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Dynamic Travel Background"
          />
        </div>
      )}

      {/* Logo Section */}
      {!isFormActive && (
        <div className="absolute top-6 left-6 flex items-center space-x-4 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
            <img
              className="w-16 h-16 rounded-full shadow-xl border-2 border-white relative z-10 transform hover:scale-105 transition-all duration-300"
              src={Logo}
              alt="Company Logo"
            />
          </div>
          <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg">
            Putoto
          </span>
        </div>
      )}

      {/* Booking Form */}
      <div
        className={`absolute ${
          isFormActive ? 'top-0 h-screen' : 'bottom-0'
        } w-full bg-white/95 backdrop-blur-md p-8 rounded-t-3xl shadow-2xl z-20 transition-all duration-500 ease-in-out`}
      >
        {isFormActive && (
          <button
            onClick={handleFormClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close form"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        )}
        
        <h4 className={`${
          isFormActive ? 'text-2xl mb-8' : 'text-3xl text-center'
        } font-bold text-gray-800 mb-6`}>
          Find Your Ride
        </h4>

        <form className="space-y-6">
          <div className="relative group">
            <MapPin className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-indigo-600" />
            <input
              type="text"
              placeholder="Add a Pick-up location"
              className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all group-hover:border-indigo-300"
              onFocus={handleInputFocus}
            />
          </div>

          <div className="relative group">
            <Flag className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-indigo-600" />
            <input
              type="text"
              placeholder="Enter your Destination"
              className="w-full pl-12 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all group-hover:border-indigo-300"
              onFocus={handleInputFocus}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold p-4 rounded-xl shadow-lg hover:bg-indigo-700 active:transform active:scale-[0.98] transition-all duration-300"
          >
            Find Ride
          </button>
        </form>
      </div>

      {/* Footer Navigation */}
      {!isFormActive && (
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md p-4 shadow-lg z-20">
          <div className="max-w-md mx-auto flex justify-around items-center">
            <NavButton icon={<Home />} label="Home" active />
            <NavButton icon={<Search />} label="Search" />
            <NavButton icon={<User />} label="Profile" />
          </div>
        </div>
      )}
    </div>
  );
};

const NavButton = ({ icon, label, active }) => (
  <button className="flex flex-col items-center space-y-1 group p-2">
    <div className={`${active ? 'text-indigo-600' : 'text-gray-400'} group-hover:scale-110 transition-all duration-300`}>
      {icon}
    </div>
    <span className={`text-sm font-medium ${active ? 'text-indigo-600' : 'text-gray-600'}`}>
      {label}
    </span>
  </button>
);

export default Start;