import React from 'react'
import AdvancePayment from '../../Components/Forms/advancePayment';
import BanquetReservation from '../../Components/Forms/banquetReservation';
import CustomerInfo from '../../Components/Forms/customerInfo'
import SpecialRequest from '../../Components/Forms/specialRequest';
import RegisterBtns from './../../Components/Buttons/registerBtns';
import RateInfo from './../../Components/Forms/rateInfo';
import SubmitBtn from '../../Components/Buttons/submitBtn';
import Heading from './../../Components/Heading/index';
import "../../Assets/Styles/Form/form.scss";
import "../../Assets/Styles/Btn.scss";

const Register = () => {
    return (
        <div className='form-page'>
            <Heading heading={"Alice Reception"} />
            <CustomerInfo />
            <RegisterBtns />
            {/* before-registration */}
            <div className='after-registration'>
                <BanquetReservation />
                <RateInfo />
                <SpecialRequest />
                <AdvancePayment />
                <SubmitBtn event={"Save"} />
            </div>
        </div>
    )
}

export default Register