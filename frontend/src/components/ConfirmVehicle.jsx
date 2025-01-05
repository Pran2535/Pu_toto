import React from 'react';

const ConfirmVehicle = ({ vehicle, onBack, onBook }) => {
  if (!vehicle) {
    return <p className="text-center text-gray-600">No vehicle selected.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg space-y-6">
      {/* Vehicle Details */}
      <div className="flex items-center gap-4">
        <img
          src={vehicle.img}
          alt={vehicle.name}
          className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
        />
        <div>
          <h4 className="font-extrabold text-xl text-gray-800">{vehicle.name}</h4>
          <p className="text-gray-600">
            <span className="font-medium">Availability:</span> {vehicle.availability}%
          </p>
          <p className="text-blue-600 font-semibold text-lg">
            Price: ₹{vehicle.price}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 font-medium">
          <b>Note:</b> Toto and Auto fares are set by the authorities at ₹10 only. No need to pay more when traveling within PU.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all"
        >
          Back
        </button>
        <button
          onClick={onBook}
          className="bg-green-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all"
        >
          Book Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmVehicle;
