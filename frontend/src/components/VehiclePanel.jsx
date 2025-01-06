import React from 'react';
import Auto from '../assets/auto.png';
import Toto from '../assets/toto.png';

const VehiclePanel = ({ onReset, onConfirm }) => {
  const vehicles = [
    { name: 'Toto', img: Toto, availability: 95, color: 'green', price: 10 },
    { name: 'Auto', img: Auto, availability: 20, color: 'red', price: 10 },
  ];

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.name}
          onClick={() => onConfirm(vehicle)} // Pass the vehicle to the handler
          className={`bg-white p-4 shadow-md rounded-lg flex items-center gap-3 w-full focus:outline-none focus:ring-2 focus:ring-black`}
        >
          <img src={vehicle.img} alt={vehicle.name} className="w-12 h-12 object-cover rounded-full" />
          <div>
            <h4 className="font-semibold">{vehicle.name}</h4>
            <p className="text-gray-600">Affordable</p>
            <p className="text-blue-600">₹{vehicle.price}</p>
          </div>
          <div className="flex flex-col items-end ml-auto">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-6 bg-${vehicle.color}-500 rounded-md`}></div>
              <span className={`text-${vehicle.color}-500 font-semibold`}>{vehicle.availability}%</span>
            </div>
          </div>
        </button>
      ))}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="mt-4 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default VehiclePanel;
