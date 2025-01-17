import React from "react";
import Logo from '../assets/logo.jpg';
import { MapPin, ArrowDown, Bell, User, CheckCircle, XCircle } from 'lucide-react';
export const Header = () => (
  <div className="absolute left-5 top-5 flex items-center justify-between w-[calc(100%-2.5rem)] z-10">
    <div className="flex items-center gap-2 bg-white p-3 rounded-full shadow-md">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600">
        <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
      </div>
      <span className="text-blue-600 font-bold text-xl">PUTOTO</span>
    </div>
    <div className="flex gap-2">
      <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50">
        <Bell size={24} />
      </button>
      <button className="p-3 bg-white rounded-full shadow-md hover:bg-gray-50">
        <User size={24} />
      </button>
    </div>
  </div>
);