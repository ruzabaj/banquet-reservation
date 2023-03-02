import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Form/banquetReservation.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectSearchInput from './../SelectSearch/index';
import axios from 'axios';

const BanquetReservation = () => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [hallList, setHallList] = useState([]);
    const [outletList, setOutletList] = useState([]);

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

    return (
        <section className='banquet-reservation'>
            <h5>BanquetReservation</h5>
            <div className='row banquet-reservation-info'>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label> Reservation Date:</label>
                    <div>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label> Reservation For Date:</label>
                    <div>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>No of PAX:</label>
                    <div>
                        <input type='number' name='PAX' placeholder='500' />
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Time Slot:</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio" id="lunch" name="type" value="lunch" />
                            <label >Lunch</label>
                        </div>
                        <div>
                            <input type="radio" id="Dinner" name="type" value="Dinner" />
                            <label>Dinner</label>
                        </div>
                        <div>
                            <input type="radio" id="Dinner" name="type" value="Dinner" />
                            <label >Both</label>
                        </div>
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Hall Selection:</label>
                    <div>
                        <input type='number' name='Hall' placeholder='Hall 1' />
                        <SelectSearchInput List={hallList}/>
                    </div>
                </div>
                <div className='reservation-info col-lg-4 col-md-4 col-sm-6'>
                    <label>Outlet Name:</label>
                    <div>
                        <input type='number' name='outlet' placeholder='Outlet 1' />
                        <SelectSearchInput List={outletList}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BanquetReservation