import axios from 'axios';
import React, { useState } from 'react'
import DatePickerInput from './../../Components/Datepicker/index';

const PaymentHistory = ({ customerID, reservationDate }) => {
    const [searchPaymentDate, setSearchPaymentDate] = useState(new Date());
    // let selectedPaymentDate = searchPaymentDate.toISOString().substring(0, 10);

    let baseUrl = process.env.REACT_APP_BASE_URL;

    const handlePayment = () => {
        axios.post(`${baseUrl}/paymentHistory`,
            {
                customerID: `${customerID}`,
                reservationDate: `${reservationDate}`,
                token: "test"
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='border-payment-history'>
            <div>
                <label>Enter Date: </label>
                <div className='style-payment-date'>
                    <DatePickerInput
                        selectedDate={searchPaymentDate}
                        setSelectedDate={setSearchPaymentDate} />
                    <button onClick={handlePayment} className="btn-show">Show</button>
                </div>
            </div>
            <div>

            </div>
            <div className='style-payment-footer'>
                <label>Total : </label>
                <div className='payment-button'>
                    <button className='btn-finalise'>Finalise</button>
                    <button className='btn-cancel'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory