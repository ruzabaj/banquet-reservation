import axios from 'axios';
import React, { useState } from 'react'
import "../../Assets/Styles/Form/customerForm.scss";
import SubmitBtn from '../Buttons/submitBtn';

const CustomerInfo = () => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [checkError, setCheckError] = useState(false)
    const [isDisabled, setIsDisabled]= useState(true);
    const [values, setValues] = useState({
        fullName: "",
        phone: "",
        email: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({
            ...values,
            [id]: value,
          });
    }

    const handleVerify = () => {
        axios.post(`${baseUrl}/customercheck`, {
            token: "test",
            Name: values.fullName,
            Email: values.email,
            Phone: values.phone
        })
            .then((response) => {
                console.log("res",response.data)
                // setIsDisabled(false)
                setCheckError(false)

            })
            .catch((error) => {
                console.log("err",error.response.data)
                setIsDisabled(true)
                setCheckError(true)
            })
    }

    return (
        <section className='customer'>
            <h5>Customer Information</h5>
            <div className='row customer-info'>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Name</label>
                    <div>
                        <input type='text' name='name' id="fullName" value={values.fullName} placeholder='Ram Shrestha' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Phone</label>
                    <div>
                        <input type='text' name='phone' id="phone" value={values.phone} placeholder='984113556' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Email</label>
                    <div>
                        <input type='text' name='email' id="email" value={values.email} placeholder='example@gmail.com' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Address</label>
                    <div>
                        <input type='text' name='address' placeholder='kalinchok' disabled={isDisabled} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Country</label>
                    <div>
                        <input type='text' name='address' placeholder='Nepal' disabled={isDisabled} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>Type</label>
                    <div className='radio-type'>
                        <div>
                            <input type="radio" id="individual" name="type" value="Individual" disabled={isDisabled} />
                            <label>Individual</label>
                        </div>
                        <div>
                            <input type="radio" id="company" name="type" value="Company" disabled={isDisabled} />
                            <label>Company</label>
                        </div>
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <label>PAN no.</label>
                    <div>
                        <input type='number' name='pan number' placeholder='122456778' disabled={isDisabled} />
                    </div>
                </div>
                <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                    <SubmitBtn event={"Verify"} handle={handleVerify} />
                </div>
            </div>
        </section>
    )
}

export default CustomerInfo