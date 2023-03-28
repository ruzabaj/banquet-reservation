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

const Credit = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [customerName, setCustomerName] = useState([]);
    const [outletName, setOutletName] = useState([]);
    const [creditList, setCreditList] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [creditDetails, setCreditDetails] = useState({});
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [creditWiseBillList, setCreditWiseBillList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [selectedCreditCustomer, setSelectedCreditCustomer] = useState("");
    const [bookingDetail, setBookingDetail] = useState([])

    const creditHeader =
        ["Bill No", "NoOfPax", "TimeSlot", "Advance Payment",
            "Reservation Date", "Reservation For Date", "Total", "Sub Total", "VAT Amount", ""]

    // const description = 'This is a description.';
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
                // customerID:
            })
                .then((response) => {
                    // console.log(response.data)
                    setCreditData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedOutlet, selectedCreditCustomer])

    const handleBookingDetail = () => {
        axios.post(`${baseUrl}/bookingDetails`, {
            token: "test",
            customerName: selectedCustomer
        })
            .then((response) => {
                // console.log(response)
                setBookingDetail(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                    setCreditDetails(response.data.CreditDetails)
                    setPaymentHistory(response.data.PaymentHistory)
                    setCreditWiseBillList(response.data.CreditWiseBillList)
                })
                .catch((error) => {
                    console.log(error)
                })

            axios.post(`${baseUrl}/bookingDetails`, {
                token: "test",
                customerName: selectedCreditCustomer,
                customerID: `${id}`
            })
                .then((response) => {
                    console.log("booking-detail",response.data)
                    setBookingDetail(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const makePayment = (reservationID, billNum) => {
        axios.post(`${baseUrl}/makePayment`, {
            banquetReservationID: `${reservationID}`,
            PaymentAmount: "10",
            PaymentMode: "Cash",
            billno: `${billNum}`,
            token: "test"
        })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='credit-page'>
            <div className='credit-info'>
                <div className='credit-remaining'>
                    <div className='credit-border-bottom'>
                        <h5>Credit Details</h5>
                        <div className='same-width'>
                            <p>Total Credit: </p>
                            <span>{creditDetails.TotalCredit}</span>
                        </div>
                        <div className='same-width'>
                            <p>Advance Amount : </p>
                            <span>{creditDetails.AdvanceAmount}</span>
                        </div>
                        <div className='same-width'>
                            <p>Total Payment Made: </p>
                            <span>{creditDetails.TotalPaymentMade}</span>
                        </div>
                        <div className='same-width'>
                            <p>Remaining Amount: </p>
                            <span>{creditDetails.RemainingAmount}</span>
                        </div>
                    </div>
                    <div className='credit-border-bottom'>
                        <h5>Payment History</h5>
                        {paymentHistory.map((amt, index) => (
                            <div className='payment-history'>
                                <p>Payment {index + 1}</p>
                                <div className='same-width'>
                                    <p>Payment Amount:</p>
                                    <span>{amt.PaymentAmount}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Payment Mode:</p>
                                    <span>{amt.PaymentMode}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Payment Type:</p>
                                    <span>{amt.paymentType}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='credit-border-bottom'>
                        <h5>Credit Bill</h5>
                        {creditWiseBillList.map((bills) => (
                            <div className='bill-list'>
                                <div className='same-width'>
                                    <p>Bill no: </p>
                                    <span>{bills.billno}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Tax :</p>
                                    <span>{bills.Tax}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Total :  </p>
                                    <span>{bills.Total}</span>
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
                                <Dropdown className='toggle-category'>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        Filter By
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Date Range</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <label>From: </label>
                                <DatePickerInput />
                            </div>
                            <div>
                                <label>To : </label>
                                <DatePickerInput />
                            </div>
                            <button className='btn-filter'>Filter</button>
                        </div>
                    </div>

                    <div className='credit-table'>
                        <div className='basic-information'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email:</th>
                                        <th>Phone:</th>
                                        <th>Type:</th>
                                        <th>VAT no:</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditData.map((detail) => (
                                        <tr onClick={() => showCreditDetail(detail.customerID)}>
                                            <td>{detail.customerEmail}</td>
                                            <td>{detail.customerPhone}</td>
                                            <td>{detail.customerType}</td>
                                            <td>{detail.customerVAT}</td>
                                            <button onClick={() => showCreditDetail(detail.customerID)} className="btn-details">Details</button>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                                        <td>{info.reservationDate}</td>
                                        <td>{info.reservationForDate}</td>
                                        <td>{info.Total}</td>
                                        <td>{info.subTotal}</td>
                                        <td>{info.vatAmount}</td>
                                        <td><button className='btn-pay' onClick={()=>makePayment(info.BanquetReservationId, info.billno)}>Make Payment</button></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Credit



{/* <Dropdown >
                    <Dropdown.Toggle id="dropdown-basic" >
                        Customer List
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Cash</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
{/* <SelectSearch
                    defaultValue={selectedCustomer}
                    search
                    placeholder={"Customer List"}
                    onChange={(event) => setSelectedCustomer(event)}
                    options={customerName}
                />
                <button onClick={handleBookingDetail}>Booking Detail</button> */}