import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Home from './components/Home';
import Camera from './components/Camera';
import { Toaster } from 'react-hot-toast';
import ProtectRoutes from './utils/ProtectRoutes';

function App() {
  const token = sessionStorage.getItem("token");
  return (
    <>
    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" replace /> : <Landing />} />
      <Route element={<ProtectRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cam" element={<Camera />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
    <Toaster />
  </>
  );
}

export default App;
