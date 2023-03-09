import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import AccordionDetail from './../../Components/Accordion/index';
import axios from 'axios';

const Started = () => {
  let baseUrl = process.env.REACT_APP_BASE_URL;
  const [detailList, setDetailList] = useState([]);

  useEffect(() => {
    axios.post(`${baseUrl}/getStarted`, {
      "token": "test"
    })
      .then((response) => {
        console.log(response.data)
        setDetailList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <AccordionDetail detailList={detailList}/>
    </div>
  )
}

export default Started