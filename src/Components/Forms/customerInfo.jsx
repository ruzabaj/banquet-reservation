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
    let navigate = useNavigate();

    const [showBanquet, setshowBanquet] = useState(false)
    const [customerID, setCustomerID] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [verifiedCustomer, setVerifiedCustomer] = useState({});
    const [checkError, setCheckError] = useState(false)
    const [message, setMessage] = useState("")
    const [token, setToken] = useState("")

    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    // console.log("here", isVerified, 
    // verifiedCustomer.address, verifiedCustomer.country, 
    // verifiedCustomer.type)
    // console.log("=>", customerID)

    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("tokens"))
        }
    }, [])

    const [values, setValues] = useState({
        fullName: "",
        phone: "",
        altPhone: "",
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
    useEffect(() => {
        if (token) {
            axios.post(`${baseUrl}/customerNameList`, {
                token: `${token}`
            })
                .then((response) => {
                    setCustomerList(response.data)
                })
                .catch((error) => {
                    // console.log(error)
                })
        }
    }, [token])


    const handleVerify = () => {
        axios.post(`${baseUrl}/customercheck`, {
            token: `${token}`,
            Name: values.fullName,
            // Name: selectedCustomer,
            Email: values.email,
            Phone: values.phone,
        })
            .then((response) => {
                // console.log("customercheck", response)
                setIsVerified(true)
                setVerifiedCustomer(response.data.success[0])
                setCustomerID(response.data.success[0].customerId)
                setIsDisabled(false)
                setshowBanquet(true)
                setCheckError(false)

            })
            .catch((error) => {
                // console.log("customer check error", error.response.data.error)
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

    //Handle Modal open and close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCustomer = () => {
        axios.post(`${baseUrl}/customerpost`, {
            token: `${token}`,
            // Name: selectedCustomer,
            Name: values.fullName,
            Email: values.email,
            Phone: values.phone,
            altPhone: values.altPhone,
            Address: values.address,
            Country: values.country,
            type: values.type,
            cardno: "",
            vatno: values.panNumber,
        })
            .then((response) => {
                // console.log("res123", response.data)
                // console.log("customerpost res123", response.data.success)
                setMessage("Congratulation! You have registered successfully")
                setCustomerID(response.data.success)
                setshowBanquet(true)
                handleShow();
                setCheckError(false)

            })
            .catch((error) => {
                // console.log("customerpost err", error.response.data)
                handleShow()
                setCheckError(true)
                setshowBanquet(true)
                setMessage(error.response.data.error)
            })
    }

    return (
        <div>
            <ReactModal
                show={show}
                handleClose={handleClose}
                message={message}
                buttonOne={"OK"}
                buttonTwo={"Close"}
                handleTarget={handleClose}
            />
            <section className='customer'>
                <h5>Customer Information</h5>
                <div className='row customer-info'>
                    <div className='customer-info-input col-lg-3 col-md-4 col-sm-6'>
                        <label>Name</label>
                        <div>
                            {/* <SelectSearchInput defaultName={selectedCustomer} List={customerList} text={"Search Name"} setSelectedItem={setSelectedCustomer} />
                            <p>If not a user?</p> */}
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
                        <label>Second Phone No. </label>
                        <div>
                            <input type='text' name='altPhone' id="altPhone" value={values.altPhone} placeholder='9841522231' onChange={handleInputChange} />
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
                        {isVerified ?
                            <div className='radio-type'>
                                <div>
                                    <input type="radio"
                                        id="type"
                                        name="type"
                                        checked={(verifiedCustomer.type === "Individual") && "Individual"}
                                        // checked={verifiedCustomer.type}
                                        value={"Individual"}
                                        disabled={isDisabled}
                                        onChange={handleInputChange} />
                                    <label>Individual</label>
                                </div>
                                <div  >
                                    <input type="radio"
                                        id="type"
                                        name="type"
                                        checked={(verifiedCustomer.type === "Company") && "Company"}
                                        value={"Company"}
                                        disabled={isDisabled}
                                        onChange={handleInputChange} />
                                    <label>Company</label>
                                </div>
                            </div>
                            :
                            <div className='radio-type'>
                                <div>
                                    <input type="radio"
                                        id="type"
                                        name="type"
                                        // checked={(verifiedCustomer.type === "Individual") && "Individual"}
                                        // checked={verifiedCustomer.type}
                                        value={"Individual"}
                                        disabled={isDisabled}
                                        onChange={handleInputChange} />
                                    <label>Individual</label>
                                </div>
                                <div  >
                                    <input type="radio"
                                        id="type"
                                        name="type"
                                        // checked={(verifiedCustomer.type === "Company") && "Company"}
                                        value={"Company"}
                                        disabled={isDisabled}
                                        onChange={handleInputChange} />
                                    <label>Company</label>
                                </div>
                            </div>
                        }
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
                <BanquetReservation customerID={customerID} token={token} />
            </div>
        </div>
    )
}

export default CustomerInfo