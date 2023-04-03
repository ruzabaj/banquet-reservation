import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "../../Assets/Styles/Credit/credit.scss";
import "../../Assets/Styles/Credit/creditTable.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import SelectSearch from 'react-select-search';
import SelectSearchInput from '../../Components/SelectSearch';
import CreditPaymentTable from "../../Components/Table/CreditPaymentTable";
import CreditTable from '../../Components/Table/CreditTable';
import CreditSidebar from './CreditSidebar';
import CreditLeftTable from '../../Components/Table/CreditLeftTable';
import SimilarCustomerTable from '../../Components/Table/SimilarCustomerTable';
import CreditDatepicker from './CreditDatepicker';

const Credit = () => {
    const [customerID, setCustomerID] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerType, setCustomerType] = useState("");
    const [customerVAT, setCustomerVAT] = useState("");

    const [isDisabled, setIsDisabled] = useState(true);
    const [dateOne, setDateOne] = useState(new Date());
    const [dateTwo, setDateTwo] = useState(new Date());

    const [outletName, setOutletName] = useState([]);
    const [creditList, setCreditList] = useState([]);
    const [creditData, setCreditData] = useState([]);

    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [selectedCreditCustomer, setSelectedCreditCustomer] = useState("");

    const [creditDetails, setCreditDetails] = useState([]);
    const [showCreditDetails, setShowCreditDetails] = useState(false);

    const [dropdownChange, setDropdownChange] = useState("");

    const [bookingDetail, setBookingDetail] = useState([]);
    const [showBookingDetail, setShowBookingDetail] = useState(false);

    const [paymentHistory, setPaymentHistory] = useState([]);
    const [showPaymentHistory, setShowPaymentHistory] = useState(false);

    const [creditLeft, setCreditLeft] = useState([]);
    const [showCreditLeft, setShowCreditLeft] = useState(false);

    const creditHeader =
        ["Bill No", "NoOfPax", "TimeSlot", "Advance Payment",
            "Reservation Date", "Reservation For Date", "Total", "Sub Total", "VAT Amount"]

    const creditLeftHeader =
        ["Guest", "Guest Email",
            "Total Credit", "Total Payment Made", "Advance Amount", "Remaining Amount"]

    const similarHeader = ["Email", "Phone", "Type", "VAT", ""]

    const paymentHeader = ["Date", "Mode", "Amount", "Type"]

    let baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.post(`${baseUrl}/outlets`, {
            token: "test"
        })
            .then((response) => {
                setOutletName(response.data)
                setIsDisabled(false)
            })
            .catch((error) => {
                // console.log(error)
            })
    }, [])

    useEffect(() => {
        setIsDisabled(false)
        if (selectedOutlet) {
            axios.post(`${baseUrl}/creditCustomerList`,
                {
                    token: "test",
                    outlet: selectedOutlet
                })
                .then((response) => {
                    setCreditList(response.data)
                })
                .catch((error) => {
                    // console.log(error)
                })
        }
    }, [selectedOutlet])

    useEffect(() => {
        if (selectedOutlet && selectedCreditCustomer) {
            axios.post(`${baseUrl}/customerCreditData`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCreditCustomer,
            })
                .then((response) => {
                    // console.log("credit-data", response.data)
                    setCreditData(response.data)
                    setShowCreditDetails(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowCreditDetails(false)
                })
        }
    }, [selectedOutlet, selectedCreditCustomer])

    const showCreditDetail = (id, email, phone, type, vat) => {
        setCustomerID(id)
        setCustomerEmail(email)
        setCustomerPhone(phone)
        setCustomerType(type)
        setCustomerVAT(vat)

        if (selectedCreditCustomer && selectedOutlet) {
            axios.post(`${baseUrl}/customerCreditDetails`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    // console.log("detail", response.data.CreditDetails)
                    setPaymentHistory(response.data.PaymentHistory)
                    // setCreditWiseBillList(response.data.CreditWiseBillList)
                    setCreditDetails(response.data.CreditDetails)
                    setShowPaymentHistory(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowPaymentHistory(false)
                })

            axios.post(`${baseUrl}/bookingDetails`, {
                token: "test",
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    // console.log("booking-detail", response.data)
                    setBookingDetail(response.data)
                    setShowBookingDetail(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowBookingDetail(false)
                })
        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [amount, setAmount] = useState("");
    const [options, setOptions] = useState("");

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleOptions = (event) => {
        setOptions(event.target.value)
    }

    const makePayment = () => {
        handleShow()
    }

    const handlePay = (id) => {
        if (amount && options) {
            axios.post(`${baseUrl}/makePayment`, {
                customerID: id,
                PaymentAmount: `${amount}`,
                PaymentMode: `${options}`,
                token: "test",
                outlet: selectedOutlet
            })
                .then((res) => {
                    // console.log(res)
                    handleClose()
                })
                .catch((error) => {
                    // console.log(error)
                })
        }

        setTimeout(() => {
            axios.post(`${baseUrl}/customerCreditDetails`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    setPaymentHistory(response.data.PaymentHistory)
                    setCreditDetails(response.data.CreditDetails)
                    setShowPaymentHistory(true)
                })
                .catch((error) => {
                    // console.log(error)
                })

            axios.post(`${baseUrl}/bookingDetails`, {
                token: "test",
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    setBookingDetail(response.data)
                    setShowBookingDetail(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowBookingDetail(false)
                })
        }, 1000);

    }

    const handleDropdownChange = (event) => {
        setDropdownChange(event.target.value)
    }

    const handleFilter = () => {
        if (dropdownChange === "All") {
            axios.post(`${baseUrl}/customerCreditleft`, {
                token: "test",
                outlet: `${selectedOutlet}`,
                type: `${dropdownChange}`,
            })
                .then((res) => {
                    setCreditLeft(res.data)
                    setShowCreditLeft(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowCreditLeft(false)
                })
        }
        if (dropdownChange === "Ranged") {
            let dateStart = new Date(dateOne).toISOString().substring(0, 11);
            let dateEnd = new Date(dateTwo).toISOString().substring(0, 11);

            axios.post(`${baseUrl}/customerCreditleft`, {
                token: "test",
                outlet: `${selectedOutlet}`,
                type: `${dropdownChange}`,
                dateStart: `${dateStart}`,
                dateEnd: `${dateEnd}`
            })
                .then((res) => {
                    // console.log(res)
                    setCreditLeft(res.data)
                    setShowCreditLeft(true)
                })
                .catch((error) => {
                    // console.log(error)
                    setShowCreditLeft(false)
                })
        }
    }
    // console.log(customerID, "id")
    return (
        <div className='credit-page'>
            <CreditSidebar
                customerID={customerID}
                customerEmail={customerEmail}
                customerPhone={customerPhone}
                customerType={customerType}
                customerVAT={customerVAT}
                creditDetails={creditDetails}
                makePayment={makePayment}
                handlePay={handlePay}
                show={show}
                handleClose={handleClose}
                handleChange={handleChange}
                handleOptions={handleOptions}
                customersName={selectedCreditCustomer}
            />

            <div className='make-credit container'>
                <div className='background-credit'>
                    <div className='filter'>
                        <BiFilterAlt />
                        <label> Filter Credit </label>
                    </div>
                    <div className='show-filter'>
                        <div className='custom-filter'>
                            <div className='input-search'>
                                <span className='eyeglass-icon'><AiOutlineSearch /></span>
                                <div className='dropdown-search'>
                                    <SelectSearchInput
                                        defaultName={selectedOutlet}
                                        text={"Select Outlet Name"}
                                        setSelectedItem={setSelectedOutlet}
                                        List={outletName}
                                    />
                                </div>
                            </div>
                            <div className='credit-customer'>
                                <SelectSearch
                                    defaultValue={selectedCreditCustomer}
                                    search
                                    placeholder={"Customer Credit List"}
                                    onChange={(event) => setSelectedCreditCustomer(event)}
                                    options={creditList}
                                    disabled={isDisabled}
                                />
                            </div>
                        </div>
                        <CreditDatepicker
                            handleChange={handleDropdownChange}
                            dateOne={dateOne}
                            setDateOne={setDateOne}
                            dateTwo={dateTwo}
                            setDateTwo={setDateTwo}
                            handleFilter={handleFilter} />
                    </div>

                    <div className='credit-table'>
                        {showCreditDetails &&
                            <SimilarCustomerTable
                                headers={similarHeader}
                                contents={creditData}
                                showDetail={showCreditDetail} />
                        }

                        {showBookingDetail &&
                            <CreditTable
                                headers={creditHeader}
                                titles={"Bill Information"}
                                contents={bookingDetail} />
                        }

                        {showPaymentHistory &&
                            <CreditPaymentTable
                                headers={paymentHeader}
                                contents={paymentHistory} />
                        }

                        {showCreditLeft &&
                            <CreditLeftTable
                                headers={creditLeftHeader}
                                contents={creditLeft}
                                titles={"Credit Left"}
                            />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Credit
