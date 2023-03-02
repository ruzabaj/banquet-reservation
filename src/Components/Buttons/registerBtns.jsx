import React from 'react'
import "../../Assets/Styles/Btn.scss";
import SubmitBtn from './submitBtn';

const RegisterBtns = () => {
    return (
        <div className='btn-customer-width'>
            <div className='btn-customer-info'>
                <SubmitBtn event={"Reset"} handle={""}/>
                <SubmitBtn event={"Submit"} handle={""}/>
            </div>
        </div>
    )
}

export default RegisterBtns