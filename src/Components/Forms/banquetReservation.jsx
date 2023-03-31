import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Form/banquetReservation.scss";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearchInput from './../SelectSearch/index';
import axios from 'axios';
import DatePickerInput from '../Datepicker';
import SubmitBtn from '../Buttons/submitBtn';
import RateInfo from './rateInfo';
import SpecialRequest from './specialRequest';
import AdvancePayment from './advancePayment';
import AddDeleteTableRows from './AddTable';
import ReactModal from '../Modals';
import { useNavigate } from 'react-router-dom';

const BanquetReservation = ({ customerID }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const [reservationDate, setReservationDate] = useState(new Date());
    const [reservationForDate, setReservationForDate] = useState(new Date());
    const [hallList, setHallList] = useState([]);
    const [selectedHall, setSelectedHall] = useState("");
    const [outletList, setOutletList] = useState([]);
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [showMessage, setShowMessage] = useState("");
    const [showPaymentAdd, setShowPaymentAdd] = useState(false)
    // const [resHall, setResHall] = useState([]);
    // const [detail, setDetail] = useState([]);

    let selectedReservationDate = reservationDate.toISOString().substring(0, 10);
    let selectedReservationForDate = reservationForDate.toISOString().substring(0, 10);

    // console.log("selected hall",  selectedHall);

    useEffect(() => {
        axios.post(`${baseUrl}/halls`, {
            token: "test"
        })
            .then((response) => {
                setHallList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        axios.post(`${baseUrl}/outlets`, {
            token: "test"
        })
            .then((response) => {
                setOutletList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const [values, setValues] = useState({
        NoOfPax: "",
        TimeSlot: "Lunch",
        SpecialRequest: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({
            ...values,
            [id]: value,
        });
    }



    const [rowsData, setRowsData] = useState([]);

    const addTableRows = () => {
        // console.log("selected hall", selectedHall)
        const rowsInput = {
            RateName: '',
            RateAmount: '',
            NoOfPax: '',
            HallName: selectedHall
        }
        setRowsData([...rowsData, rowsInput])
    }

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {
        const { id, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][id] = value;
        setRowsData(rowsInput);
    }

    //for payment
    const todayDate = new Date().toISOString().substring(0, 10);
    const [paymentData, setPaymentData] = useState([]);
    const [selected, setSelected] = useState("");

    const handleSelectChange = (event) => {
        setSelected(event.target.value)
        setShowPaymentAdd(true)
    }

    const addPaymentRows = () => {
        const paymentInput = {
            // paymentDate: todayDate,
            PaymentAmount: "",
            PaymentMode: selected
        }
        setPaymentData([...paymentData, paymentInput])
    }


    const deletePaymentRows = (index) => {
        const rows = [...paymentData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handlePaymentChange = (index, evnt) => {
        const { id, value } = evnt.target;
        const paymentInput = [...paymentData];
        paymentInput[index][id] = value;
        setPaymentData(paymentInput);
        // console.log("now row input", paymentInput)
    }

    // useEffect(() => {
    //     setResHall([...resHall, selectedHall])
    // }, [selectedHall])

    // console.log("show-values", values);
    // console.log("rows data", rowsData)
    // console.log("payment data", paymentData)

    const handleBanquetReservation = async () => {
        try {
            let response = await axios.post(`${baseUrl}/banquetregistration`, {
                "tblbanquetReservation": {
                    reservationDate: selectedReservationDate,
                    reservationForDate: selectedReservationForDate,
                    Outlet_Name: selectedOutlet,
                    reservationState: "Started",
                    TimeSlot: values.TimeSlot,
                    customerID: customerID,
                    advancePayment: paymentData[0].PaymentAmount,
                    NoOfPax: values.NoOfPax,
                    SpecialRequest: values.SpecialRequest
                },
                "tblbanquetReservation_details": [
                    {
                        HallName: selectedHall,
                        TimeSlot: values.TimeSlot
                    }
                ],
                "tblbanquetRate_details": rowsData,
                "tblbanquetPayment_details": paymentData
            })

            // console.log(response)
            setShowMessage(response.data.result)
            handleShowModal()
        }
        catch (error) {
            console.log(error)
            setShowMessage(error.response.data.error)
            handleShowModal()
        }
    }

    //Handle Modal open and close
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    return (
        <section className='banquet-reservation'>
            <ReactModal show={showModal}
                message={showMessage}
                buttonOne={"Ok"}
                buttonTwo={"Close"}
                handleTarget={handleCloseModal}
                handleClose={handleCloseModal}
            />
            <h5>BanquetReservation</h5>
            <div className='row banquet-reservation-info'>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label> Reservation Date:</label>
                    <div>
                        <DatePickerInput selectedDate={reservationDate} setSelectedDate={setReservationDate} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label> Reservation For Date:</label>
                    <div>
                        <DatePickerInput selectedDate={reservationForDate} setSelectedDate={setReservationForDate} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>No of PAX:</label>
                    <div>
                        <input type='number' id='NoOfPax' placeholder='500' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Hall Selection:</label>
                    <div>
                        <SelectSearchInput
                            defaultName={selectedHall}
                            List={hallList}
                            text={"Select Hall"}
                            setSelectedItem={setSelectedHall} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Time Slot:</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio"
                                id="TimeSlot"
                                name="TimeSlot"
                                value={"Lunch"}
                                onChange={handleInputChange} />
                            <label >Lunch</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="TimeSlot"
                                name="TimeSlot"
                                value={"Dinner"}
                                onChange={handleInputChange} />
                            <label>Dinner</label>
                        </div>
                        <div>
                            <input type="radio"
                                id="TimeSlot"
                                name="TimeSlot"
                                value={"Both"}
                                onChange={handleInputChange} />
                            <label >Both</label>
                        </div>
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Outlet Name:</label>
                    <div>
                        <SelectSearchInput
                            defaultName={selectedOutlet}
                            List={outletList}
                            text={"Select Outlet"}
                            setSelectedItem={setSelectedOutlet} />
                    </div>
                </div>
            </div>

            <AddDeleteTableRows rowsData={rowsData} addTableRows={addTableRows} deleteTableRows={deleteTableRows} handleChange={handleChange} halls={selectedHall} timeSlot={values.TimeSlot} />
            <SpecialRequest handleInputChange={handleInputChange} />
            <AdvancePayment paymentData={paymentData} addPaymentRows={addPaymentRows} deletePaymentRows={deletePaymentRows}
                handlePaymentChange={handlePaymentChange}
                handleSelectChange={handleSelectChange}
                showPaymentAdd={showPaymentAdd}
            />
            <SubmitBtn event={"Save"} handle={handleBanquetReservation} />
        </section>
    )
}

export default BanquetReservation