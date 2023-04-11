import React, { useState, useEffect } from 'react'
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';
import "../../Assets/Styles/Filter/filter.scss";
import "../../Assets/Styles/Started/started.scss";
import Filter from './Filter';
import SubmitBtn from '../../Components/Buttons/submitBtn';
import Error from '../../Components/Error';
import SideContainer from './../../Components/SideContainer/index';
import { Link, useNavigate } from 'react-router-dom';
import Paginate from '../../Components/Pagination';
import Navbar from "../../Components/Navbar";

const Started = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [detailList, setDetailList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [state, setState] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let tokenCheck = localStorage.getItem("tokens");
    if (!tokenCheck) {
      navigate('/')
    } else {
      setToken(localStorage.getItem("tokens"))
    }
  }, [])

  useEffect(() => {
    if (token) {
      axios.post(`${baseUrl}/getStarted`, {
        token: `${token}`
      })
        .then((response) => {
          // console.log("get started",response.data)
          setDetailList(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [token])

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
        token: `${token}`,
        customerName: `${customerName}`,
        state: `${state}`,
        reservationDatestart: `${selectedFirstDate}`,
        reservationDateEnd: `${selectedSecondDate}`,
        reservationForDatestart: "",
        reservationForDateEnd: ""
      })
        .then((response) => {
          // console.log(response.data, "filter api reservation date")
          setDetailList(response.data)
          setErrorMessage("")
        })
        .catch((error) => {
          // console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
        })
    }
    else {
      axios.post(`${baseUrl}/banquetreport`, {
        token: `${token}`,
        customerName: `${customerName}`,
        state: `${state}`,
        reservationDatestart: "",
        reservationDateEnd: "",
        reservationForDatestart: `${selectedFirstDate}`,
        reservationForDateEnd: `${selectedSecondDate}`
      })
        .then((response) => {
          setDetailList(response.data)
        })
        .catch((error) => {
          // console.log(error)
        })
    }
  }
  // User is currently on this page
  // No of Records to be displayed on each page   
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = detailList.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(detailList.length / recordsPerPage)

  return (
    <div>
      <Navbar />
      <div className='width-flex'>
        <div className='side-conatiner-lg'>
          <SideContainer token={token}/>
        </div>
        <div className='started'>
          <div className='info-reservation'>
            <div className='btn-left'>
              <Link to="/credit">
                <div className='style-btn-credit'>
                  <button className='btn-credit'>Show Credit</button>
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
          <div className='side-container-small'>
            <SideContainer token={token}/>
          </div>
          <AccordionDetail
            detailList={detailList}
            setDetailList={setDetailList}
            state={state}
            token={token}
          />
          <Paginate
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}

export default Started