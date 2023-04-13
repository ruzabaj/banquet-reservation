import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import AccordionTable from '../Table';
import PaymentTable from '../Table/PaymentTable';
import PaymentHistory from './../../Pages/Started/PaymentHistory';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPen } from "react-icons/bs";
import ReactModal from '../Modals';
import "../../Assets/Styles/Accordion/accordion.scss";
// import EditBilling from '../Modals/EditBilling';

const AccordionDetail = ({ detailList, setDetailList, state, token }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const headerRateDetail = ["Hall", "Rate Name", "Amount", "PAX", "Total"]

    const [rateDetailList, setRateDetailList] = useState([]);
    const [rateDetailAmt, setRateDetailAmt] = useState("");
    const [rateDetailPax, setRateDetailPax] = useState("");
    const [paymentList, setPaymentList] = useState([]);
    const [billingDetail, setBillingDetail] = useState({});
    const [ID, setID] = useState("");

    // console.log(state, "state inside accordion")

    const handlePaymentHistory = (reservatorID) => {
        axios.post(`${baseUrl}/rateDetails`,
            {
                banquetReservationID: `${reservatorID}`,
                token: `${token}`
            })
            .then((response) => {
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
                setPaymentList(res.data)
            })
            .catch((error) => {
                // console.log(error)
            })
            axios.post(`${baseUrl}/banquetreport`, {
                token: `${token}`,
                customerName: "",
                state: `${state}`,
                reservationDatestart: "",
                reservationDateEnd: "",
                reservationForDatestart: "",
                reservationForDateEnd: ""
              })
                .then((response) => {
                  setDetailList(response.data)
                })
                .catch((error) => {
                })
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleCloseEditParty = () => setShow(false);
    const handleShowEditParty = () => setShow(true);

    const handleCloseShowMessage = () => setShowMessage(false);
    const handleOpenShowMessage = () => setShowMessage(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [vatno, setVatno] = useState("")

    const handleEditBilling = (banquetID, detail) => {
        setID(banquetID)
        setBillingDetail(detail)
        handleShowEditParty()
    }

    useEffect(() => {
        if (billingDetail) {
            setAddress(billingDetail.Address);
            setEmail(billingDetail.Email);
            setName(billingDetail.Name);
            setPhone(billingDetail.Phone);
            setVatno(billingDetail.PanNo);
        }
    }, [billingDetail])

    const changeName = (e) => {
        setName(e.target.value);
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const changePhone = (e) => {
        setPhone(e.target.value);
    };
    const changeAddress = (e) => {
        setAddress(e.target.value);
    };
    const changeVatno = (e) => {
        setVatno(e.target.value);
    }

    const handleUpdateEditParty = () => {
        axios.post(`${baseUrl}/billingParty`, {
            banquetReservationID: `${ID}`,
            token: `${token}`,
            email: email || "", 
            phone: phone  || "",
            address: address  || "",
            vatno: vatno  || "",
            name: name  || "",
        })
            .then((response) => {
                handleCloseEditParty()
                setErrorMessage(response.data.success)
                handleOpenShowMessage()
            })
            .catch((error) => {
                handleCloseEditParty()
                setErrorMessage(error.response.data.error)
                handleOpenShowMessage()
            })
        // axios.post(`${baseUrl}/getStarted`, {
        //     token: `${token}`
        // })
        //     .then((response) => {
        //         setDetailList(response.data)
        //     })
        //     .catch((error) => {
        //     })
    }

    const handleRemove = (id) => {
        axios.post(`${baseUrl}/deletebillingParty`, {
            banquetReservationID: `${id}`,
            token: `${token}`
        })
            .then((response) => {
                // console.log(response)
            })
            .catch((error) => {
                // console.log(error)
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
                            <div className='rate-table'>
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
                                <button onClick={() => handleEditBilling(accord.idtblbanquetReservation, accord.billingAddressDetails)} className='btn-edit-billing-info'>
                                    Edit Billing Info
                                </button>
                            </div>
                            {(accord.billingAddressDetails.idtblbilling) &&
                                <div className='billing-info'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>VAT No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{accord.billingAddressDetails.Name}</td>
                                                <td>{accord.billingAddressDetails.Email}</td>
                                                <td>{accord.billingAddressDetails.Phone}</td>
                                                <td>{accord.billingAddressDetails.Address}</td>
                                                <td>{accord.billingAddressDetails.PanNo}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <button className='btn-remove-billing-info' onClick={() => handleRemove(accord.idtblbanquetReservation)}>Remove</button>
                                </div>
                            }
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
                                    <label>Name : </label>
                                    <input type='text'
                                        id='name'
                                        value={name}
                                        onChange={changeName} />
                                    <span>Required *</span>
                                </div>
                                <div className='edit-billing'>
                                    <label>Email :</label>
                                    <input type='text'
                                        id='email'
                                        value={email}
                                        onChange={changeEmail} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Phone : </label>
                                    <input type='text'
                                        id='phone'
                                        value={phone}
                                        onChange={changePhone} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Address : </label>
                                    <input type='text'
                                        id='address'
                                        value={address}
                                        onChange={changeAddress} />
                                </div>
                                <div className='edit-billing'>
                                    <label>Vat no : </label>
                                    <input type='text'
                                        id='vatno'
                                        value={vatno}
                                        onChange={changeVatno} required />
                                    <span>Required *</span>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditParty}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleUpdateEditParty()}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                                {/* <EditBilling/> */}
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