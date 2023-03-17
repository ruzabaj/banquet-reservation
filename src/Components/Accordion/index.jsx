import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import AccordionTable from '../Table';
import "../../Assets/Styles/Accordion/accordion.scss";
import PaymentTable from '../Table/PaymentTable';
import PaymentHistory from './../../Pages/Started/PaymentHistory';
import axios from 'axios';

const AccordionDetail = ({ detailList }) => {
    let baseUrl = process.env.REACT_APP_BASE_URL;
    const headerRateDetail = ["Hall", "Rate Name", "Amount", "PAX", "Total"]

    const [rateDetailList, setRateDetailList] = useState([]);
    const [rateDetailAmt, setRateDetailAmt] = useState("");
    const [rateDetailPax, setRateDetailPax] = useState("");
    const [paymentList, setPaymentList] = useState([]);

    const handlePaymentHistory = (reservatorID) => {
        axios.post(`${baseUrl}/rateDetails`,
            {
                banquetReservationID: `${reservatorID}`,
                token: `test`
            })
            .then((response) => {
                console.log(response.data, "rate")
                setRateDetailList(response.data)
                setRateDetailAmt(response.data[0].RateAmount)
                setRateDetailPax(response.data[0].NoOfPax)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.post(`${baseUrl}/paymentHistory`,
            {
                banquetReservationID: `${reservatorID}`,
                token: "test"
            })
            .then((res) => {
                console.log(res.data, "payment")
                setPaymentList(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Accordion defaultActiveKey="0" flush className='style-accordion'>
            <div className='accordion-table-header'>
                <table>
                    <thead>
                        <tr>
                            <th className='extend-width-200'>ID</th>
                            <th className='extend-width-200'>Name</th>
                            <th className='extend-width-pax'>No. of PAX</th>
                            <th className='extend-width-150'>Outlet Selected</th>
                            <th className='extend-width-200'>Reservation Date</th>
                            <th className='extend-width-200'>Reservation For Date</th>
                            <th className='extend-width-150'>Hall Names</th>
                            <th>State</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {detailList.map((accord, index) => (
                <Accordion.Item eventKey={index} key={index} onClick={() => handlePaymentHistory(accord.idtblbanquetReservation)}>
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
                            <PaymentHistory
                                paymentList={paymentList}
                                setPaymentList={setPaymentList}
                                customerID={accord.customerID}
                                reservationDate={accord.reservationDate}
                                reservationForDate={accord.reservationForDate}
                                rateDetailPax={rateDetailPax}
                                rateDetailAmt={rateDetailAmt}
                                 />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default AccordionDetail

