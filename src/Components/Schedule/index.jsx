import React, { useState, useEffect } from 'react'
import moment from 'moment';
import DatePickerInput from "../../Components/Datepicker/index";
import SubmitBtn from "../../Components/Buttons/submitBtn";
import "../../Assets/Styles/Schedule/schedule.scss";
import axios from 'axios';

const Schedule = () => {
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  const [dinner, setDinnerList] = useState([]);
  const [lunchList, setLunchList] = useState([]);

  let baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let startDate = dateOne.toISOString().substring(0, 10);
    let endDate = dateTwo.toISOString().substring(0, 10);
    if (startDate && endDate) {
      axios.post(`${baseUrl}/schedule`, {
        startDate: `${startDate}`,
        endDate: `${endDate}`,
        "token": "test"
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const handleAvailability = () => {
    let startDate = dateOne.toISOString().substring(0, 10);
    let endDate = dateTwo.toISOString().substring(0, 10);
    if (startDate && endDate) {
      axios.post(`${baseUrl}/schedule`, {
        startDate: `${startDate}`,
        endDate: `${endDate}`,
        "token": "test"
      })
        .then((response) => {
          console.log(response.data)
          setLunchList(response.data.lunch)
          setDinnerList(response.data.dinner)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  var date = moment();

  let calculateNextDays = (num) => {
    let tomorrow = date.add(num, 'days');
    console.log(tomorrow.format('dddd'));
    let resultDays = tomorrow.format('dddd')
    let result = tomorrow._d.toISOString().substring(0, 10)
    return [ resultDays, result]
  }
  // const [result, resultDays] = calculateNextDays();

  // var myDateVariable = moment(date).format("dddd")

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