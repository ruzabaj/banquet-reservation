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
          var checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            setLunchHallOne(response.data?.lunch[1].Hall1)
            setLunchHallTwo(response.data?.lunch[0].Hall2)
          }

          if ("Hall1" in checkLunch) {
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data?.lunch[1].Hall2)
          }

          var checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            setDinnerHallOne(response.data?.dinner[1].Hall1)
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
          }
          if ("Hall1" in checkDInner) {
            setDinnerHallOne(response.data?.dinner[0].Hall1)
            setDinnerHallTwo(response.data?.dinner[1].Hall2)
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
          let checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            setLunchHallTwo(response.data?.lunch[0].Hall2)
            setLunchHallOne(response.data?.lunch[1].Hall1)
          }
          if ("Hall1" in checkLunch) {
            setLunchHallOne(response.data?.lunch[0].Hall1)
            setLunchHallTwo(response.data?.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            setDinnerHallTwo(response.data?.dinner[0].Hall2)
            setDinnerHallOne(response.data?.dinner[1].Hall1)
          }
          if ("Hall1" in checkDInner) {
            setDinnerHallOne(response.data?.dinner[0].Hall1)
            setDinnerHallTwo(response.data?.dinner[1].Hall2)
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
      days.push(moment().add(i, 'days').format('dddd Do MMMM YYYY'));
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
  getWeekDays()

  // const arrayTestHere = getSevenDays()
  // getWeekDays().forEach((dateHere) => {
  //   const y = lunchHallOne.find(el => el.date.substring(0,16) === dateHere);
  //   console.log(y, "here")
  // var index1 = lunchHallOne.indexOf(y);
  // console.log(index1, "index one")
  //   return y
  // })



  // var arrayDate = []
  // const ReservationDays = () => {
  //   lunchHallOne.forEach((item) => {
  //     let dates = item.date
  //     console.log(dates.substring(0, 12), "watch")
  //     let conversionOfDate = new Date(dates).toISOString().substring(0, 10);
  //     arrayDate.push(conversionOfDate)
  //   })
  //   return arrayDate
  // }

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

  // var newArray = [{}]
  // useEffect(() => {
  //   console.log(newArray, "array top")
  //   console.log(compareDate, "compareDate inside use effect")
  //   compareDate.forEach((dateHere) => {
  //     console.log(dateHere, "dateHere")
  //     const replaceObject = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
  //     var index = compareDate.indexOf(replaceObject)
  //     console.log(replaceObject, index, "check")
  //     const deletedArray = newArray.splice(index, 0, replaceObject);
  //     console.log("deleted array", deletedArray)
  //   })
  //   console.log(newArray, "array bottom")
  // }, [lunchHallOne, compareDate, newArray])



  var newArrayLunch = [{}]
  const handleLunchHallOne = () => {
    compareDate.forEach((dateHere) => {
      // console.log(dateHere, "dateHere")
      const replaceObject = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      console.log(replaceObject, index, "check")
      const deletedArray = newArrayLunch.splice(index, 0, replaceObject);
      console.log("deleted array", deletedArray)
      for (var i in newArrayLunch) {
        if (newArrayLunch[i] === undefined) {
          newArrayLunch[i] = {};
        }
      }
    })
    return newArrayLunch;
  }

  var newLunchTwo = [{}]
  const handleLunchHallTwo = () => {
    compareDate.forEach((dateHere) => {
      const replaceObject = lunchHallTwo.find(el => el.date.substring(0, 16) === dateHere)
      var indexs = compareDate.indexOf(replaceObject)
      // console.log(replaceObject, index, "check")
      const deletedArray = newLunchTwo.splice(indexs, 0, replaceObject);
      // console.log("deleted array", deletedArray)
      for (var custom in newLunchTwo) {
        if (newLunchTwo[custom] === undefined) {
          newLunchTwo[custom] = {};
        }
      }
    })
    return newLunchTwo;
  }

  // console.log(handleLunchHallTwo(), "hall two for lunch")

  var newArrayDinnerOne = [{}]
  const handleDinnerHallOne = () => {
    compareDate.forEach((dateHere) => {
      const replaceObject = dinnerHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      // console.log(replaceObject, index, "check")
      const deletedArray = newArrayDinnerOne.splice(index, 0, replaceObject);
      // console.log("deleted array", deletedArray)
      for (var customer in newArrayDinnerOne) {
        if (newArrayDinnerOne[customer] === undefined) {
          newArrayDinnerOne[customer] = {};
        }
      }
    })
    return newArrayDinnerOne;
  }

  var newArrayDinner = [{}]
  const handleDinnerHallTwo = () => {
    compareDate.forEach((dateHere) => {
      const replaceObject = dinnerHallTwo.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      console.log(replaceObject, index, "check")
      const deletedArray = newArrayDinner.splice(index, 0, replaceObject);
      console.log("deleted array", deletedArray)
      for (var customer in newArrayDinner) {
        if (newArrayDinner[customer] === undefined) {
          newArrayDinner[customer] = {};
        }
      }
    })
    return newArrayDinner;
  }

  // console.log(handleDinnerHallTwo(), "dinner-hall-two");

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

  /* {lunchHallOne.map((item) => {
               compareDate.forEach((dateHere) => {
                 const y = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
                 var index = lunchHallOne.indexOf(y);
                 console.log(y, "here", index) */
  /* // const weekdays = lunchHallOne
      // const deletedArray = weekdays.splice(1, index, y);
      // console.log(weekdays, "weekdays");
      // console.log(deletedArray, "deletedArray"); */
  /* return <div>Hi</div>
    })
  })
  } */
  /* {lunchHallOne.forEach((item) => {
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
  })} */

  // console.log(newArrayDinner, "new array dinner")

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
              {showSevenDays().map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Hall 1</th>
              {handleLunchHallOne().map((info, index) => (
                <td className={info.date ? 'unavailable' : 'available'} key={index}> {info.customerName} <p className='pax-count'>{info.paxCount}</p></td>
              ))}
            </tr>
            <tr>
              <th>Hall 2</th>
              {handleLunchHallTwo().map((info, index) => (
                <td className={info.date ? 'unavailable' : 'available'} key={index}>{info.customerName} {info.paxCount}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='table-dinner'>
        <p className='dinner'>dinner</p>
        <table className='table-availability'>
          <th></th>
          {showSevenDays().map((item) => (
            <th>{item}</th>
          ))}
          <tr>
            <th>Hall 1</th>
            {handleDinnerHallOne().map((info, index) => (
              <td className={info.date ? 'unavailable' : 'available'} key={index}>{info.customerName} {info.paxCount}</td>
            ))}
          </tr>
          {/* {dinnerHallTwo.map((info, index) => (
              <td className={unAvailable ? 'unavailable' : 'available'}>{info.customerName} {info.paxCount} {info.date}</td>
            ))} */}
          <tr>
            <th>Hall 2</th>
            {handleDinnerHallTwo().map((info, index) => (
              <td className={info.date ? 'unavailable' : 'available'} key={index}>{info.customerName} {info.paxCount}</td>
            ))}
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Schedule