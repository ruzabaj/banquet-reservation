import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Schedule/schedule.scss";
import axios from 'axios';
import moment from 'moment';
import Availability from './Availability';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// import DatePickerInput from "../../Components/Datepicker/index";
// import SubmitBtn from "../../Components/Buttons/submitBtn";

const Schedule = () => {
  const [lunchHallOne, setLunchHallOne] = useState([]);
  const [lunchHallTwo, setLunchHallTwo] = useState([]);
  const [dinnerHallOne, setDinnerHallOne] = useState([]);
  const [dinnerHallTwo, setDinnerHallTwo] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [arrays, setArray] = useState([])

  let baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    var startDate = moment().format('YYYY-MM-DD')
    var sevenDaysDate = moment(startDate).add(7, 'days').format('YYYY-MM-DD')

    if (startDate && sevenDaysDate) {
      axios.post(`${baseUrl}/schedule`, {
        startDate: `${startDate}`,
        endDate: `${sevenDaysDate}`,
        "token": "test"
      })
        .then((response) => {
          var checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            setLunchHallOne(response.data.lunch[1].Hall1)
            setLunchHallTwo(response.data.lunch[0].Hall2)
          }

          if ("Hall1" in checkLunch) {
            setLunchHallOne(response.data.lunch[0].Hall1)
            setLunchHallTwo(response.data.lunch[1].Hall2)
          }

          let checkDInner = response.data.dinner[0]
          if ("Hall2" in checkDInner) {
            setDinnerHallTwo(response.data.dinner[0].Hall2)
            setDinnerHallOne(response.data.dinner[1].Hall1)
          }
          if ("Hall1" in checkDInner) {
            setDinnerHallOne(response.data.dinner[0].Hall1)
            setDinnerHallTwo(response.data.dinner[1].Hall2)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  // const handleAvailability = () => {
  //   let startDate = dateOne.toISOString().substring(0, 10);
  //   let endDate = dateTwo.toISOString().substring(0, 10);
  //   if (startDate && sevenDaysDate) {
  //     axios.post(`${baseUrl}/schedule`, {
  //       startDate: `${startDate}`,
  //       endDate: `${sevenDaysDate}`,
  //       "token": "test"
  //     })
  //       .then((response) => {
  //         let checkLunch = response.data.lunch[0]
  //         if ("Hall2" in checkLunch) {
  //           setLunchHallTwo(response.data.lunch[0].Hall2)
  //           setLunchHallOne(response.data.lunch[1].Hall1)
  //         }
  //         if ("Hall1" in checkLunch) {
  //           setLunchHallOne(response.data.lunch[0].Hall1)
  //           setLunchHallTwo(response.data.lunch[1].Hall2)
  //         }

  //         let checkDInner = response.data.dinner[0]
  //         if ("Hall2" in checkDInner) {
  //           setDinnerHallTwo(response.data.dinner[0].Hall2)
  //           setDinnerHallOne(response.data.dinner[1].Hall1)
  //         }
  //         if ("Hall1" in checkDInner) {
  //           setDinnerHallOne(response.data.dinner[0].Hall1)
  //           setDinnerHallTwo(response.data.dinner[1].Hall2)
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }
  // }

  const showSevenDays = () => {
    let days = [];
    var daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      days.push(moment().add(i, 'days').format('dddd, Do MMMM YYYY'));
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
    })
    return compareDate
  }
  getWeekDays();

  const handlePastDays = (startingDate) => {
    const pastSevenDays = () => {
      let pastDays = [];
      var daysRequired = 7;
      for (let i = daysRequired; i >= 1; i--) {
        pastDays.push(moment(startingDate).subtract(i, 'days').format('MMMM YYYY D'));
      }
      console.log(pastDays, "handled past days")
      setFirstDate(pastDays[1])
      setLastDate(pastDays[6])
      setArray(pastDays)
      return pastDays;
    }
    return pastSevenDays();
  }
  //loop var watchHere = handlePastDays()[0];

  const handleFutureDays = (endate) => {
    setInitialLoad(false)
    const testSevenDays = () => {
      let testDays = [];
      var daysRequired = 7;
      for (let i = 0; i < daysRequired; i++) {
        // testDays.push(moment(endate).add(i, 'days').format('dddd, Do MMMM YYYY'));
        testDays.push(moment(endate).add(i, 'days').format('MMMM YYYY D'));
      }
      console.log(testDays, "handled future days")
      setFirstDate(testDays[0])
      setLastDate(testDays[6])
      setArray(testDays)
      return testDays;
    }
    return testSevenDays();
  }

  var newArrayLunch = [{}]
  const handleLunchHallOne = () => {
    compareDate.forEach((dateHere) => {
      const replaceObject = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      const deletedArray = newArrayLunch.splice(index, 0, replaceObject);
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
      const deletedArray = newLunchTwo.splice(indexs, 0, replaceObject);
      for (var custom in newLunchTwo) {
        if (newLunchTwo[custom] === undefined) {
          newLunchTwo[custom] = {};
        }
      }
    })
    return newLunchTwo;
  }

  var newArrayDinnerOne = [{}]
  const handleDinnerHallOne = () => {
    compareDate.forEach((dateHere) => {
      const replaceObject = dinnerHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = compareDate.indexOf(replaceObject)
      const deletedArray = newArrayDinnerOne.splice(index, 0, replaceObject);
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
      // console.log(replaceObject, index, "check")
      const deletedArray = newArrayDinner.splice(index, 0, replaceObject);
      for (var customer in newArrayDinner) {
        if (newArrayDinner[customer] === undefined) {
          newArrayDinner[customer] = {};
        }
      }
    })
    return newArrayDinner;
  }


  var onFirstLoadPast = getSevenDays()[0];
  var onFirstLoadfuture = getSevenDays()[6];

  return (
    <div className="">
      {/* <div className='filter-availability'>
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
      </div> */}
      <div className='arrows'>
        <div className='left-arrow'>
          <BiLeftArrowAlt onClick={initialLoad ? () => handlePastDays(onFirstLoadPast) : () => handlePastDays(firstDate)} />
        </div>
        <div className='right-arrow'>
          <BiRightArrowAlt onClick={initialLoad ? () => handleFutureDays(onFirstLoadfuture) : () => handleFutureDays(lastDate)} />
        </div>
      </div>

      <div className='table-lunch'>
        <p className='lunch'>lunch</p>
        <div className='table-responsive-lunch'>
          <Availability
            headers={initialLoad ? showSevenDays() : arrays}
            dinnerFirst={handleLunchHallOne()} dinnerSecond={handleLunchHallTwo()}
          />
        </div>
      </div>

      {/* <div className='table-lunch'>
        <p className='lunch'>lunch</p>
        <div className='table-responsive-lunch'>
          <Availability headers={showSevenDays()} dinnerFirst={handleLunchHallOne()} dinnerSecond={handleLunchHallTwo()} />
        </div>
      </div> */}

      <div className='table-dinner'>
        <p className="dinner">dinner</p>
        <div className='table-responsive-lunch'>
          <Availability
            headers={initialLoad ? showSevenDays() : arrays}
            dinnerFirst={handleDinnerHallOne()}
            dinnerSecond={handleDinnerHallTwo()} />
        </div>
      </div>

    </div>
  )
}

export default Schedule