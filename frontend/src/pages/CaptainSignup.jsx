import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userData, setUserData] = useState({});
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    const captainData={
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        plate: vehiclePlate,
        color: vehicleColor,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    console.log(userData);
    const response = await axios.post( `${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
if(response.status===201){
  const data = response.data;
  setCaptain(data.captain);
  localStorage.setItem('token',data.token);
  navigate('/captain-home');
}
    // Clear inputs
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <img src={Logo} className="w-16 mb-6" alt="Logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's our captain name</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-gray-200 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              required
              className="bg-gray-200 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's our captain email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Pranav@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Plate Number</h3>
          <input
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="text"
            placeholder="Enter vehicle plate"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Color</h3>
          <select
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className="bg-gray-200 mb-4 rounded px-4 py-2 border w-full text-lg"
          >
            <option value="" disabled>
              Select color
            </option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>

          <h3 className="text-lg font-medium mb-2">Vehicle Type</h3>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="vehicleType"
                value="auto"
                checked={vehicleType === "auto"}
                onChange={(e) => setVehicleType(e.target.value)}
                className="hidden"
              />
              <div
                className={`p-3 border rounded ${
                  vehicleType === "auto" ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <span role="img" aria-label="Auto Rickshaw" className="text-2xl">🛺</span>
                <span>auto</span>
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="vehicleType"
                value="toto"
                checked={vehicleType === "toto"}
                onChange={(e) => setVehicleType(e.target.value)}
                className="hidden"
              />
              <div
                className={`p-3 border rounded ${
                  vehicleType === "toto" ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <span role="img" aria-label="Toto Electric Auto" className="text-2xl">🔋🛺</span>
                <span>toto</span>
              </div>
            </label>
          </div>

          <h3 className="text-lg font-medium mb-1">Vehicle Capacity</h3>
          <input
            required
            value={vehicleCapacity}
            onChange={(e) =>
              setVehicleCapacity(
                Math.min(Math.max(Number(e.target.value), 1), 6)
              )
            }
            className="bg-gray-200 mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="number"
            placeholder="Enter capacity (1-6)"
          />

          <button className="bg-black text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/captain-login"} className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy</span> and terms of service
          apply
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
