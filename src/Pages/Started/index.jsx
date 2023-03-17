import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import DatePickerInput from './../../Components/Datepicker/index';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

const Started = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [detailList, setDetailList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [state, setState] = useState("");
  const [token, setToken] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    axios.post(`${baseUrl}/getStarted`, {
      token: `test`
    })
      .then((response) => {
        console.log(response.data, "get started api")
        setDetailList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  // const [rangeTwo, setRangeTwo] = useState(new Date());
  // let selectedSecondDate = rangeTwo.toISOString().substring(0, 10);
  // const handleRangeOne = (date) => {
  //   setRangeOne(new Date(date))
  // }

  // useEffect(() => {
  //   if (!rangeOne === null) {
  //     console.log(selectedFirstDate, "range one date here")
  //   }
  // }, [rangeOne])

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value)
  }

  const handleBtnChange = (e) => {
    setState(e.target.value)
  }

  function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  
  const handleFilter = () => {
    if (startDate === null) {
      console.log("start date is null")
      var selectedFirstDate = startDate ?? '';
    }
    else {
      let stringified = startDate.toISOString();
      const date = new Date(stringified);
      const newDate = addOneDay(date);
      var selectedFirstDate = newDate.toISOString().substring(0, 10);
    }
  
    if (endDate === null) {
      console.log("start date is null")
      var selectedSecondDate = endDate ?? '';
    }
    else {
      let stringified = endDate.toISOString();
      const date = new Date(stringified);
      const newDate = addOneDay(date);
      var selectedSecondDate = newDate.toISOString().substring(0, 10);
    }

    if (isChecked === false) {
      axios.post(`${baseUrl}/banquetreport`, {
        token: `test`,
        customerName: `${customerName}`,
        state: `${state}`,
        reservationDatestart: `${selectedFirstDate}`,
        reservationDateEnd: `${selectedSecondDate}`,
        reservationForDatestart: "",
        reservationForDateEnd: ""
      })
        .then((response) => {
          console.log(response.data, "filter api reservation date")
          setDetailList(response.data)
        })
        .catch((error) => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
        })
    }
    else {
      axios.post(`${baseUrl}/banquetreport`, {
        token: `test`,
        customerName: `${customerName}`,
        state: `${state}`,
        reservationDatestart: "",
        reservationDateEnd: "",
        reservationForDatestart: `${selectedFirstDate}`,
        reservationForDateEnd: `${selectedSecondDate}`
      })
        .then((response) => {
          console.log(response.data, "filter api for reservation for date")
          setDetailList(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <div>
      <Navbar />
      <div className='info-reservation'>
        <Link to="/">
          <div className='style-btn-reservation'>
            <button className='btn-reservation'>Make a reservation</button>
          </div>
        </Link>
      </div>
      <div className='sort-with checkbox'>
        <div className='flex-filter-sort'>
          <div className='filter-accordions'>
            <label>Filter:</label>
            <div className='btn-radio'>
              <input type="radio" id="Started" name="state" value="Started" onChange={handleBtnChange} />
              <label > Started</label>
            </div>
            <div className='btn-radio'>
              <input type="radio" id="Finalised" name="state" value="Finalised" onChange={handleBtnChange} />
              <label >Finalised</label>
            </div>
            <div className='btn-radio'>
              <input type="radio" id="Cancelled" name="state" value="Cancelled" onChange={handleBtnChange} />
              <label > Cancelled</label>
            </div>
          </div>
          <div className='sort-accordions'>
            <label>Sort By:</label>
            <div className='sorting-input'>
              <input type="text" placeholder="Name/ Outlets" onChange={handleCustomerName} />
            </div>
          </div>
          <div className='date-range-checkbox-accordions'>
            <label> Range :</label>
            <div className='date-range-picker'>
              <div className='start-date'>
                {/* <DatePickerInput selectedDate={rangeOne} setSelectedDate={setRangeOne} /> */}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(new Date(date))}
                  fixedHeight
                />
              </div>
              <div className='end-date'>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
                {/* <DatePickerInput selectedDate={rangeTwo} setSelectedDate={setRangeTwo} /> */}
              </div>
            </div>
            <div className='handle-checkbox'>
              <div className='checkbox-wrapper'>
                {console.log(isChecked, "isChecked")}
                <input type="checkbox" id="reservation" name="reservation" value="Reservation date" onChange={() => setIsChecked(!isChecked)} />
                <label> Search by Reservation For Date</label>
              </div>
            </div>
          </div>
        </div>
        <p className='error'>{errorMessage}</p>
      </div>

      <div className='btn-filter' >
        <button className='filter' onClick={handleFilter}>Filter</button>
      </div>

      <AccordionDetail detailList={detailList} />
    </div>
  )
}

export default Started