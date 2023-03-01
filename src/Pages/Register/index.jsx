import React from 'react'
import AdvancePayment from '../../Components/Forms/advancePayment';
import BanquetReservation from '../../Components/Forms/banquetReservation';
import CustomerInfo from '../../Components/Forms/customerInfo'
import SpecialRequest from '../../Components/Forms/specialRequest';
import RegisterBtns from './../../Components/Buttons/registerBtns';
import RateInfo from './../../Components/Forms/rateInfo';
import SubmitBtn from '../../Components/Buttons/submitBtn';
import "../../Assets/Styles/Form/form.scss";
// import StaffTable from './../../Components/Forms/tryrate';

const Register = () => {
    return (
        <div className='form-page'>
            <div className='heading'>
                <h4>Alice Receptions</h4>
            </div>
            <CustomerInfo />
            <RegisterBtns />
            <div  className='after-registration'>
                <div >
                    <BanquetReservation />
                    <RateInfo />
                </div>
                <SpecialRequest />
                <AdvancePayment />
                <div className='btn-save'>
                    <SubmitBtn event={"Save"} />
                </div>
            </div>
            {/* <StaffTable/> */}
        </div>
    )
}

export default Register