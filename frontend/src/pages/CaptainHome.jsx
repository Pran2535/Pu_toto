import React, { useRef, useState, useEffect } from 'react';
import { MapPin, ArrowDown, Bell, User, CheckCircle, XCircle } from 'lucide-react';
import gsap from 'gsap';
import { Header } from '../components/header';
import { RideCard } from '../components/Ridecard';
import { RideConfirmation } from '../components/RideConfirmation';
const CaptainHome = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const containerRef = useRef(null);
  const ridesListRef = useRef(null);
  const confirmationRef = useRef(null);

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

  const handleAcceptRide = async (ride) => {
    setSelectedRide(ride);
    await gsap.to(ridesListRef.current, { opacity: 0, y: -20, duration: 0.4 });
    setShowAcceptConfirmation(true);
    gsap.to(confirmationRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  const handleConfirmRide = () => {
    console.log('Ride confirmed:', selectedRide);
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
      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Panel */}
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
    </div>
  );
};

export default CaptainHome;
