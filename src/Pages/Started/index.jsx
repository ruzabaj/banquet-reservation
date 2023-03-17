import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import Filter from './Filter';

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
      <Filter
        handleBtnChange={handleBtnChange}
        handleCustomerName={handleCustomerName}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        errorMessage={errorMessage}
        handleFilter={handleFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <AccordionDetail detailList={detailList} />
    </div>
  )
}

export default Started