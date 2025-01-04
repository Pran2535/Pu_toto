import React from 'react';
import 'remixicon/fonts/remixicon.css';

const LocationPanel = ({ onSelectLocation }) => {
  const locations = [
    "Uiet Chandigarh, Panjab University South Campus",
    "Uicet Chandigarh, Panjab University North Campus",
    "Ac Joshi Library, Panjab University Student Section",
    "PU Ground Sector 14",
    "Department of Russian, Panjab University",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <button
          key={index}
          onClick={() => onSelectLocation(location)}
          className="flex items-center gap-2 justify-start w-full text-left bg-white hover:bg-gray-100 p-2 rounded-lg transition"
        >
          <div className="bg-[#eee] h-7 my-1 w-10 flex items-center justify-center p-2 rounded-full">
            <i className="ri-map-pin-fill text-xl"></i>
          </div>
          <h4 className="font-medium">{location}</h4>
        </button>
      ))}
    </div>
  );
};

export default LocationPanel;
