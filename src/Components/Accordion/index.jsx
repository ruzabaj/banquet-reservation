import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import AccordionTable from '../Table';
import "../../Assets/Styles/Accordion/accordion.scss";
import PaymentTable from '../Table/PaymentTable';
import PaymentHistory from './../../Pages/Started/PaymentHistory';
import axios from 'axios';
// import { BsPen } from "react-icons/bs";
// import EditModal from '../Modals/EditModal';

const AccordionDetail = ({ detailList }) => {
    const headerRateDetail = ["Hall", "Rate Name", "Amount", "PAX", "Total"]
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const [rateDetailList, setRateDetailList] = useState([]);
    const [rateDetailAmt, setRateDetailAmt] = useState("");
    const [rateDetailPax, setRateDetailPax] = useState("");
    // const [Total, setCalculateTotal] = useState("");

    const handlePaymentHistory = (id, date) => {
        let standardDate = new Date(date).toISOString().substring(0, 10)
        axios.post(`${baseUrl}/rateDetails`,
            {
                customerID: `${id}`,
                reservationDate: `${standardDate}`,
                token: `test`
            })
            .then((response) => {
                console.log(response.data)
                setRateDetailList(response.data)
                setRateDetailAmt(response.data[0].RateAmount)
                setRateDetailPax(response.data[0].NoOfPax)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // console.log(rateDetailAmt, rateDetailPax, "showing rate Detail Amt here")
    const [paymentList, setPaymentList] = useState([]);

    return (
        <Accordion defaultActiveKey="0" flush className='style-accordion'>
            <div className='accordion-table-header'>
                <table>
                    <thead>
                        <tr>
                            <th >Name</th>
                            <th>No. of PAX</th>
                            <th>Outlet Selected</th>
                            <th>Reservation Date</th>
                            <th>Reservation For Date</th>
                            <th>Hall Names</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {detailList.map((accord, index) => (
                <Accordion.Item eventKey={index} key={index} onClick={() => handlePaymentHistory(accord.customerID, accord.reservationDate)}>
                    <Accordion.Header>
                        <AccordionTable headers={accord} />
                    </Accordion.Header>
                    <Accordion.Body className='accordion-body'>
                        <div className='payment-table'>
                            <label>Rate Details</label>
                            <PaymentTable header={headerRateDetail}
                                rateList={rateDetailList}
                                id={accord.customerID}
                                date={accord.reservationDate}
                                setRateDetailList={setRateDetailList}
                                setRateDetailAmt={setRateDetailAmt}
                                setRateDetailPax={setRateDetailPax}
                                setPaymentList={setPaymentList}
                                customerID={accord.customerID}
                                reservationDate={accord.reservationDate} />
                        </div>
                        <div className='payment-history'>
                            <label>Payment History</label>
                            <PaymentHistory paymentList={paymentList}
                                setPaymentList={setPaymentList}
                                customerID={accord.customerID}
                                reservationDate={accord.reservationDate}
                                rateDetailPax={rateDetailPax}
                                rateDetailAmt={rateDetailAmt} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default AccordionDetail

