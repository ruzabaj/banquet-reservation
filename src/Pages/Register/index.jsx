import React from 'react'
import Heading from './../../Components/Heading/index';
import CustomerInfo from '../../Components/Forms/customerInfo'
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