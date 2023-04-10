import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Started from './../Pages/Started/index';
import Schedule from './../Components/Schedule/index';
import Credit from '../Pages/Credit';
import Register from './../Pages/Register/index';
import AvailableCalendar from '../Pages/Availability';
// import Login from '../Pages/Login';
import CustomerDetails from "../Pages/CustomerDetails/index";

const Routing = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/started" element={<Started />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/CustomerDetails" element={<CustomerDetails/>} />
        <Route path="/availability" element={<AvailableCalendar />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </div>
  )
}

export default Routing