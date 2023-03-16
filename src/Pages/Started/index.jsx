import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import DatePickerInput from './../../Components/Datepicker/index';
import { Link } from 'react-router-dom';

const Started = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [detailList, setDetailList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [state, setState] = useState("");
  const [token, setToken] = useState("");

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

  const [rangeOne, setRangeOne] = useState(new Date());
  const [rangeTwo, setRangeTwo] = useState(new Date());
  let selectedFirstDate = rangeOne.toISOString().substring(0, 10);
  let selectedSecondDate = rangeTwo.toISOString().substring(0, 10);

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value)
  }
  const handleBtnChange = (e) => {
    setState(e.target.value)
  }
  const handleFilter = () => {
    axios.post(`${baseUrl}/banquetreport`, {
      token: `test`,
      customerName: `${customerName}`,
      state: `${state}`,
      reservationDate: `${selectedFirstDate}`,
      reservationForDate: `${selectedSecondDate}`,
    })
      .then((response) => {
        console.log(response.data, "filter api")
        setDetailList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
        <div>
          <label> Range :</label>
          <div className='date-range-picker'>
            <div className='start-date'>
              <DatePickerInput selectedDate={rangeOne} setSelectedDate={setRangeOne} />
            </div>
            <div className='end-date'>
              <DatePickerInput selectedDate={rangeTwo} setSelectedDate={setRangeTwo} />
            </div>
          </div>
        </div>
      </div>
      <div className='btn-filter' onClick={handleFilter}>
        <button className='filter'>Filter</button>
      </div>
      <AccordionDetail detailList={detailList} />
    </div>
  )
}

export default Started