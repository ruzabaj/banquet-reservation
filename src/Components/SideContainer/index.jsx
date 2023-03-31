import axios from 'axios';
import React, { useState, useEffect } from 'react'
import SideBarContents from './SideContainerContents';
import "../../Assets/Styles/Schedule/schedule.scss";

const SideContainer = () => {
  const [todaysInfo, setTodayInfo] = useState({})
  const [bothStatistics, setBothStatistics] = useState([]);
  const [dinnerStatistics, setDinnerStatistics] = useState([]);
  const [lunchStatistics, setLunchStatistics] = useState([]);
  const dateToday = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    axios.post(`https://banquet.silverlinepos.com/stats`, {
      token: "test"
    })
      .then((response) => {
        console.log(response.data)
        setTodayInfo(response.data)
        setLunchStatistics(response.data.LunchDetailsjson)
        setDinnerStatistics(response.data.DinnerDetailsjson)
        setBothStatistics(response.data.BothDetailsjson)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <div className='today-info'>
        <p><span>Date : </span>{dateToday}</p>
        <p><span>PAX : </span>{todaysInfo.totalPax}</p>
        <p><span>Reservation Count : </span>{todaysInfo.reservationCount}</p>
      </div>

      <div className='side-container'>
        <SideBarContents todays={todaysInfo} statistics={lunchStatistics} title={"Lunch"} />
        <SideBarContents todays={todaysInfo} statistics={dinnerStatistics} title={"Dinner"} />
        <SideBarContents todays={todaysInfo} statistics={bothStatistics} title={"Both"} />
      </div>
    </div>
  )
}

export default SideContainer