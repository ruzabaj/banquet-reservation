import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Schedule/schedule.scss";
import axios from 'axios';
import moment from 'moment';
import Availability from './Availability';
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const Schedule = () => {
  const [lunchHallOne, setLunchHallOne] = useState([]);
  const [lunchHallTwo, setLunchHallTwo] = useState([]);
  const [dinnerHallOne, setDinnerHallOne] = useState([]);
  const [dinnerHallTwo, setDinnerHallTwo] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [firstDate, setFirstDate] = useState("");
  const [arrays, setArray] = useState([])

  const [lastDate, setLastDate] = useState("");

  let baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    var startDate = moment().format('YYYY-MM-DD')
    var sevenDaysDate = moment().add(6, 'days').format('YYYY-MM-DD')
    axios.post(`${baseUrl}/schedule`, {
      startDate: `${startDate}`,
      endDate: `${sevenDaysDate}`,
      "token": "test"
    })
      .then((response) => {
        if (response.data.lunch) {
          var checkLunch = response.data.lunch[0]
          if ("Hall2" in checkLunch) {
            setLunchHallTwo(response.data.lunch[0].Hall2)
            if (response.data.lunch[1]) {
              setLunchHallOne(response.data.lunch[1].Hall1)
            }
          }

          if ("Hall1" in checkLunch) {
            setLunchHallOne(response.data.lunch[0].Hall1)
            if (response.data.lunch[1]) {
              setLunchHallTwo(response.data.lunch[1].Hall2)
            }
          }
        }

        if (response.data.dinner) {
          let checkDInner = response.data.dinner[0]
          if ("Hall1" in checkDInner) {
            setDinnerHallOne(response.data.dinner[0].Hall1)
            if (response.data.dinner[1]) {
              setDinnerHallTwo(response.data.dinner[1].Hall2)
            }
          }
          if ("Hall2" in checkDInner) {
            // console.log("Hall2 present in 0 dinner")
            setDinnerHallTwo(response.data.dinner[0].Hall2)
            if (response.data.dinner[1]) {
              setDinnerHallOne(response.data.dinner[1].Hall1)
            }
          }
        }

      })
      .catch((error) => {
        console.log("error in useeffect", error)
      })
  }, [])


  useEffect(() => {
    if (firstDate && lastDate) {
      var start = moment(firstDate).format('YYYY-MM-DD')
      var end = moment(firstDate).add(6, 'days').format('YYYY-MM-DD')
      axios.post(`${baseUrl}/schedule`, {
        startDate: `${start}`,
        endDate: `${end}`,
        "token": "test"
      })
        .then((response) => {
          if (response.data.lunch) {
            if ("Hall2" in response.data.lunch[0]) {
              setLunchHallTwo(response.data.lunch[0].Hall2)
              if (response.data.lunch[1]) {
                setLunchHallOne(response.data.lunch[1].Hall1)
              }
            }
            if ("Hall1" in response.data.lunch[0]) {
              setLunchHallOne(response.data.lunch[0].Hall1)
              if (response.data.lunch[1]) {
                setLunchHallTwo(response.data.lunch[1].Hall2)
              }
            }
          }

          if (response.data.dinner) {
            if ("Hall2" in response.data.dinner[0]) {
              setDinnerHallTwo(response.data.dinner[0].Hall2)
              if (response.data.dinner[1]) {
                setDinnerHallOne(response.data.dinner[1].Hall1)
              }
            }
            if ("Hall1" in response.data.dinner[0]) {
              setDinnerHallOne(response.data.dinner[0].Hall1)
              if (response.data.dinner[1]) {
                setDinnerHallTwo(response.data.dinner[1].Hall2)
              }
            }
          }

        })
        .catch((error) => {
          console.log("error in schedule", error)
        })
    }
  }, [firstDate, lastDate])

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

  //important don't remove

  var testDate = []
  const getTestDays = () => {
    arrays.forEach((datehere) => {
      let newDate= moment(new Date(datehere)).format("ddd, DD MMM YYYY").toString()
      // console.log("=>", newDate)
      testDate.push(newDate)
    })
    return testDate
  }
