import React, { useRef, useState, useEffect, useContext } from 'react';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import LocationPanel from '../components/LocationPanel';
import VehiclePanel from '../components/VehiclePanel';
import WaitForDriver from '../components/WaitFordriver';
import Logo from '../assets/logo.jpg';
import ConfirmVehicle from '../components/ConfirmVehicle';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Start = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWaitForDriver, setShowWaitForDriver] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const vehiclesRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const isButtonDisabled = !pickup || !destination;

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (socket && user) {
      socket.emit('join', { userType: 'user', userId: user._id });
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on('ride-confirmed', (ride) => {
        setVehicleFound(false);
        setWaitingForDriver(true);
        setRide(ride);
      });

      socket.on('ride-started', (ride) => {
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride } });
      });
    }
    return () => {
      if (socket) {
        socket.off('ride-confirmed');
        socket.off('ride-started');
      }
    };
  }, [socket]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setLoading(true);
    setPanelOpen(false);
    await gsap.to(containerRef.current, { height: 'auto', borderRadius: '24px 24px 0 0', duration: 0.5 });
    await gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.4 });
    setFormSubmitted(true);
    setLoading(false);
    gsap.to(vehiclesRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  const handleConfirmAvailability = async (vehicle) => {
    setSelectedVehicle(vehicle);
    await gsap.to(vehiclesRef.current, { opacity: 0, y: -20, duration: 0.4 });
    setShowConfirmation(true);
    gsap.to(confirmRideRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  const resetForm = () => {
    setPickup('');
    setDestination('');
    setFormSubmitted(false);
    setShowConfirmation(false);
    setShowWaitForDriver(false);
    setSelectedVehicle(null);
    setPanelOpen(false);
    gsap.to(containerRef.current, { height: 'auto', borderRadius: '24px 24px 0 0', duration: 0.5 });
    gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  useEffect(() => {
    gsap.to(containerRef.current, { 
      height: panelOpen ? '100%' : 'auto', 
      borderRadius: panelOpen ? '0' : '24px 24px 0 0', 
      duration: 0.5 
    });
  }, [panelOpen]);

  const handleSelectLocation = (location) => {
    if (focusedInput === 'pickup') {
      setPickup(location);
    } else if (focusedInput === 'destination') {
      setDestination(location);
    }
    setPanelOpen(false);
  };

  return (
    <div className="h-screen relative bg-gray-100">
      <div className="absolute left-5 top-5 flex items-center gap-2 bg-white p-3 rounded-full shadow-md">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600">
          <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-blue-600 font-bold text-xl">PUTOTO</span>
      </div>

      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      <div ref={containerRef} className="absolute bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">
              {showWaitForDriver 
                ? 'Finding Your Ride' 
                : showConfirmation 
                ? 'Vehicle Properties' 
                : formSubmitted 
                ? 'Choose a Vehicle' 
                : 'Find a Ride'}
            </h4>
            {!loading && !formSubmitted && (
              <button 
                onClick={() => setPanelOpen(!panelOpen)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowDown className={`transition-transform duration-500 ${panelOpen ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
            </div>
          )}

          <form 
            ref={formRef} 
            onSubmit={submitHandler} 
            className={`space-y-4 ${formSubmitted || loading ? 'hidden' : ''}`}
          >
            {['pickup', 'destination'].map((type) => (
              <div key={type} className="relative">
                <input
                  value={type === 'pickup' ? pickup : destination}
                  onChange={(e) => (type === 'pickup' ? setPickup(e.target.value) : setDestination(e.target.value))}
                  onFocus={() => { 
                    setPanelOpen(true); 
                    setFocusedInput(type); 
                  }}
                  className={`bg-gray-50 px-12 py-3 text-lg rounded-xl w-full border focus:ring-2 transition-all ${
                    type === 'pickup' 
                      ? 'focus:border-blue-500 focus:ring-blue-200' 
                      : 'focus:border-red-500 focus:ring-red-200'
                  }`}
                  placeholder={`Add a ${type} location`}
                />
                <MapPin 
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                    type === 'pickup' ? 'text-blue-600' : 'text-red-500'
                  }`} 
                  size={20} 
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isButtonDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              <Search size={20} /> Find Rides
            </button>
          </form>

          <div 
            ref={vehiclesRef} 
            className={`space-y-4 ${!formSubmitted || showConfirmation || showWaitForDriver ? 'hidden' : ''}`} 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <VehiclePanel onReset={resetForm} onConfirm={handleConfirmAvailability} />
          </div>

          <div 
            ref={confirmRideRef} 
            className={`space-y-4 ${!showConfirmation || showWaitForDriver ? 'hidden' : ''}`} 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <ConfirmVehicle 
              pickup={pickup}
              destination={destination}
              vehicle={selectedVehicle}
              onBack={() => {
                gsap.to(confirmRideRef.current, { 
                  opacity: 0, 
                  y: -20, 
                  duration: 0.4, 
                  onComplete: () => { 
                    setShowConfirmation(false); 
                    setSelectedVehicle(null); 
                    gsap.to(vehiclesRef.current, { opacity: 1, y: 0, duration: 0.4 }); 
                  } 
                });
              }}
              onBook={() => {
                setShowWaitForDriver(true);
                gsap.to(confirmRideRef.current, { 
                  opacity: 0, 
                  y: -20, 
                  duration: 0.3, 
                  onComplete: () => {
                    setShowConfirmation(false);
                    gsap.from(waitForDriverRef.current, { opacity: 0, y: 20, duration: 0.3 });
                  }
                });
              }}
            />
          </div>

          <div 
            ref={waitForDriverRef} 
            className={`transition-opacity duration-300 ${
              showWaitForDriver ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <WaitForDriver 
              vehicle={selectedVehicle} 
              pickup={pickup} 
              destination={destination} 
              onReset={resetForm} 
            />
          </div>
        </div>

        {/* Location Panel */}
        {panelOpen && focusedInput && (
          <div className="p-4 bg-gray-50 border-t">
            <LocationPanel 
              focusedInput={focusedInput}
              onSelectLocation={handleSelectLocation} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;