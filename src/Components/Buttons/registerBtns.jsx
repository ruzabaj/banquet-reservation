import React from 'react'
import "../../Assets/Styles/Btn.scss";
import SubmitBtn from './submitBtn';

const RegisterBtns = ({handleCustomer, handleReset}) => {
    return (
        <div className='btn-customer-width'>
            <div className='btn-customer-info'>
                <SubmitBtn event={"Reset"} handle={handleReset}/>
                <SubmitBtn event={"Register"} handle={handleCustomer}/>
            </div>
        </div>
    )
}

export default RegisterBtns