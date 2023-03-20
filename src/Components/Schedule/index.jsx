import React, { useState, useEffect } from 'react'
import DatePickerInput from "../../Components/Datepicker/index";
import SubmitBtn from "../../Components/Buttons/submitBtn";
import "../../Assets/Styles/Schedule/schedule.scss";
import axios from 'axios';
import TableHeader from './TableHeader';
import moment from 'moment';

const Schedule = () => {
  const [dateOne, setDateOne] = useState(new Date());
  const [dateTwo, setDateTwo] = useState(new Date());
  const [lunchHallOne, setLunchHallOne] = useState([]);
  const [lunchHallTwo, setLunchHallTwo] = useState([]);
  const [dinnerHallOne, setDinnerHallOne] = useState([]);
  const [dinnerHallTwo, setDinnerHallTwo] = useState([]);
  const [unAvailable, setUnAvailable] = useState(false);

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
          // setLunchHallOne(response.data.lunch[0].Hall1)
          // setDinnerHallOne(response.data.dinner[0].Hall1)
          // setDinnerHallTwo(response.data.dinner[1].Hall2)
          setUnAvailable(true)
          let checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            console.log("0 ma hall 2 for lunch")
            setLunchHallTwo(response.data?.lunch[0].Hall2)
          }

          if ("Hall1" in checkLunch) {
            console.log("0 ma hall 1 for lunch")
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            console.log("0 ma hall 2 for dinner")
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
          }
          if ("Hall1" in checkDInner) {
            console.log("0 ma hall 1 for dinner")
            setDinnerHallOne(response.data?.dinner[0].Hall1)
            setDinnerHallTwo(response.data.dinner[1].Hall2)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dateOne, dateTwo])

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
          console.log(response.data, "response ")
          setUnAvailable(true)

          let checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            console.log("0 ma hall 2 for lunch")
            setLunchHallTwo(response.data?.lunch[0].Hall2)
          }
          if ("Hall1" in checkLunch) {
            console.log("0 ma hall 1 for lunch")
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            console.log("0 ma hall 2 for dinner")
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
          }
          if ("Hall1" in checkDInner) {
            console.log("0 ma hall 1 for dinner")
            setDinnerHallOne(response.data?.dinner[0].Hall1)
            setDinnerHallTwo(response.data.dinner[1].Hall2)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }


    arrayDate.forEach((date) => {
      console.log(date)
    })

    const arrayTestHere= ["Mon, 20 Mar 2023 00:00:00 GMT", "Tue, 21 Mar 2023 00:00:00 GMT", "Fri, 24 Mar 2023 00:00:00 GMT"]
    arrayTestHere.forEach((dateHere)=>{
      const y = lunchHallOne.find(el => el.date === dateHere);
      console.log(y, "here")
    })
    // var index1 = lunchHallOne.indexOf(y);
    // console.log(index1, "index one")

    // const forDinner = dinnerHallTwo.filter(el => el.date === "Tue, 21 Mar 2023 00:00:00 GMT");
    // console.log(forDinner, "here")
    // var index2 = dinnerHallTwo.indexOf(y);
    // console.log(index2, "index two")

    // let convertedDate= getDate.toISOString().substring(0, 10);
    // console.log("converted date", convertedDate)
  }

  // var date = moment();
  // let arrayDate = [];
  // for (let i = 0; i <= 7; i++) {
  //   let tomorrow = date.add(i, 'days');
  //   var result = tomorrow._d.toISOString().substring(0, 10)
  //   arrayDate.push(result)
  //   console.log("array here", arrayDate)
  //   return arrayDate
  // }

  // console.log(days)

  // var myDateVariable = moment(date).format("dddd")

  const getSevenDays = () => {
    let days = [];
    var daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      days.push(moment().add(i, 'days').format('dddd, Do MMMM YYYY'));
    }
    return days;
  }

  console.log(getSevenDays())

  getSevenDays().map((item) => (
    console.log(item, "items")
  ))

  var arrayDate = []
  const ReservationDays = () => {
    lunchHallOne.forEach((item) => {
      let dates = item.date
      arrayDate.push(dates)
      console.log("dates", dates)
      console.log("array of dates", arrayDate)
    })
    return arrayDate
  }
  console.log(ReservationDays(), "<=")

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
              {getSevenDays().map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tr>
            <th>Hall 1</th>
            {lunchHallOne.map((info, index) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.date} {info.customerName} {info.paxCount}</td>
            ))}
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <th>Hall 2</th>
            {lunchHallTwo.map((info) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.date} {info.customerName} {info.paxCount}</td>
            ))}
            <td></td>
            <td> </td>
            <td> </td>
            <td></td>
            <td> </td>
            <td></td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>
      <div className='table-dinner'>
        <p className='dinner'>dinner</p>
        <table className='table-availability'>
          <TableHeader />
          <tr>
            <th>Hall 1</th>
            {dinnerHallOne.map((info) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.customerName} {info.paxCount} {info.date}</td>
            ))}
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tr>
            <th>Hall 2</th>
            {dinnerHallTwo.map((info, index) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.customerName} {info.paxCount} {info.date}</td>
            ))}
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Schedule