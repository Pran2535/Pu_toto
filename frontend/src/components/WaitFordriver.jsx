import React, { useEffect, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import gsap from 'gsap';

const WaitForDriver = ({ vehicle, pickup, destination, onReset }) => {
  const componentRef = useRef(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      componentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  const handleCancelRide = () => {
    setShowCancelDialog(false);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.textContent = 'Ride cancelled successfully!';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('animate-slide-out');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
    gsap.to(componentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => onReset && onReset(),
    });
  };

  return (
    <div ref={componentRef} className="flex flex-col items-center space-y-4 p-4 relative h-1/3">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-lg">
        <img src={vehicle?.img} alt={vehicle?.name} className="w-full h-full object-cover" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Looking for Drivers</h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      <div className="w-full space-y-2 bg-gray-50 p-3 rounded-xl">
        <div className="flex items-start space-x-2">
          <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium break-words">{pickup}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium break-words">{destination}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-yellow-50 p-3 rounded-xl border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-1">Payment Notice</h4>
        <p className="text-yellow-700">Please pay ₹10 to your driver via:</p>
        <div className="mt-1 space-y-1">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-700">• Cash</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-700">• UPI</span>
          </div>
        </div>
        <p className="text-sm text-yellow-600 mt-1">Online payment will be available soon!</p>
      </div>
      <button
        onClick={() => setShowCancelDialog(true)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
      >
        Cancel Ride
      </button>
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 max-w-sm w-full mx-4 animate-dialog-slide-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Cancel Ride</h3>
              <button onClick={() => setShowCancelDialog(false)} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Are you sure you want to cancel this ride?</p>
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                No, Keep Ride
              </button>
              <button
                onClick={handleCancelRide}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes dialog-slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .animate-slide-out {
          animation: slide-out 0.3s ease-in forwards;
        }
        .animate-dialog-slide-in {
          animation: dialog-slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WaitForDriver;
