import React from 'react'
import StandardDate from "../StandardDate";

const SideBarContents = ({statistics, title}) => {
  
  return (
    <div className='started-border-bottom'>
      
      {statistics.length >= 1 ?
        statistics.map((stats, index) => (
          <div className='started-border' key={index}>
            <h5>{title}</h5>
            <div className='same-width'>
              <p>Hall Name: </p>
              <span>{stats.HallName}</span>
            </div>
            <div className='same-width'>
              <p>Name : </p>
              <span>{stats.Name}</span>
            </div>
            <div className='same-width'>
              <p>Pax Count: </p>
              <span>{stats.PaxCount}</span>
            </div>
            <div className='same-width'>
              <p>Reservation Date: </p>
              <span className='no-break'><StandardDate date={stats.ReservationCreatedOn} /></span>
            </div>
            <div className='same-width'>
              <p>Advance Payment: </p>
              <span>{stats.advancePayment}</span>
            </div>
            <div className='same-width'>
              <p>Special Request: </p>
              <span>{stats.SpecialRequest}</span>
            </div>
          </div>
        ))
        :
        ""
        }
    </div>
  )
}

export default SideBarContents