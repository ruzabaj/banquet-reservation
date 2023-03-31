import axios from 'axios';
import React, { useState, useEffect } from 'react'
import SideBarContents from './SideContainerContents';
import "../../Assets/Styles/Schedule/schedule.scss";

const SideContainer = () => {
  const [bothStatistics, setBothStatistics] = useState([]);
  const [dinnerStatistics, setDinnerStatistics] = useState([]);
  const [lunchStatistics, setLunchStatistics] = useState([]);

  useEffect(() => {
    axios.post(`https://banquet.silverlinepos.com/stats`, {
      token: "test"
    })
      .then((response) => {
        console.log(response)
        setLunchStatistics(response.data.LunchDetailsjson)
        setDinnerStatistics(response.data.DinnerDetailsjson)
        setBothStatistics(response.data.BothDetailsjson)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='side-container'>
      <SideBarContents statistics={lunchStatistics} title={"Lunch"}/>
      <SideBarContents statistics={dinnerStatistics} title={"Dinner"}/>
      <SideBarContents statistics={bothStatistics} title={"Both"}/>
    </div>
  )
}

export default SideContainer