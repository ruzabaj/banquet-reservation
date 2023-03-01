import React from 'react'
import CustomerInfo from './customerInfo';
import BanquetReservation from './banquetReservation';
import SubmitBtn from './../Buttons/submitBtn';
import "../../Assets/Styles/Btn.scss";
import RateInfo from './rateInfo';
import SpecialRequest from './specialRequest';
import AdvancePayment from './advancePayment';

const Form = () => {
    return (
        <div>
            <CustomerInfo />
            <div className='btn-customer-info'>
                <div className='btn-cancel'>
                    <SubmitBtn event={"Reset"} />
                </div>
                <div className='btn-submit'>
                    <SubmitBtn event={"Submit"} />
                </div>
            </div>
            <BanquetReservation />
            <RateInfo />
            <SpecialRequest />
            <AdvancePayment />
            <div className='btn-save'>
                <SubmitBtn event={"Save"} />
            </div>
        </div>
    )
}

export default Form