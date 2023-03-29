import React, { useState, useEffect } from 'react'
import "../../Assets/Styles/Credit/credit.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import DatePickerInput from '../../Components/Datepicker';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import "../../Assets/Styles/Credit/creditTable.scss";
import { Steps } from 'antd';
import PaymentModal from '../../Components/Modals/PaymentModal';
import StandardDate from "../../Components/StandardDate";

const Credit = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [customerName, setCustomerName] = useState([]);
    const [outletName, setOutletName] = useState([]);
    const [creditList, setCreditList] = useState([]);
    const [creditData, setCreditData] = useState([]);
    // const [creditDetails, setCreditDetails] = useState({});
    const [creditWiseBillList, setCreditWiseBillList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [selectedCreditCustomer, setSelectedCreditCustomer] = useState("");
    const [dateOne, setDateOne] = useState(new Date());
    const [dateTwo, setDateTwo] = useState(new Date());
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

    let baseUrl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        axios.post(`${baseUrl}/customerNameList`, {
            token: "test"
        })
            .then((response) => {
                // console.log(response.data)
                setCustomerName(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.post(`${baseUrl}/outlets`, {
            token: "test"
        })
            .then((response) => {
                // console.log(response.data)
                setOutletName(response.data)
                setIsDisabled(false)
            })
            .catch((error) => {
                console.log(error)
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
                    console.log(error)
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
                    console.log("credit-data", response.data)
                    setCreditData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedOutlet, selectedCreditCustomer])

    const showCreditDetail = (id) => {
        if (selectedCreditCustomer && selectedOutlet) {
            axios.post(`${baseUrl}/customerCreditDetails`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    // console.log("detail", response.data.CreditWiseBillList)
                    setPaymentHistory(response.data.PaymentHistory)
                    setCreditWiseBillList(response.data.CreditWiseBillList)
                    setShowPaymentHistory(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowPaymentHistory(false)
                })

            axios.post(`${baseUrl}/bookingDetails`, {
                token: "test",
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    console.log("booking-detail", response.data)
                    setBookingDetail(response.data)
                    setShowBookingDetail(true)
                })
                .catch((error) => {
                    console.log(error)
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

    console.log(amount, options, "ruja")

    const makePayment = () => {
        // console.log("inside make payment", id)
        handleShow()
    }

    const handlePay = (id) => {
        // console.log("inside handle pay", id)
        if (amount && options) {
            axios.post(`${baseUrl}/makePayment`, {
                customerID: id,
                PaymentAmount: `${amount}`,
                PaymentMode: `${options}`,
                token: "test",
                outlet: selectedOutlet
            })
                .then((res) => {
                    console.log(res)
                    handleClose()
                })
                .catch((error) => {
                    console.log(error)
                })

            }
            axios.post(`${baseUrl}/customerCreditDetails`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    // console.log("detail", response.data.CreditWiseBillList)
                    setPaymentHistory(response.data.PaymentHistory)
                    setCreditWiseBillList(response.data.CreditWiseBillList)
                })
                .catch((error) => {
                    console.log(error)
                })
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
                    // console.log(res)
                    setCreditLeft(res.data)
                    setShowCreditLeft(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowCreditLeft(false)
                })
        }
        if (dropdownChange === "Ranged") {
            axios.post(`${baseUrl}/customerCreditleft`, {
                token: "test",
                outlet: `${selectedOutlet}`,
                type: `${dropdownChange}`,
                dateStart: `${dateOne}`,
                dateEnd: `${dateTwo}`
            })
                .then((res) => {
                    console.log(res)
                    setCreditLeft(res.data)
                    setShowCreditLeft(true)
                })
                .catch((error) => {
                    console.log(error)
                    setShowCreditLeft(false)
                })
        }
    }
    return (
        <div className='credit-page'>
            <div className='credit-info'>
                <div className='credit-remaining'>
                    <div >
                        <h5>{selectedCreditCustomer}</h5>
                        {creditData.map((detail) => (
                            <div>
                                <div className='credit-border-bottom'>
                                    <div className='bill-list'>
                                        <div className='same-width'>
                                            <p>Email : </p>
                                            <span>{detail.customerEmail}</span>
                                        </div>
                                        <div className='same-width'>
                                            <p>Phone :</p>
                                            <span>{detail.customerPhone}</span>
                                        </div>
                                        <div className='same-width'>
                                            <p>Type :  </p>
                                            <span>{detail.customerType}</span>
                                        </div>
                                        <div className='same-width'>
                                            <p>VAT :  </p>
                                            <span>{detail.customerVAT}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='credit-border-bottom'>
                                    <h5>Credit Details</h5>
                                    {detail.creditDetails.map((amount) => (
                                        <div>
                                            <div className='same-width'>
                                                <p>Total Credit: </p>
                                                <span>{amount.TotalCredit}</span>
                                            </div>
                                            <div className='same-width'>
                                                <p>Advance Amount : </p>
                                                <span>{amount.AdvanceAmount}</span>
                                            </div>
                                            <div className='same-width'>
                                                <p>Total Payment Made: </p>
                                                <span>{amount.TotalPaymentMade}</span>
                                            </div>
                                            <div className='same-width'>
                                                <p>Remaining Amount: </p>
                                                <span>{amount.RemainingAmount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='buttons'>
                                    <button onClick={() => showCreditDetail(detail.customerID)} className="btn-details">Show Detail</button>
                                    <button className='btn-pay' onClick={() => makePayment(detail.customerID)}>Make Payment</button>
                                    <PaymentModal show={show} handleClose={handleClose} handleChange={handleChange} handleOptions={handleOptions} handlePay={handlePay} ids={detail.customerID} />

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='make-credit'>
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
                                    <SelectSearch
                                        defaultValue={selectedOutlet}
                                        search
                                        placeholder={"Select Oulet Name"}
                                        onChange={(event) => setSelectedOutlet(event)}
                                        options={outletName}

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
                        <div className='flex-datepicker'>
                            <div>
                                <label></label>
                                <select className='toggle-category' onChange={handleDropdownChange}>
                                    <label id="dropdown-basic">
                                        Filter By
                                    </label>
                                    <option >Select an option </option>
                                    <option value="All">All</option>
                                    <option value="Ranged">Date Range</option>
                                </select>
                            </div>
                            <div>
                                <label>From: </label>
                                <DatePickerInput selectedDate={dateOne} setSelectedDate={setDateOne} />
                            </div>
                            <div>
                                <label>To : </label>
                                <DatePickerInput selectedDate={dateTwo} setSelectedDate={setDateTwo} />
                            </div>
                            <button className='btn-filter-credit' onClick={handleFilter}>View Credit Left</button>
                        </div>
                    </div>

                    <div className='credit-table'>
                        {showBookingDetail &&
                            <div className='responsive-credit-table'>
                                <table>
                                    <tr>
                                        {creditHeader.map((headers, index) => (
                                            <th key={index}>{headers}</th>
                                        ))}
                                    </tr>
                                    {bookingDetail.map((info) => (
                                        <tr>
                                            <td>{info.billno}</td>
                                            <td>{info.NoOfPax}</td>
                                            <td>{info.TimeSlot}</td>
                                            <td>{info.advancePayment}</td>
                                            <td><StandardDate date={info.reservationDate} /></td>
                                            <td><StandardDate date={info.reservationForDate} /></td>
                                            <td>{info.Total}</td>
                                            <td>{info.subTotal}</td>
                                            <td>{info.vatAmount}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        }

                        {showPaymentHistory &&
                            <div className='basic-information'>
                                <label>Payment History</label>
                                <table>
                                    <thead>
                                        <tr>
                                            <th> Date:</th>
                                            <th> Mode:</th>
                                            <th> Amount:</th>
                                            <th> Type:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentHistory.map((detail) => (
                                            <tr>
                                                <td><StandardDate date={detail.paymentDatetime} /></td>
                                                <td>{detail.PaymentMode}</td>
                                                <td>{detail.PaymentAmount}</td>
                                                <td>{detail.paymentType}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }

                        {showCreditLeft &&
                            <div className='responsive-credit-table'>
                                <label>Credit Left</label>
                                <table>
                                    <tr>
                                        {creditLeftHeader.map((headers, index) => (
                                            <th key={index}>{headers}</th>
                                        ))}
                                    </tr>
                                    {creditLeft.map((info) => (
                                        <tr>
                                            <td>{info.guest}</td>
                                            <td>{info.guestEmail}</td>
                                            <td>{info.TotalCredit}</td>
                                            <td>{info.TotalPaymentMade}</td>
                                            <td>{info.AdvanceAmount}</td>
                                            <td>{info.RemainingAmount}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Credit
