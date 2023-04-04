import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Started from './../Pages/Started/index';
import Schedule from './../Components/Schedule/index';
import Credit from '../Pages/Credit';
import Register from './../Pages/Register/index';
import Navbar from "../Components/Navbar";
// import Login from '../Pages/Login';

const Routing = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/started" element={<Started />} />
        <Route path="/register" element={<Register />} />
        <Route path="/started" element={<Started />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </div>
  )
}

export default Routing