import React, { useRef, useState, useEffect } from 'react';
import { MapPin, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate correctly
import gsap from 'gsap';
import { Header } from '../components/header';
import { RideCard } from '../components/Ridecard';
import { RideConfirmation } from '../components/RideConfirmation';

const CaptainHome = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [showPanelAfterDelay, setShowPanelAfterDelay] = useState(false);
  const containerRef = useRef(null);
  const ridesListRef = useRef(null);
  const confirmationRef = useRef(null);
  const navigate = useNavigate(); // Correctly initialized

  const availableRides = [
    {
      id: 1,
      passenger: "John Doe",
      pickup: "Uiet Chandigarh, PU South Campus",
      destination: "AC Joshi Library, PU",
      fare: 10,
      distance: "1.2 km",
      time: "2 mins ago",
      passengerRating: 4.8
    }
  ];

  useEffect(() => {
    gsap.to(containerRef.current, {
      height: panelOpen ? '70%' : 'auto',
      borderRadius: panelOpen ? '0' : '24px 24px 0 0',
      duration: 0.5
    });
  }, [panelOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPanelAfterDelay(true);
    }, 3000); // Show the panel after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptRide = async (ride) => {
    setSelectedRide(ride);
    await gsap.to(ridesListRef.current, { opacity: 0, y: -20, duration: 0.4 });
    setShowAcceptConfirmation(true);
    gsap.to(confirmationRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  const handleConfirmRide = () => {
    console.log('Ride confirmed:', selectedRide);
    navigate('/captain-riding'); // Navigate to the new route
  };

  const handleBack = async () => {
    await gsap.to(confirmationRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setShowAcceptConfirmation(false);
        setSelectedRide(null);
        gsap.to(ridesListRef.current, { opacity: 1, y: 0, duration: 0.4 });
      }
    });
  };

  return (
    <div className="h-screen relative bg-gray-100">
      <Header />

      {/* Map View */}
      <div className="h-screen w-screen relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />

        {/* Driver Name Component */}
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Driver Profile Picture */}
            <img
              src="https://via.placeholder.com/80" // Replace with actual driver image URL
              alt="Driver"
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            {/* Driver Info */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Harsh Patel</h4>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Online:</span>
                <span className="text-gray-800 font-medium">10.2 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Earned:</span>
                <span className="text-green-600 font-semibold">₹295.20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      {showPanelAfterDelay && (
        <div ref={containerRef} className="absolute bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold text-gray-800">
                {showAcceptConfirmation ? 'Confirm Ride' : 'Available Rides'}
              </h4>
              <button
                onClick={() => setPanelOpen(!panelOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowDown className={`transition-transform duration-500 ${panelOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Available Rides List */}
            <div ref={ridesListRef} className={`space-y-4 ${showAcceptConfirmation ? 'hidden' : ''}`}>
              {availableRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} onAccept={handleAcceptRide} />
              ))}
            </div>

            {/* Ride Confirmation */}
            {showAcceptConfirmation && (
              <RideConfirmation
                ref={confirmationRef}
                ride={selectedRide}
                onBack={handleBack}
                onConfirm={handleConfirmRide}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainHome;
