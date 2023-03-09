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

const BanquetReservation = ({ customerID }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [reservationDate, setReservationDate] = useState(new Date());
    const [reservationForDate, setReservationForDate] = useState(new Date());
    const [hallList, setHallList] = useState([]);
    const [resHall, setResHall] = useState([]);
    const [selectedHall, setSelectedHall] = useState("");
    const [outletList, setOutletList] = useState([]);
    const [selectedOutlet, setSelectedOutlet] = useState("");
    // const [detail, setDetail] = useState([]);

    let selectedReservationDate = reservationDate.toISOString().substring(0, 10);
    let selectedReservationForDate = reservationForDate.toISOString().substring(0, 10);

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
    let detail = []
    var obj = {
        HallName: "Hi",
        TimeSlot: "Dinner"
    }
    // let  obj.TimeSlot =values.TimeSlot

    detail.push(obj)
    // console.log(detail)

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({
            ...values,
            [id]: value,
        });
    }

    const [rowsData, setRowsData] = useState([]);

    const addTableRows = () => {
        const rowsInput = {
            RateName: '',
            RateAmount: '',
            NoOfPax: '',
            HallName: ''
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

    const addPaymentRows = () => {
        const paymentInput = {
            PaymentAmount: '',
            paymentDate: todayDate,
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
        console.log("now row input", paymentInput)
    }

    useEffect(() => {
        setResHall([...resHall, selectedHall])
    }, [selectedHall])

    console.log("selected hall", resHall); 

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
                    advancePayment: "",
                    NoOfPax: values.NoOfPax,
                    SpecialRequest: values.SpecialRequest
                },
                "tblbanquetReservation_details": [
                    {
                        HallName: selectedHall,
                        TimeSlot: "09:00:00-12:00:00"
                    }
                ],
                "tblbanquetRate_details": rowsData,
                "tblbanquetPayment_details": paymentData
            })

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <section className='banquet-reservation'>
            <h5>BanquetReservation</h5>
            {selectedOutlet}
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
                        <SelectSearchInput List={hallList} text={"Select Hall"} setSelectedItem={setSelectedHall} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Time Slot:</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio" id="TimeSlot" value="Lunch" onChange={handleInputChange} />
                            <label >Lunch</label>
                        </div>
                        <div>
                            <input type="radio" id="TimeSlot" value="Dinner" onChange={handleInputChange} />
                            <label>Dinner</label>
                        </div>
                        <div>
                            <input type="radio" id="TimeSlot" value="Both" onChange={handleInputChange} />
                            <label >Both</label>
                        </div>
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Outlet Name:</label>
                    <div>
                        <SelectSearchInput List={outletList} text={"Select Outlet"} setSelectedItem={setSelectedOutlet} />
                    </div>
                </div>
            </div>
            <AddDeleteTableRows rowsData={rowsData} addTableRows={addTableRows} deleteTableRows={deleteTableRows} handleChange={handleChange} halls={selectedHall} resHall={resHall} />
            <SpecialRequest handleInputChange={handleInputChange} />
            <AdvancePayment paymentData={paymentData} addPaymentRows={addPaymentRows} deletePaymentRows={deletePaymentRows} handlePaymentChange={handlePaymentChange} />
            <SubmitBtn event={"Save"} handle={handleBanquetReservation} />
        </section>
    )
}

export default BanquetReservation