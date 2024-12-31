import React from 'react';
import { Navigate } from 'react-router-dom';

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token is present, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render the protected content if the token exists
  return <>{children}</>;
};

export default CaptainProtectedWrapper;
