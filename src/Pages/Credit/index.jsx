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
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [selectedOutlet, setSelectedOutlet] = useState("");
    const [selectedCredit, setSelectedCredit] = useState("");
    const [bookingDetail, setBookingDetail] = useState([])

    const creditHeader =
        ["Email", "NoOfPax", "Phone", "TimeSlot", "advancePayment",
            "customerName", "outlet", "reservationDate", "reservationForDate",
            "reservationState", "type", "vatno"]

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
        if (selectedOutlet && selectedCredit) {
            axios.post(`${baseUrl}/customerCreditData`, {
                token: "test",
                outlet: selectedOutlet,
                customerName: selectedCredit
            })
                .then((response) => {
                    console.log(response.data)
                    setCreditData(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedOutlet, selectedCredit])

    const handleBookingDetail = () => {
        axios.post(`${baseUrl}/bookingDetails`, {
            token: "test",
            customerName: selectedCustomer
        })
            .then((response) => {
                console.log(response)
                setBookingDetail(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const makePayment = () => {
        axios.post(`${baseUrl}/makePayment`, {
            banquetReservationID: "67",
            PaymentAmount: "10",
            PaymentMode: "Cash",
            billno: "1",
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
                <h5>Credit Summary</h5>
                <Dropdown >
                    <Dropdown.Toggle id="dropdown-basic" >
                        Customer List
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Cash</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Credit Card</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <SelectSearch
                    defaultValue={selectedCustomer}
                    search
                    placeholder={"Customer List"}
                    onChange={(event) => setSelectedCustomer(event)}
                    options={customerName}
                />
                <button onClick={handleBookingDetail}>Booking Detail</button> */}
                <div className='credit-remaining'>
                    <div className='credit-border-bottom'>
                        <label>{selectedCredit}</label>
                        {creditData.map((detail) => (
                            <div>
                                <div className='same-width'>
                                    <p>Email : </p>
                                    <span> {detail.customerEmail}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Phone : </p>
                                    <span> {detail.customerPhone}</span>
                                </div>
                                <div className='same-width'>
                                    <p>Type : </p>
                                    <span> {detail.customerType}</span>
                                </div>
                                <div className='same-width'>
                                    <p>VAT no : </p>
                                    <span> {detail.customerVAT}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='credit-border-bottom'>
                        <div className='same-width'>
                            <p>AdvanceAmount : </p>
                            <span> Rs 10000</span>
                        </div>
                        <div className='same-width'>
                            <p>RemainingAmount: </p>
                            <span>Rs 1500</span>
                        </div>
                        <div className='same-width'>
                            <p>TotalCredit: </p>
                            <span>Rs 1500</span>
                        </div>
                        <div className='same-width'>
                            <p>Total Payment Made: </p>
                            <span>Rs 1500</span>
                        </div>
                    </div>
                </div>
                {/* <div className='show-calculation'>
                    <div className='same-width'>
                        <p>Total : </p>
                        <span> Rs 10000</span>
                    </div>
                </div> */}
                <button className='btn-pay' onClick={makePayment}>Make Payment</button>
                <button className='btn-cancel'>Cancel Payment</button>
            </div>
            <div className='make-credit'>
                {/* <Steps
                    direction="vertical"
                    current={0}
                    items={[
                        {
                            title: 'Cash',
                            description,
                        },
                        {
                            title: 'Credit',
                            description,
                        },
                        {
                            title: 'Mobile Payment',
                            description,
                        },
                    ]}
                /> */}
                <div className='background-credit'>
                    <div className='filter'>
                        <BiFilterAlt />
                        <label> Filter Credit </label>
                    </div>

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
                            {/* <label> Credit Customer : </label> */}
                            <SelectSearch
                                defaultValue={selectedCredit}
                                search
                                placeholder={"Customer Credit List"}
                                onChange={(event) => setSelectedCredit(event)}
                                options={creditList}
                                disabled={isDisabled}
                            />
                        </div>
                        <button className='btn-filter'>Filter</button>
                    </div>
                    <div className='flex-datepicker'>
                        <Dropdown className='toggle-category'>
                            <Dropdown.Toggle id="dropdown-basic">
                                Filter By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Date Range</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div>
                            <label>Start Date: </label>
                            <DatePickerInput />
                        </div>
                        <div>
                            <label>End Date : </label>
                            <DatePickerInput />
                        </div>
                    </div>
                </div>
                {/* <div className='responsive-credit-table'>
                    <table>
                        <tr>
                            {creditHeader.map((headers, index) => (
                                <th key={index}>{headers}</th>
                            ))}
                        </tr>
                        {bookingDetail.map((info) => (
                            <tr>
                                <td>{info.Email}</td>
                                <td>{info.NoOfPax}</td>
                                <td>{info.Phone}</td>
                                <td>{info.TimeSlot}</td>
                                <td>{info.advancePayment}</td>
                                <td>{info.customerName}</td>
                                <td>{info.outlet}</td>
                                <td>{info.reservationDate}</td>
                                <td>{info.reservationForDate}</td>
                                <td>{info.reservationState}</td>
                                <td>{info.type}</td>
                                <td>{info.vatno}</td>
                            </tr>
                        ))}
                    </table>
                </div> */}
            </div>
        </div>
    )
}

export default Credit