import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import Riding from './components/Riding';
import CaptainRiding from './pages/CaptainRiding';

const App = () => {
  return (
    <Routes>
      {/* Public Routes - Login/Signup only */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />

      {/* Protected User Routes */}
      <Route
        path="/"
        element={
         
            <Home />
          
        }
      />
      <Route
        path="/start"
        element={
          <UserProtectWrapper>
            <Start />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/riding"
        element={
          <UserProtectWrapper>
            <Riding />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />

      {/* Protected Captain Routes */}
      <Route
        path="/captain-home"
        element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }
      />
      <Route
        path="/captain-riding"
        element={
          <CaptainProtectedWrapper>
            <CaptainRiding />
          </CaptainProtectedWrapper>
        }
      />
    </Routes>
  );
};

export default App;