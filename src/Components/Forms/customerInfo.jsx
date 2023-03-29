import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Form/customerForm.scss";
import "../../Assets/Styles/selectSearch.scss";
import SubmitBtn from '../Buttons/submitBtn';
import RegisterBtns from '../Buttons/registerBtns';
import ReactModal from './../Modals/index';
import BanquetReservation from './banquetReservation';
import { useNavigate } from 'react-router-dom';

const CustomerInfo = () => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [showBanquet, setshowBanquet] = useState(false)
    const [customerID, setCustomerID] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [verifiedCustomer, setVerifiedCustomer] = useState({});
    const [checkError, setCheckError] = useState(false)
    const [message, setMessage] = useState("")

    console.log("here", isVerified, verifiedCustomer.address, verifiedCustomer.country, verifiedCustomer.type)
    console.log("=>", customerID)

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
    // console.log("see here", values)
    useEffect(() => {
        axios.post(`${baseUrl}/customerList`, {
            token: "test"
        })
            .then((response) => {
                setCustomerList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // console.log(customerList, "customerList")

    const handleVerify = () => {
        console.log("inisde verify")
        axios.post(`${baseUrl}/customercheck`, {
            token: "test",
            Name: values.fullName,
            Email: values.email,
            Phone: values.phone,
        })
            .then((response) => {
                console.log("res", response)
                setIsVerified(true)
                setVerifiedCustomer(response.data.success[0])
                setCustomerID(response.data.success[0].customerId)
                setIsDisabled(false)
                setshowBanquet(true)
                setCheckError(false)

            })
            .catch((error) => {
                console.log("error here", error.response.data.error)
                setIsVerified(false)
                setIsDisabled(false)
                setCheckError(true)
                handleShow();
                setMessage(error.response.data.error)
            })
    }
    const handleReset = () => {
        setVerifiedCustomer({})
        setValues({
            fullName: "",
            phone: "",
            email: "",
            address: "",
            country: "",
            type: "Individual",
            panNumber: ""
        })
        // for (let prop in verifiedCustomer) {
        //     delete verifiedCustomer[prop];
        //   }
    }
    console.log("verifiedCustomer", verifiedCustomer)

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
                // console.log("res123", response.data)
                // console.log("res123", response.data.success)
                setMessage("Congratulation! You have registered successfully")
                setCustomerID(response.data.success)
                setshowBanquet(true)
                handleShow();
                setCheckError(false)

            })
            .catch((error) => {
                // console.log("err", error.response.data)
                setCheckError(true)
                setshowBanquet(true)
            })
    }
    //Handle Modal open and close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();
    const goExtra = () => {
        console.log("clicked extra")
        navigate("/started")
    }
    return (
        <div>
            <button onClick={goExtra}>Back</button>
            <ReactModal show={show} handleClose={handleClose} message={message} />
            <section className='customer'>
                <h5>Customer Information</h5>
                {/* <SelectSearch options={customerList} placeholder="Ram Shrestha" /> */}
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
                            <input type='text' id='address' placeholder='kalinchok' value={isVerified ? verifiedCustomer.address : values.address} disabled={isDisabled} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>Country</label>
                        <div>
                            <input type='text' id='country' placeholder='Nepal' value={isVerified ? verifiedCustomer.country : values.country} disabled={isDisabled} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>Type</label>
                        <div className='radio-type'>
                            <div   >
                                <input type="radio"
                                    id="type"
                                    name="type"
                                    checked={isVerified ? verifiedCustomer.type : "Individual"}
                                    value={isVerified ? verifiedCustomer.type : "Individual"}
                                    disabled={isDisabled}
                                    onChange={handleInputChange} />
                                <label>Individual</label>
                            </div>
                            <div  >
                                <input type="radio"
                                    id="type"
                                    name="type"
                                    // checked={isVerified ? verifiedCustomer.type : "Company"}
                                    value={"Company"}
                                    disabled={isDisabled}
                                    onChange={handleInputChange} />
                                <label>Company</label>
                            </div>
                        </div>
                    </div>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>PAN no.</label>
                        <div>
                            <input type='text' id='panNumber' placeholder='122456778' value={isVerified ? verifiedCustomer.vatno : values.panNumber} onChange={handleInputChange} disabled={isDisabled} />
                        </div>
                    </div>
                    {!isVerified &&
                        <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                            <SubmitBtn event={"Verify"} handle={handleVerify} />
                        </div>
                    }
                </div>
            </section>
            <RegisterBtns handleCustomer={handleCustomer} handleReset={handleReset} isVerified={isVerified} />

            <div className={showBanquet ? 'after-registration' : 'before-registration'}>
                <BanquetReservation customerID={customerID} />
            </div>
        </div>
    )
}

export default CustomerInfo