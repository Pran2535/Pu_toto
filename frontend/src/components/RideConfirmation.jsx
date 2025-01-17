import React from "react"
import { MapPin, ArrowDown, Bell, User, CheckCircle, XCircle } from 'lucide-react';;
export const RideConfirmation = ({ ride, onBack, onConfirm }) => (
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

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  </div>
);