import React, { useState, useEffect } from 'react'
import axios from 'axios';
import StandardDate from './../StandardDate/index';
import { BsPen } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ReactModal from '../Modals';
import AccordionModal from './../Modals/AccordionModal';

const AccordionTable = ({ accord, setDetailList }) => {
  function selectColor(status) {
    switch (status) {
      case 'Started':
        return 'green';
      case 'Finalized':
        return 'purple'
      case 'Cancelled':
        return 'red'
      default:
        return ''
    }
  }
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate();
  let baseUrl = process.env.REACT_APP_BASE_URL;
  let standardReservationFor = new Date(accord.reservationForDate).toISOString().substring(0, 10);

  useEffect(() => {
    let tokenCheck = localStorage.getItem("tokens");
    if (!tokenCheck) {
      navigate('/')
    } else {
      setToken(localStorage.getItem("tokens"))
    }
  }, [])

  const [showEdits, setShowEdits] = useState(false);
  const handleCloseEdit = () => setShowEdits(false);
  const handleShowEdit = () => setShowEdits(true);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleModalClose = () => setShowMessageModal(false);
  const handleModalOpen = () => setShowMessageModal(true);

  const [editAccordion, setEditAccordion] = useState({
    reservationForDate: standardReservationFor,
    TimeSlot: accord.TimeSlot
  })

  const handleInput = (event) => {
    const { id, value } = event.target;
    setEditAccordion({ ...editAccordion, [id]: value })
  }

  const handleEdits = () => {
    handleShowEdit();
  }

  const handleSaveEdit = () => {
    handleCloseEdit();

    axios.post(`${baseUrl}/editStarted`,
      {
        token: `${token}`,
        banquetReservationID: accord.idtblbanquetReservation,
        reservationForDate: editAccordion.reservationForDate,
        TimeSlot: editAccordion.TimeSlot
      }
    )
      .then((response) => {
        // console.log(response.data.success)
        handleModalOpen()
        setMessage(response.data.success)
      })
      .catch((error) => {
        // console.log(error.response.data.error)
        handleModalOpen()
        setMessage(error.response.data.error)
      })

    setTimeout(() => {
      axios.post(`${baseUrl}/getStarted`, {
        token: `${token}`
      })
        .then((response) => {
          // console.log(response.data)
          setDetailList(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, 1000);
  }

  return (
    <div className='responsive-accordion-table'>
      <table>
        <tbody>
          <tr>
            <td className='extend-width-200'>{accord.idtblbanquetReservation}</td>
            <td className='extend-width-200'>{accord.Name}</td>
            <td className='extend-width-pax'>{accord.NoOfPax}</td>
            <td className='extend-width-150'>{accord.Outlet_Name}</td>
            <td className='extend-width' onClick={handleEdits} >{accord.TimeSlot}
              <span><BsPen onClick={handleEdits} /></span>
            </td>
            <td className='extend-width-200'><StandardDate date={accord.reservationDate} /></td>
            <td className='extend-width-200' onClick={handleEdits} ><StandardDate date={accord.reservationForDate} />
              <span><BsPen onClick={handleEdits} /></span>
            </td>
            <td className='extend-width-150'>{accord.hall_names}</td>
            <td style={{ color: selectColor(accord.reservationState) }}>{accord.reservationState}</td>
          </tr>
        </tbody>
      </table>
      <AccordionModal
        edit={showEdits}
        editAccordion={editAccordion}
        handleSaveEdit={handleSaveEdit}
        handleCloseEdit={handleCloseEdit}
        inputChange={handleInput}
      />
      <ReactModal
        show={showMessageModal}
        message={message}
        buttonOne={"Ok"}
        buttonTwo={"Close"}
        handleTarget={handleModalClose}
        handleClose={handleModalClose}
      />
    </div>
  )
}

export default AccordionTable