import React from 'react';
import Navbar from "../../Components/Navbar";
import NepaliCalendar from "../../Components/NepaliCalendar";

const AvailableCalendar = () => {
  const nepaliMonths = ["Baisakh", "Jesth", "Ashadh", "Shrawan", "Bhadau", " Ashwin",
    "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"]
  return (
    <div>
      <Navbar />
      <div>
        <label>Month : </label>
        <select>
          <option>Select a month:</option>
          {nepaliMonths.map((months, key)=>(
            <option value={months}>{months}</option>
          ))}
        </select>
      </div>
      <NepaliCalendar />
    </div>
  )
}

export default AvailableCalendar