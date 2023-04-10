import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import AccordionTable from '../Table';
import PaymentTable from '../Table/PaymentTable';
import PaymentHistory from './../../Pages/Started/PaymentHistory';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../Assets/Styles/Accordion/accordion.scss";
import { BsPen } from "react-icons/bs";
import ReactModal from '../Modals';

const AccordionDetail = ({ detailList, setDetailList, state, token }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const headerRateDetail = ["Hall", "Rate Name", "Amount", "PAX", "Total"]

    const [rateDetailList, setRateDetailList] = useState([]);
    const [rateDetailAmt, setRateDetailAmt] = useState("");
    const [rateDetailPax, setRateDetailPax] = useState("");
    const [paymentList, setPaymentList] = useState([]);

    const handlePaymentHistory = (reservatorID) => {
        axios.post(`${baseUrl}/rateDetails`,
            {
                banquetReservationID: `${reservatorID}`,
                token: `${token}`
            })
            .then((response) => {
                // console.log(response.data, "rate")
                setRateDetailList(response.data)
                setRateDetailAmt(response.data[0].RateAmount)
                setRateDetailPax(response.data[0].NoOfPax)
            })
            .catch((error) => {
                // console.log(error)
            })

        axios.post(`${baseUrl}/paymentHistory`,
            {
                banquetReservationID: `${reservatorID}`,
                token: `${token}`
            })
            .then((res) => {
                // console.log(res.data, "payment")
                setPaymentList(res.data)
            })
            .catch((error) => {
                // console.log(error)
            })
    }

    const [showEditValues, setShowEditValues] = useState({
        email: "",
        phone: "",
        address: "",
        vatno: "",
        name: "",
    })

    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);

    const handleCloseEditParty = () => setShow(false);
    const handleShowEditParty = () => setShow(true);

    const [showMessage, setShowMessage] = useState(false);

    const handleCloseShowMessage = () => setShowMessage(false);
    const handleOpenShowMessage = () => setShowMessage(true);

    const handleEditBilling = (banquetID) => {
        console.log(banquetID)
        handleShowEditParty()
    }
    const inputEditChanges = (event) => {
        const { id, value } = event.target;
        setShowEditValues({ ...showEditValues, [id]: value })
    }

    const handleUpdateEditParty = (banquetID) => {
        axios.post(`${baseUrl}/billingParty`, {
            banquetReservationID: `${banquetID}`,
            token: `${token}`,
            email: showEditValues.email,
            phone: showEditValues.phone,
            address: showEditValues.address,
            vatno: showEditValues.vatno,
            name: showEditValues.name,
        })
            .then((response) => {
                console.log(response.data)
                // setErrorMessage(response.data)
                handleOpenShowMessage()
            })
            .catch((error) => {
                console.log(error.response.data.error)
                handleCloseEditParty()
                setErrorMessage(error.response.data.error)
                handleOpenShowMessage()
            })
    }
    return (
        <Accordion defaultActiveKey="0" flush className='style-accordion'>
            <div className='accordion-table-header'>
                <table>
                    <thead>
                        <tr>
                            <th className='extend-width-200'>ID</th>
                            <th className='extend-width-200'>Name</th>
                            <th className='extend-width-pax'>No. of PAX</th>
                            <th className='extend-width-150'>Outlet Selected</th>
                            <th className='extend-width'>Time Slot</th>
                            <th className='extend-width-200'>Reservation Date</th>
                            <th className='extend-width-200'>Reservation For Date</th>
                            <th className='extend-width-150'>Hall Names</th>
                            <th>State</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {detailList.map((accord, index) => (
                <Accordion.Item eventKey={index} key={index} onClick={() => handlePaymentHistory(accord.idtblbanquetReservation)}>
                    <Accordion.Header>
                        <AccordionTable
                            accord={accord}
                            setDetailList={setDetailList} />
                    </Accordion.Header>
                    <Accordion.Body className='accordion-body'>
                        <div className='payment-table'>
                            <label>Rate Details</label>
                            <PaymentTable header={headerRateDetail}
                                rateList={rateDetailList}
                                id={accord.customerID}
                                date={accord.reservationDate}
                                setDetailList={setDetailList}
                                setRateDetailList={setRateDetailList}
                                setRateDetailAmt={setRateDetailAmt}
                                setRateDetailPax={setRateDetailPax}
                                setPaymentList={setPaymentList}
                                customerID={accord.customerID}
                                reservationDate={accord.reservationDate}
                                reservtionID={accord.idtblbanquetReservation}
                            />
                            <button onClick={() => handleEditBilling()}>Edit Billing</button>
                        </div>
                        <div className='payment-history'>
                            <label>Payment History</label>
                            <PaymentHistory
                                paymentList={paymentList}
                                setPaymentList={setPaymentList}
                                customerID={accord.customerID}
                                reservationDate={accord.reservationDate}
                                reservationForDate={accord.reservationForDate}
                                rateDetailPax={rateDetailPax}
                                rateDetailAmt={rateDetailAmt}
                                reservatorID={accord.idtblbanquetReservation}
                                setDetailList={setDetailList}
                                state={state}
                                token={token}
                            />
                        </div>
                    </Accordion.Body>
                    <Modal
                        show={show}
                        onHide={handleCloseEditParty}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit <span><BsPen /></span> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='editable-fields'>
                                <div className='edit-billing'>
                                    <label>Email :</label>
                                    <input type='text' id='email' value={showEditValues.email} onChange={inputEditChanges} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Name : </label>
                                    <input type='text' id='name' value={showEditValues.name} onChange={inputEditChanges} />
                                    <span>Required *</span>
                                </div>
                                <div className='edit-billing'>
                                    <label>Phone : </label>
                                    <input type='text' id='phone' value={showEditValues.phone} onChange={inputEditChanges} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Address : </label>
                                    <input type='text' id='address' value={showEditValues.address} onChange={inputEditChanges} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Vat no : </label>
                                    <input type='text' id='vatno' value={showEditValues.vatno} onChange={inputEditChanges} required />
                                    <span>Required *</span>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditParty}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleUpdateEditParty(accord.idtblbanquetReservation)}>Update</Button>
                        </Modal.Footer>
                    </Modal>

                    <ReactModal
                        show={showMessage}
                        message={errorMessage}
                        buttonOne={"Ok"}
                        buttonTwo={"Close"}
                        handleTarget={handleCloseShowMessage}
                        handleClose={handleCloseShowMessage}
                    />
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default AccordionDetail

