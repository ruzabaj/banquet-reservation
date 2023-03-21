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
          setUnAvailable(true)
          let checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            // console.log("0 ma hall 2 for lunch")
            setLunchHallTwo(response.data?.lunch[0].Hall2)
            setLunchHallOne(response.data.lunch[1].Hall1)
          }

          if ("Hall1" in checkLunch) {
            // console.log("0 ma hall 1 for lunch")
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            // console.log("0 ma hall 2 for dinner")
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
            setDinnerHallOne(response.data?.dinner[1].Hall1)
          }
          if ("Hall1" in checkDInner) {
            // console.log("0 ma hall 1 for dinner")
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
          setUnAvailable(true)

          let checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            setLunchHallTwo(response.data?.lunch[0].Hall2)
            setLunchHallOne(response.data.lunch[1].Hall1)
          }
          if ("Hall1" in checkLunch) {
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
            setDinnerHallOne(response.data?.dinner[1].Hall1)
          }
          if ("Hall1" in checkDInner) {
            setDinnerHallOne(response.data?.dinner[0].Hall1)
            setDinnerHallTwo(response.data.dinner[1].Hall2)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // arrayDate.forEach((date) => {
    //   console.log(date, "eta")
    // })

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


  const showSevenDays = () => {
    let days = [];
    var daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      days.push(moment().add(i, 'days').format('dddd Do MMMM YYYY '));
    }
    return days;
  }

  const getSevenDays = () => {
    let days = [];
    var daysRequired = 8;
    for (let i = 1; i < daysRequired; i++) {
      days.push(moment().add(i, 'days').format('MMMM YYYY D'));
    }
    return days;
  }

  var compareDate = []
  const getWeekDays = () => {
    getSevenDays().forEach((datehere) => {
      var date1 = new Date(datehere).toUTCString()
      var newDate = date1.substring(0, 16)
      compareDate.push(newDate)
      console.log("the date that we compare", compareDate)
    })
    return compareDate
  }

  // const arrayTestHere = getSevenDays()
  // getWeekDays().forEach((dateHere) => {
  //   const y = lunchHallOne.find(el => el.date.substring(0,16) === dateHere);
  //   console.log(y, "here")
  // var index1 = lunchHallOne.indexOf(y);
  // console.log(index1, "index one")
  //   return y
  // })

  getWeekDays()

  var arrayDate = []
  const ReservationDays = () => {
    lunchHallOne.forEach((item) => {
      let dates = item.date
      console.log(dates.substring(0, 12), "watch")
      let conversionOfDate = new Date(dates).toISOString().substring(0, 10);
      arrayDate.push(conversionOfDate)
    })
    return arrayDate
  }

  // lunchHallOne.map((item) => {
  //   compareDate.forEach((dateHere) => {
  //     const y = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
  //     var index = lunchHallOne.indexOf(y);
  //     console.log(y, "here", index)
  //     const deletedArray = lunchHallOne.splice(index, 1, y);
  //     console.log(lunchHallOne, "weekdays");
  //     console.log(deletedArray, "deletedArray");
  //     return <div>Hi</div>
  //   })
  // })

  var newArray = [{}]
  useEffect(() => {
    console.log(newArray, "array top")
    console.log(compareDate, "compareDate inside use effect")
    compareDate.forEach((dateHere) => {
      console.log(dateHere, "dateHere")
      const replaceObject = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      console.log(replaceObject, index, "check")
      const deletedArray = newArray.splice(index, 0, replaceObject);
      console.log("deleted array", deletedArray)
      // return newArray;
    })
    console.log(newArray, "array bottom")
    // const deletedArray = newArray.splice(index, 1, lunchHallOne[0]);
  }, [lunchHallOne, compareDate, newArray])



  var newArrayDinner = [{}]
  const handleDinnerHallTwo=()=>{
    compareDate.forEach((dateHere) => {
      console.log(dateHere, "dateHere")
      const replaceObject = dinnerHallTwo.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      console.log(replaceObject, index, "check")
      const deletedArray = newArrayDinner.splice(index, 0, replaceObject);
      console.log("deleted array", deletedArray)
      for(var i in newArrayDinner) { 
        if(newArrayDinner[i] === undefined) {
          newArrayDinner[i] = {};
        }
      }
    })
    return newArrayDinner; 
  }

  console.log(handleDinnerHallTwo(), "dinner-hall-two");

  // useEffect(() => {
  //   console.log(newArrayDinner, "array top dinner")
  //   console.log(compareDate, "compareDate inside use effect")
  //   compareDate.forEach((dateHere) => {
  //     console.log(dateHere, "dateHere")
  //     const replaceObject = dinnerHallTwo.find(el => el.date.substring(0, 16) === dateHere)
  //     var index = compareDate.indexOf(replaceObject)
  //     console.log(replaceObject, index, "check")
  //     const deletedArray = newArrayDinner.splice(index, 0, replaceObject);
  //     console.log("deleted array", deletedArray)
  //   })
  //   console.log(newArrayDinner, "array bottom dinner")
  // }, [lunchHallOne, compareDate, newArrayDinner])


  console.log(newArrayDinner, "new array dinner")

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
              {showSevenDays().map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          <tr>
            <th>Hall 1</th>
            {lunchHallOne.map((info, index) => (
              <td className={unAvailable ? 'unavailable' : 'available'} key={index}>{info?.date}</td>
            ))}
            {/* {lunchHallOne.map((item) => {
              compareDate.forEach((dateHere) => {
                const y = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
                var index = lunchHallOne.indexOf(y);
                console.log(y, "here", index) */}
            {/* // const weekdays = lunchHallOne
                // const deletedArray = weekdays.splice(1, index, y);
                // console.log(weekdays, "weekdays");
                // console.log(deletedArray, "deletedArray"); */}
            {/* return <div>Hi</div>
              })
            })
            } */}
            {/* {lunchHallOne.forEach((item) => {
              let dates = item.date
              let conversionOfDate = new Date(dates).toISOString().substring(0, 10);
              arrayDate.push(conversionOfDate)
              console.log("array of dates second", arrayDate)
              const arrayTestHere = getWeekDays()
              arrayTestHere.forEach((dateHere) => {
                const y = lunchHallOne.find(el => el.date === dateHere);
                console.log(y, "here")
                return y
              })
            })} */}
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
            {/* {dinnerHallTwo.map((info, index) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.customerName} {info.paxCount} {info.date}</td>
            ))} */}
            {handleDinnerHallTwo().map((info, index) => (
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