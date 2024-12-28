import React from 'react';
import image from '../assets/home.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-full relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt="Auto rickshaw illustration" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer Card */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full bg-white p-6 rounded-t-2xl shadow-up">
          <div className="text-center space-y-3 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">
              Get Started with Putoto
            </h2>
            <p className="text-sm text-gray-600">
              Your journey to a better experience begins here.
            </p>
            <Link to={'/login'}
              className="inline-block w-full bg-lime-600 text-white py-2.5 rounded-full 
                       hover:bg-lime-700 transition duration-300 ease-in-out 
                       transform hover:scale-105"
              type="button"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;