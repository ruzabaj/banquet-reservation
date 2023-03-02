import React from 'react'
import Heading from './../../Components/Heading/index';
import CustomerInfo from '../../Components/Forms/customerInfo'
import AdvancePayment from '../../Components/Forms/advancePayment';
import BanquetReservation from '../../Components/Forms/banquetReservation';
import SpecialRequest from '../../Components/Forms/specialRequest';
import RateInfo from './../../Components/Forms/rateInfo';
import SubmitBtn from '../../Components/Buttons/submitBtn';
import "../../Assets/Styles/Form/form.scss";
import "../../Assets/Styles/Btn.scss";

const Register = () => {
    
    return (
        <div className='form-page'>
            <Heading heading={"Alice Reception"} />
            <CustomerInfo />
        </div>
    )
}

export default Register