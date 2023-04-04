import React from 'react'
// import Heading from './../../Components/Heading/index';
import CustomerInfo from '../../Components/Forms/customerInfo'
import "../../Assets/Styles/Form/form.scss";
import "../../Assets/Styles/Btn.scss";
import Navbar from "../../Components/Navbar";

const Register = () => {
    return (
        <div>
            <Navbar />
            <div className='form-page'>
                <CustomerInfo />
            </div>
        </div>
    )
}

export default Register