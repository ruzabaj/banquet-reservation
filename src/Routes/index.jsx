import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from './../App';
import Started from './../Pages/Started/index';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/started" element={<Started/>} />
    </Routes>
  )
}

export default Routing