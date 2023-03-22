import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from './../App';
import Started from './../Pages/Started/index';
import Schedule from './../Components/Schedule/index';
import Credit from '../Pages/Credit';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/started" element={<Started/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/credit" element={<Credit/>} />
    </Routes>
  )
}

export default Routing