console.log(getTestDays())

  var newDateLunch = [{}]
  const changedLunchHallOne = () => {
    testDate.forEach((dateHere) => {
      const replaceObject = lunchHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = testDate.indexOf(replaceObject)
      const deletedArray = newDateLunch.splice(index, 0, replaceObject);
      for (var i in newDateLunch) {
        if (newDateLunch[i] === undefined) {
          newDateLunch[i] = {};
        }
      }
    })
    return newDateLunch;
  }


  var newDateDinner = [{}]
  const changedDinnerHallOne = () => {
    testDate.forEach((dateHere, index) => {
      const replaceObjects = dinnerHallOne.find(el => el.date.substring(0, 16) === dateHere)
      var index = testDate.indexOf(replaceObjects)
      const deletedArray = newDateDinner.splice(index, 0, replaceObjects);
      for (var i in newDateDinner) {
        if (newDateDinner[i] === undefined) {
          newDateDinner[i] = {};
        }
      }
    })
    return newDateDinner;
  }

  var newDateLunchTwo = [{}]
  const changedLunchHallTwo = () => {
    testDate.forEach((dateHere) => {
      const replaceObj = lunchHallTwo.find(el => el.date.substring(0, 16) === dateHere)
      var index = testDate.indexOf(replaceObj)
      const deletedArray = newDateLunchTwo.splice(index, 0, replaceObj);
      for (var i in newDateLunchTwo) {
        if (newDateLunchTwo[i] === undefined) {
          newDateLunchTwo[i] = {};
        }
      }
    })
    return newDateLunchTwo;
  }

  var newDateDinnerTwo = [{}]
  const changedDinnerHallTwo = () => {
    testDate.forEach((dateHere) => {
      const replaceObjs = dinnerHallTwo.find(el => el.date.substring(0, 16) === dateHere)
      var index = testDate.indexOf(replaceObjs)
      const deletedArray = newDateDinnerTwo.splice(index, 0, replaceObjs);
      for (var i in newDateDinnerTwo) {
        if (newDateDinnerTwo[i] === undefined) {
          newDateDinnerTwo[i] = {};
        }
      }
    })
    return newDateDinnerTwo;
  }

  const handlePastDays = (startingDate) => {
    console.log("firstDate", firstDate)
    console.log("starting date herne", startingDate)

    setInitialLoad(false)
    const pastSevenDays = () => {
      let testDays = [];
      var daysRequired = 7;
      for (let i = daysRequired; i >= 1; i--) {
        testDays.push(moment(startingDate).subtract(i, 'days').format('dddd, YYYY MMMM D'));
      }
      setFirstDate(testDays[0])
      setLastDate(testDays[6])
      setArray(testDays)
      return testDays;
    }
    return pastSevenDays();
  }

  const handleFutureDays = (endate) => {
    setInitialLoad(false)
    const testSevenDays = () => {
      let testDays = [];
      var daysRequired = 7;
      for (let i = 0; i < daysRequired; i++) {
        testDays.push(moment(endate).add(i, 'days').format('dddd, YYYY MMMM D'));
      }
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
      const deletedArray = newArrayDinner.splice(index, 0, replaceObject);
      for (var customer in newArrayDinner) {
        if (newArrayDinner[customer] === undefined) {
          newArrayDinner[customer] = {};
        }
      }
    })
    return newArrayDinner;
  }

  let initialLoadFirst = moment(getSevenDays()[0])
  // var onFirstLoadPast = initialLoadFirst.format('dddd, YYYY MMMM D');
  var onFirstLoadfuture = getSevenDays()[6];
  var onFirstLoadPast = getSevenDays()[0];

  return (
    <div className="">
      <div className='arrows'>
        <div className='left-arrow'>
          <BiLeftArrowAlt onClick={initialLoad ? () => handlePastDays(onFirstLoadPast) : () => handlePastDays(firstDate)} />
        </div>
        <div className='right-arrow'>
          <BiRightArrowAlt onClick={initialLoad ? () => handleFutureDays(onFirstLoadfuture) : () => handleFutureDays(lastDate)} />
        </div>
      </div>

      {initialLoad ?
        <div className='table-lunch'>
          <p className='lunch'>lunch</p>
          <div className='table-responsive-lunch'>
            <Availability
              headers={initialLoad ? showSevenDays() : arrays}
              dinnerFirst={handleLunchHallOne()} dinnerSecond={handleLunchHallTwo()}
            />
          </div>
        </div>
        :
        <div className='table-lunch'>
          <p className='lunch'>lunch </p>
          <div className='table-responsive-lunch'>
            <Availability headers={initialLoad ? showSevenDays() : arrays}
              dinnerFirst={changedLunchHallOne()} dinnerSecond={changedLunchHallTwo()} />
          </div>
        </div>
      }

      {initialLoad ?
        <div className='table-dinner'>
          <p className="dinner">dinner</p>
          <div className='table-responsive-lunch'>
            <Availability
              headers={initialLoad ? showSevenDays() : arrays}
              dinnerFirst={handleDinnerHallOne()}
              dinnerSecond={handleDinnerHallTwo()} />
          </div>
        </div>
        :
        <div className='table-dinner'>
          <p className="dinner">dinner</p>
          <div className='table-responsive-lunch'>
            <Availability
              headers={initialLoad ? showSevenDays() : arrays}
              dinnerFirst={changedDinnerHallOne()}
              dinnerSecond={changedDinnerHallTwo()} />
          </div>
        </div>
      }
    </div>
  )
}

export default Schedule