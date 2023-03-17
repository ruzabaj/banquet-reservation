import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import DatePickerInput from "../../Components/Datepicker/index";
import SubmitBtn from "../../Components/Buttons/submitBtn";
import "../../Assets/Styles/Schedule/schedule.scss";

const Schedule = () => {
  const [dateOne, setDateOne] = useState(new Date())
  const [dateTwo, setDateTwo] = useState(new Date())

  const handleAvailability = () => {

  }
  // let date = new Date()
  // console.log(date.getDay());
  var date = moment();

  var currentDate = date.format('D/MM/YYYY');
  console.log(currentDate); // "17/06/2022"

  let calculateNextDays=(num)=>{
    let tomorrow  = date.add(num,'days');
    // console.log(tomorrow._d.toISOString().substring(0, 10), "tomorrow", num)
    let result= tomorrow._d.toISOString().substring(0, 10)
    return result
  }
  return (
    <div className="">
      <div className='filter-availability'>
        <div className='pick-start-date'>
          <label> Start : </label>
          <DatePickerInput selectedDate={dateOne} setSelectedDate={setDateOne} />
        </div>
        <div className='pick-end-date'>
          <label> End : </label>
          <DatePickerInput selectedDate={dateTwo} setSelectedDate={setDateTwo} />
        </div>
        <div className='btn-search-availability'>
          <SubmitBtn event={"Search Availability"} handle={handleAvailability} />
        </div>
      </div>
      <div className='table-lunch'>
        <p className='lunch'>lunch</p>
        <table className='table-availability'>
          <thead>
            <tr>
              <th></th>
              <th>{calculateNextDays()}</th>
              <th>{calculateNextDays(1)}</th>
              <th>{calculateNextDays(1)}</th>
              <th>{calculateNextDays(1)}</th>
              <th>{calculateNextDays(1)}</th>
              <th>{calculateNextDays(1)}</th>
              <th>{calculateNextDays(1)}</th>
            </tr>
          </thead>
          <tr>
            <th>Hall 1</th>
            <td>1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
          </tr>
          <tr>
            <th>Hall 2</th>
            <td>1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>
      <div className='table-dinner'>
        <p className='dinner'>dinner</p>
        <table className='table-availability'>
          <thead>
            <tr>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tr>
            <th>Hall 1</th>
            <td>1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
          </tr>
          <tr>
            <th>Hall 2</th>
            <td>1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
            <td> 1</td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Schedule