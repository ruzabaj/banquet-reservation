import React, { useState, useEffect } from 'react'
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import "../../Assets/Styles/Started/started.scss";
import Filter from './Filter';
import SubmitBtn from '../../Components/Buttons/submitBtn';
import Error from '../../Components/Error';
import SideContainer from './../../Components/SideContainer/index';
import { Link } from 'react-router-dom';
import Paginate from '../../Components/Pagination';

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

  useEffect(() => {
    if (errorMessage) {
      setDetailList([])
    }
  }, [errorMessage])

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
      var selectedFirstDate = startDate ?? '';
    }
    else {
      let stringified = startDate.toISOString();
      const date = new Date(stringified);
      const newDate = addOneDay(date);
      var selectedFirstDate = newDate.toISOString().substring(0, 10);
    }

    if (endDate === null) {
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
    <div className='width-flex'>
      <SideContainer />
      <div className='started'>
        <div className='info-reservation'>
          <div className='btn-left'>
            <Link to="/credit">
              <div className='style-btn-credit'>
                <button className='btn-credit'>Show Credit</button>
              </div>
            </Link>
          </div>
          <div className='btn-right'>
            <Link to="/schedule">
              <div className='style-btn-availability'>
                <button className='btn-availability'>Check Availability</button>
              </div>
            </Link>
            <Link to="/">
              <div className='style-btn-reservation'>
                <button className='btn-reservation'>Make a reservation</button>
              </div>
            </Link>
          </div>
        </div>
        <Filter
          handleBtnChange={handleBtnChange}
          handleCustomerName={handleCustomerName}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <div className='message'>
          <Error messageName={'error'} errorMessage={errorMessage} />
        </div>
        <div className='btn-filter' >
          <SubmitBtn event={"Filter"} handle={handleFilter} />
        </div>
        <AccordionDetail detailList={detailList} />
        <Paginate data={detailList}/>
      </div>
    </div>
  )
}

export default Started