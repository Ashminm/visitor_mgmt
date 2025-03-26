import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Home from './components/Home';
import Camera from './components/Camera';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cam' element={<Camera/>} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
