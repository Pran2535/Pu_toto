import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/logout`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          localStorage.removeItem('token');
          setUser(null); // Clear user context
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        // Still remove token and redirect even if server request fails
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      }
    };

    performLogout();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Logging out...</h2>
        <p className="text-gray-600">Please wait while we sign you out</p>
      </div>
    </div>
  );
};

export default UserLogout;