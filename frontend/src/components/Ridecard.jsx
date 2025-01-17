import React from "react";
import { MapPin, ArrowDown, Bell, User, CheckCircle, XCircle } from 'lucide-react';
export const RideCard = ({ ride, onAccept }) => (
  <div className="bg-white p-4 shadow-md rounded-xl space-y-3">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg">{ride.passenger}</h3>
        <p className="text-sm text-gray-500">Rating: ⭐ {ride.passengerRating}</p>
      </div>
      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
        ₹{ride.fare}
      </span>
    </div>

    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <MapPin className="text-green-600 mt-1" size={16} />
        <p className="text-sm text-gray-600">{ride.pickup}</p>
      </div>
      <div className="flex items-start gap-2">
        <MapPin className="text-red-500 mt-1" size={16} />
        <p className="text-sm text-gray-600">{ride.destination}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2">
      <div className="text-sm text-gray-500">
        <span>{ride.distance}</span>
        <span className="mx-2">•</span>
        <span>{ride.time}</span>
      </div>
      <button
        onClick={() => onAccept(ride)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Accept Ride
      </button>
    </div>
  </div>
);
