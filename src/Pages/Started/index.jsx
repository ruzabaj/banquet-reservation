import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import DatePickerInput from './../../Components/Datepicker/index';

const Started = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [detailList, setDetailList] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    axios.post(`${baseUrl}/getStarted`, {
      "token": `test`
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

  // console.log(rangeOne)
  // console.log(rangeTwo)
  return (
    <div>
      <Navbar />
      <div className='flex-filter-sort'>
        <div className='filter-accordions'>
          <label>Filter:</label>
          <div className='btn-radio'>
            <input type="radio" id="vehicle1" name="vehicle1" value="Started" />
            <label > Started</label>
          </div>
          <div className='btn-radio'>
            <input type="radio" id="vehicle3" name="vehicle3" value="Finalised" />
            <label >Finalised</label>
          </div>
          <div className='btn-radio'>
            <input type="radio" id="vehicle2" name="vehicle2" value="Cancelled" />
            <label > Cancelled</label>
          </div>
        </div>
        <div className='sort-accordions'>
          <label>Sort By:</label>
          <div className='sorting-input'>
            <input type="text" placeholder="Name/ Outlets" />
          </div>
        </div>
        <div className='date-range-picker'>
          <label> Range :</label>
          <div className='start-date'>
            <DatePickerInput selectedDate={rangeOne} setSelectedDate={setRangeOne} />
          </div>
          <div className='end-date'>
            <DatePickerInput selectedDate={rangeTwo} setSelectedDate={setRangeTwo} />
          </div>
        </div>
      </div>
      <div className='btn-filter'>
        <button className='filter'>Filter</button>
      </div>
      <AccordionDetail detailList={detailList} />
    </div>
  )
}

export default Started