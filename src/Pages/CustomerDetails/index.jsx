import React, { useState, useEffect } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomerEditmodal from './customerDetailEditModal/CustomerEditmodal';
import SpecialRequests from './customerSpecialRequests/SpecialRequests';
import "../../Assets/Styles/Customer/customerDetail.scss";

function CustomerDetails() {
    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [customerNameList,
        setcustomerNameList] = useState([])
    const [selectedCustomerName,
        setselectedCustomerName] = useState("")
    const [token,
        setToken] = useState("")
    const [getcustomerBynameList,
        setgetcustomerBynameList] = useState({})
    const [showCustomerDetailsTable,
        setshowCustomerDetailsTable] = useState(false)
    const [customerClicked,
        setcustomerClicked] = useState(false)
    const [currentCustomerDetailsID,
        setcurrentCustomerDetailsID] = useState({})
    const [customerUpdate, setcustomerUpdate] = useState(false);
    const [specialRequests, setspecialRequests] = useState(false);

    const customerUpdateClicked = () => {
        setcustomerUpdate(true);
        setspecialRequests(false);
    }
    const customerSpecialRequestsClicked = () => {
        setcustomerUpdate(false);
        setspecialRequests(true);
    }
    const getCustomerDetails = async (customerName) => {
        axios
            .post(`${baseUrl}/getcustomerByName`, {
                token: `${token}`,
                customerName: `${customerName}`
            })
            .then((response) => {
                setgetcustomerBynameList({})
                setgetcustomerBynameList(response
                    ?.data
                    ?.Details);
                setshowCustomerDetailsTable(true)
                setcustomerClicked(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (selectedCustomerName && !(selectedCustomerName === "")) {
            axios
                .post(`${baseUrl}/getcustomerByName`, {
                    token: `${token}`,
                    customerName: `${selectedCustomerName}`
                })
                .then((response) => {
                    setgetcustomerBynameList({})
                    setgetcustomerBynameList(response
                        ?.data
                        ?.Details);
                    setshowCustomerDetailsTable(true)
                    setcustomerClicked(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [selectedCustomerName])

    useEffect(() => {
        if (token && !(token === "")) {
            axios
                .post(`${baseUrl}/customerNameList`, { token: `${token}` })
                .then((response) => {
                    setcustomerNameList(response.data)
                    setcustomerClicked(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [token])

    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("tokens"))
        }
    }, [])

    const tableclicked = (id) => {
        setcustomerClicked(true);
        let currentCustomerObject = getcustomerBynameList.filter((e) => {
            return e.customerID === id
        })
        setcurrentCustomerDetailsID(currentCustomerObject)
    }
    const closemodal = () => {

        setcustomerClicked(false);

    }
    const closeAllbuttons = () => {
        setcustomerUpdate(false);
        setspecialRequests(false);
    }

    const changeSelectedName = (selectedname) => {
        setselectedCustomerName(selectedname);
        closeAllbuttons();
    }
    return (
        <div className="CustomerDetail-Wrapper">
            <Navbar />
            <div className="customerList">
                <label className={"enter"}>Enter : </label>
                <SelectSearch
                    defaultValue={selectedCustomerName}
                    search
                    placeholder={"Customer Credit List"}
                    onChange={(event) => changeSelectedName(event)}
                    options={customerNameList}
                    disabled={false} />
            </div>
            <div className="customerDetailsTable">
                {showCustomerDetailsTable && <div className='table-responsive text-nowrap'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Alternate Phone</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Country</th>
                                <th>Vat no</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getcustomerBynameList.map((info, index) => {
                                return (
                                    <tr
                                        key={index}
                                        tabIndex= "1"
                                        onClick={() => {
                                            tableclicked(info.customerID)
                                        }}
                                        className='cilcikable-tr'>
                                        <th scope="row">{index + 1}</th>
                                        <td>{info.Name}</td>
                                        <td>{info.Phone}</td>
                                        <td>{info.Address}</td>
                                        <td>{info.altPhone || ""}</td>
                                        <td>{info.Email}</td>
                                        <td>{info.type}</td>
                                        <td>{info.country || ""}</td>
                                        <td>{info.vat}</td>
                                        <td>{info.customerNote}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>}

                {currentCustomerDetailsID && customerClicked &&
                    <div className="customer-details-buttons">
                        <button type="button" onClick={customerUpdateClicked} className="btn-updates">Update Information</button>
                        <button type="button" onClick={customerSpecialRequestsClicked} className="btn-special">Special Requests</button>
                    </div>
                }

                {customerUpdate &&
                    <div className='modal-customer-edit'>
                        <CustomerEditmodal closeAllbuttons={closeAllbuttons}
                            reloadCustomerData={getCustomerDetails}
                            reloadTable={tableclicked}
                            customerData={currentCustomerDetailsID}
                            closemodal={closemodal} />

                    </div>
                }
                {specialRequests &&
                    <div className="specialRequestContainerMain">
                        <SpecialRequests customerID={currentCustomerDetailsID[0].customerID} />
                    </div>}
            </div>
        </div>
    )
}

export default CustomerDetails