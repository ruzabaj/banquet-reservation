import React from 'react'
import "../../Assets/Styles/Btn.scss";
import SubmitBtn from './submitBtn';

const RegisterBtns = () => {
    return (
        <div className='btn-customer-width'>
            <div className='btn-customer-info'>
                <div className='btn-cancel'>
                    <SubmitBtn event={"Reset"} />
                </div>
                <div className='btn-submit'>
                    <SubmitBtn event={"Submit"} />
                </div>
            </div>
        </div>
    )
}

export default RegisterBtns