import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import gsap from 'gsap';

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const toggleFinishRidePanel = () => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' });
    } else {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' });
    }
    setFinishRidePanel(!finishRidePanel);
  };

  return (
    <div className="h-screen relative flex flex-col justify-end">
      {/* Top Navigation */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Logo"
        />
        <Link to="/captain-home" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Ride Info Section */}
      <div
        className="h-1/5 p-6 flex items-center justify-between bg-yellow-400"
        onClick={toggleFinishRidePanel}
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">{'4 KM away'}</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Panel */}
      <div ref={finishRidePanelRef} className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Finish Ride</h2>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setFinishRidePanel(false)}
          >
            Close
          </button>
        </div>
      </div>

      {/* Live Tracking Map with OpenStreetMap */}
      <div className="h-screen fixed w-screen top-0 z-[-1]">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              Your current location.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default CaptainRiding;
