import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Test from './../Pages/Test/index';

const OtherRouting = () => {
    return (
        <Routes>
            <Route path="test" element={<Test />} />
        </Routes>
    )
}

export default OtherRouting