import React, {useState} from 'react'
import DatePickerInput from './../../Components/Datepicker/index';

const PaymentHistory = () => {
    const [searchPaymentDate, setSearchPaymentDate] = useState(new Date());
    // let selectedPaymentDate = searchPaymentDate.toISOString().substring(0, 10);

    return (
        <div >
            <label>Payment History</label>
            <div>
                <label>Enter Date: </label>
                <DatePickerInput 
                selectedDate={searchPaymentDate} 
                setSelectedDate={setSearchPaymentDate}/>
            </div>
        </div>
    )
}

export default PaymentHistory