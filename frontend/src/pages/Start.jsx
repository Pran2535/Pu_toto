import React, { useRef, useState, useEffect } from 'react';
import Logo from '../assets/logo.jpg';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import LocationPanel from '../components/LocationPanel';
import Auto from '../assets/auto.png';
import Toto from '../assets/toto.png';

const Start = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission state
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePanel = () => setPanelOpen((prev) => !prev);

  const handleLocationSelect = (location) => {
    if (focusedInput === 'pickup') {
      setPickup(location);
    } else if (focusedInput === 'destination') {
      setDestination(location);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (pickup && destination) {
      console.log('Booking ride from', pickup, 'to', destination);
      setFormSubmitted(true); // Trigger the transition to the new options
      setPanelOpen(false); // Close panel only on form submission
    } else {
      // Shaky animation if fields are empty
      gsap.fromTo(
        buttonRef.current,
        { x: 0 },
        { x: 10, repeat: 5, yoyo: true, duration: 0.1 }
      );
    }
  };

  const cancelRide = () => {
    setFormSubmitted(false);
    setPickup('');
    setDestination('');
  };

  // GSAP animation for panel toggle
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut', duration: 0.8 } });

    if (panelOpen) {
      tl.to(contentRef.current, { opacity: 0.3, duration: 0.2 })
        .to(containerRef.current, { height: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 })
        .to(contentRef.current, { opacity: 1, duration: 0.3 });
      document.body.style.overflow = 'hidden';
    } else {
      tl.to(contentRef.current, { opacity: 0.3, duration: 0.2 })
        .to(containerRef.current, { height: 'auto', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' })
        .to(contentRef.current, { opacity: 1, duration: 0.3 });
      document.body.style.overflow = 'auto';
    }
  }, [panelOpen]);

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

      {/* Main Container */}
      <div
        ref={containerRef}
        className="absolute bottom-0 left-0 w-full bg-white shadow-lg overflow-hidden transition-all rounded-t-3xl"
        style={{ height: 'auto', transform: 'translateZ(0)' }}
      >
        <div ref={contentRef} className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">Find a Ride</h4>
            <button onClick={togglePanel} className="p-2 rounded-full hover:bg-gray-100 transition">
              <ArrowDown
                className={`text-gray-600 transition-transform duration-500 ${panelOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </div>

          {!formSubmitted ? (
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-3">
                {/* Pickup Location Input */}
                <div className="relative">
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => {
                      setFocusedInput('pickup');
                      setPanelOpen(true);
                    }}
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
                    onFocus={() => {
                      setFocusedInput('destination');
                      setPanelOpen(true);
                    }}
                    type="text"
                    className="bg-gray-50 px-12 py-3 text-lg rounded-xl w-full border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                    placeholder="Add a drop-off location"
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                ref={buttonRef}
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                disabled={!pickup || !destination}
              >
                <Search size={20} />
                Find Rides
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Display options after form submission */}
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 shadow-md rounded-lg flex items-center gap-3 w-full max-w-md">
                  <img
                    src={Toto}
                    alt="Toto"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Toto</h4>
                    <p className="text-gray-600">Affordable</p>
                    <p className='text-blue-600'>₹10</p>
                  </div>
                  <div className="flex flex-col items-end ml-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-6 bg-green-500 rounded-md"></div>
                      <span className="text-green-500 font-semibold">95%+</span>
                    </div>
                    <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                      Confirm Availability
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex items-center gap-3 w-full max-w-md">
                  <img
                    src={Auto}
                    alt="Auto"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Auto</h4>
                    <p className="text-gray-600">Affordable</p>
                    <p className='text-blue-600'>₹10</p>
                  </div>
                  <div className="flex flex-col items-end ml-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-6 bg-red-500 rounded-md"></div>
                      <span className="text-red-500 font-semibold">20%</span>
                    </div>
                    <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                      Confirm Availability
                    </button>
                  </div>
                </div>
              </div>

              {/* Cancel Ride Button */}
              <div className="flex justify-center">
                <button
                  onClick={cancelRide}
                  className="mt-4 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel Ride
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Location Panel */}
        {panelOpen && !formSubmitted && (
          <div className="p-4 bg-gray-50 border-t">
            <LocationPanel onSelectLocation={handleLocationSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;
