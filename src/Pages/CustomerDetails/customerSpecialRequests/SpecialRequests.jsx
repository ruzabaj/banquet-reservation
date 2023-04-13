import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StandardDate from '../../../Components/StandardDate/index';

function SpecialRequests({ customerID }) {
    const [token, setToken] = useState("");
    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/');
        } else {
            setToken(localStorage.getItem("tokens"));
        }
    }, []);

    const [customerSpecialRequestsList, setcustomerSpecialRequestsList] = useState([]);
    const [showSpecialRequestTable, setshowSpecialRequestTable] = useState(false);

    useEffect(() => {
        if (token && !(token === "")) {
            axios
                .post(`${baseUrl}/customerSpecialRequests`, {
                    customerID: `${customerID}`,
                    token: `${token}`
                })
                .then((response) => {
                    setcustomerSpecialRequestsList(response.data);
                    // console.log(response.data);
                    setshowSpecialRequestTable(true);
                })
                .catch((error) => {
                    // console.log(error)
                })
        };
    }, [token]);

    return (
        <div className='specialReuqestcontainer'>
            <hr class="mt-2 mb-3" />
            {showSpecialRequestTable && <div className='table-responsive text-nowrap'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>SpecialRequest</th>
                            <th>reservationDate</th>
                            <th>reservationForDate</th>
                            <th>reservationState</th>
                            <th>reservationTime</th>
                            <th>TimeSlot</th>
                            <th>NoOfPax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerSpecialRequestsList.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{info.SpecialRequest || ""}</td>
                                    <td>{info?.reservationDate
                                        ? 
                                        <StandardDate date={info.reservationDate} />
                                        : ""}</td>
                                    <td>{info?.reservationForDate
                                        ? <StandardDate date={info.reservationForDate} />
                                        : ""}</td>
                                    <td>{info.reservationState || ""}</td>
                                    <td>{info.reservationTime || ""}</td>
                                    <td>{info.TimeSlot || ""}</td>
                                    <td>{info.NoOfPax || ""}</td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}

export default SpecialRequests