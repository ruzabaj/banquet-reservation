import axios from 'axios';
import React, { useState, useEffect } from 'react'
import SideBarContents from './SideContainerContents';
import "../../Assets/Styles/Schedule/schedule.scss";

const SideContainer = ({ token }) => {
  const [todaysInfo, setTodayInfo] = useState({})
  const [bothStatistics, setBothStatistics] = useState([]);
  const [dinnerStatistics, setDinnerStatistics] = useState([]);
  const [lunchStatistics, setLunchStatistics] = useState([]);
  const dateToday = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    if (token) {
      axios.post(`https://banquet.silverlinepos.com/stats`, {
        token: `${token}`
      })
        .then((response) => {
          setTodayInfo(response.data)
          setLunchStatistics(response.data.LunchDetailsjson)
          setDinnerStatistics(response.data.DinnerDetailsjson)
          setBothStatistics(response.data.BothDetailsjson)
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }, [])

  return (
    <div>
      <div className='today-info'>
        <p><span>Date : </span>{dateToday}</p>
        <p><span>No. of Reservation  : </span>{todaysInfo.reservationCount}</p>
        <p><span>Total PAX : </span>{todaysInfo.totalPax}</p>
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