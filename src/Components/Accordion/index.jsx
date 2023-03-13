import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import AccordionTable from '../Table';
import "../../Assets/Styles/Accordion/accordion.scss";
import PaymentTable from '../Table/PaymentTable';
import PaymentHistory from './../../Pages/Started/PaymentHistory';
import axios from 'axios';

const AccordionDetail = ({ detailList }) => {
    const headerRateDetail = ["Hall", "PAX", "Amount", "Total", ""]
let baseUrl= process.env.REACT_APP_BASE_URL;

    const handlePaymentHistory = (id, date) => {
        let standardDate=new Date(date).toISOString().substring(0,10)
        axios.post(`${baseUrl}/paymentHistory`,
            {
                "customerID": `${id}`,
                "reservationDate": `${standardDate}`,
                "token": "test"
            })
    }
    return (
        <Accordion defaultActiveKey="0" flush className='style-accordion'>
            <div className='accordion-table-header'>
                <table>
                    <thead>
                        <tr>
                            <th className='extend-width'>Name</th>
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
                <Accordion.Item eventKey={index} key={index} onClick={()=>handlePaymentHistory(accord.customerID, accord.reservationDate)}>
                    <Accordion.Header>
                        <AccordionTable headers={accord} />
                    </Accordion.Header>
                    <Accordion.Body className='accordion-body'>
                        <div className='payment-table'>
                            <label>Rate Details</label>
                            <PaymentTable header={headerRateDetail} />
                        </div>
                        <div className='payment-history'>
                            <PaymentHistory />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            ))}

        </Accordion>
    )
}

export default AccordionDetail

