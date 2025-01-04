import React, { useRef, useState } from 'react';
import Logo from '../assets/logo.jpg';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import LocationPanel from '../components/LocationPanel';

const Start = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (pickup && destination) {
      console.log('Booking ride from', pickup, 'to', destination);
      setPanelOpen(false); // Close the panel after submission
    }
  };

  // GSAP animation for panel
  React.useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
        duration: 0.5,
        ease: panelOpen ? 'power2.out' : 'power2.in',
      });
    }
  }, [panelOpen]);

  // Handle focus to ensure panel opens when typing
  const handleFocus = () => {
    setPanelOpen(true);
  };

  return (
    <div className="h-screen relative bg-gray-100 font-sans">
      {/* Logo Section */}
      <div className="absolute left-5 top-5 flex items-center gap-2 bg-white p-3 rounded-full shadow-md">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-blue-600 font-bold text-xl">PUTOTO</span>
      </div>

      {/* Map Background */}
      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full p-5">
        <div className="rounded-t-3xl p-6 bg-white relative shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">Find a Ride</h4>
            <button onClick={togglePanel} className="p-2 rounded-full hover:bg-gray-100 transition">
              <ArrowDown
                className={`text-gray-600 transition-transform ${
                  panelOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-3">
              {/* Pickup Location Input */}
              <div className="relative">
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={handleFocus} // Open panel when focused
                  type="text"
                  className="bg-gray-50 px-12 py-3 text-lg rounded-xl w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Add a pickup location"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
              </div>

              {/* Destination Location Input */}
              <div className="relative">
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onFocus={handleFocus} // Open panel when focused
                  type="text"
                  className="bg-gray-50 px-12 py-3 text-lg rounded-xl w-full border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  placeholder="Add a drop-off location"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              disabled={!pickup || !destination}
            >
              <Search size={20} />
              Find Rides
            </button>
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationPanel />
        </div>
      </div>
    </div>
  );
};

export default Start;
