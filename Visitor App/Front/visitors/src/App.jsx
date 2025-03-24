import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Home from './components/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path="*" element={<Landing />} />

      </Routes>
    </>
  );
}

export default App;
