import axios from 'axios';
import React, { useState } from 'react'
import "../../Assets/Styles/Form/customerForm.scss";
import SubmitBtn from '../Buttons/submitBtn';
import RegisterBtns from '../Buttons/registerBtns';

const CustomerInfo = () => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [checkError, setCheckError] = useState(false)
    const [customerID, setCustomerID] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [values, setValues] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        type: "Individual",
        panNumber: ""
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
            Phone: values.phone,
        })
            .then((response) => {
                console.log("res", response.data)
                setIsDisabled(false)
                setCheckError(false)

            })
            .catch((error) => {
                console.log("err", error.response.data)
                setIsDisabled(true)
                setCheckError(true)
            })
    }

    const handleCustomer = () => {
        axios.post(`${baseUrl}/customerpost`, {
            token: "test",
            Name: values.fullName,
            Email: values.email,
            Phone: values.phone,
            Address: values.address,
            Country: values.country,
            type: values.type,
            cardno: "",
            vatno: values.panNumber,
        })
            .then((response) => {
                console.log("res", response.data.success)
                setCustomerID(response.data.success)
                setCheckError(false)

            })
            .catch((error) => {
                console.log("err", error.response.data)
                setCheckError(true)
            })
    }

    return (
        <div>
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
                            <input type='text' id='address' placeholder='kalinchok' value={values.address} disabled={isDisabled} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>Country</label>
                        <div>
                            <input type='text' id='country' placeholder='Nepal' value={values.country} disabled={isDisabled} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>Type</label>
                        <div className='radio-type'>
                            <div   >
                                <input type="radio" id="type" name="type"
                                    value="Individual"
                                    disabled={isDisabled} onChange={handleInputChange} />
                                <label>Individual</label>
                            </div>
                            <div  >
                                <input type="radio" id="type" name="type"
                                    value="Company"
                                    disabled={isDisabled} onChange={handleInputChange} />
                                <label>Company</label>
                            </div>
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>PAN no.</label>
                        <div>
                            <input type='text' id='panNumber' placeholder='122456778' value={values.panNumber} onChange={handleInputChange} disabled={isDisabled} />
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <SubmitBtn event={"Verify"} handle={handleVerify} />
                    </div>
                </div>
            </section>
            <RegisterBtns handleCustomer={handleCustomer} />
        </div>
    )
}

export default CustomerInfo