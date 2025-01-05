import React, { useRef, useState, useEffect } from 'react';
import { Search, MapPin, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import LocationPanel from '../components/LocationPanel';
import VehiclePanel from '../components/VehiclePanel';
import Logo from '../assets/logo.jpg';

const Start = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const vehiclesRef = useRef(null);

  const isButtonDisabled = !pickup || !destination;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
      setLoading(true);
      setPanelOpen(false);
      await gsap.to(containerRef.current, { height: 'auto', borderRadius: '24px 24px 0 0', duration: 0.5 });
      await gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.4 });
      setFormSubmitted(true);
      setLoading(false);
      gsap.to(vehiclesRef.current, { opacity: 1, y: 0, duration: 0.4 });
    }
  };

  useEffect(() => {
    gsap.to(containerRef.current, {
      height: panelOpen ? '100%' : 'auto',
      borderRadius: panelOpen ? '0' : '24px 24px 0 0',
      duration: 0.5,
    });
  }, [panelOpen]);

  const resetForm = () => {
    setPickup('');
    setDestination('');
    setFormSubmitted(false);
    gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.4 });
  };

  return (
    <div className="h-screen relative bg-gray-100">
      <div className="absolute left-5 top-5 flex items-center gap-2 bg-white p-3 rounded-full shadow-md">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-600"><img src={Logo} alt="Logo" className="w-full h-full object-cover" /></div>
        <span className="text-blue-600 font-bold text-xl">PUTOTO</span>
      </div>
      <div className="h-screen w-screen"><img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Map" className="w-full h-full object-cover" /></div>
      <div ref={containerRef} className="absolute bottom-0 left-0 w-full bg-white shadow-lg rounded-t-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-bold text-gray-800">{formSubmitted ? 'Choose a Vehicle' : 'Find a Ride'}</h4>
            {!loading && !formSubmitted && <button onClick={() => setPanelOpen(!panelOpen)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowDown className={`transition-transform duration-500 ${panelOpen ? 'rotate-180' : ''}`} /></button>}
          </div>
          {loading && <div className="flex justify-center items-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}
          <form ref={formRef} onSubmit={submitHandler} className={`space-y-4 ${formSubmitted || loading ? 'hidden' : ''}`}>
            <div className="space-y-3">
              {['pickup', 'destination'].map((type) => (
                <div key={type} className="relative">
                  <input value={type === 'pickup' ? pickup : destination} onChange={(e) => (type === 'pickup' ? setPickup(e.target.value) : setDestination(e.target.value))}
                    onFocus={() => { setFocusedInput(type); setPanelOpen(true); }}
                    className={`bg-gray-50 px-12 py-3 text-lg rounded-xl w-full border focus:ring-2 transition-all ${type === 'pickup' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-red-500 focus:ring-red-200'}`}
                    placeholder={`Add a ${type} location`} />
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 ${type === 'pickup' ? 'text-blue-600' : 'text-red-500'}`} size={20} />
                </div>
              ))}
            </div>
            <button type="submit" disabled={isButtonDisabled}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
                ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
              <Search size={20} />Find Rides
            </button>
          </form>
          <div ref={vehiclesRef} className={`space-y-4 ${!formSubmitted ? 'hidden' : ''}`} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <VehiclePanel onReset={resetForm} />
          </div>
        </div>
        {panelOpen && !formSubmitted && !loading && (
          <div className="p-4 bg-gray-50 border-t"><LocationPanel onSelectLocation={(loc) => (focusedInput === 'pickup' ? setPickup(loc) : setDestination(loc))} /></div>
        )}
      </div>
    </div>
  );
};

export default Start;
