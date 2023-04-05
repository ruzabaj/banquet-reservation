import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentTableHeader from "../Table/PaymentTableHeader";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditModal = ({ id,
    date,
    setDetailList,
    setRateDetailList,
    setRateDetailAmt,
    setRateDetailPax,
    setPaymentList,
    customerID,
    reservtionID,
    reservationDate,
    handleCloseEdit,
    show,
    rateID,
    pax,
    rateName,
    HallName,
    rateAmt }) => {
    let navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        let tokenCheck = localStorage.getItem("tokens");
        if (!tokenCheck) {
            navigate('/')
        } else {
            setToken(localStorage.getItem("tokens"))
        }
    }, [])
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const headerEdit = ["Hall Name", "Rate Name", "Rate Amount", "No. Of Pax"];

    const [editValues, setEditValues] = useState({
        RateName: rateName,
        RateAmount: rateAmt,
        NoOfPax: pax,
        hall: HallName
    })
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setEditValues({ ...editValues, [id]: value })
    };

    let selectedPaymentDate = new Date(reservationDate).toISOString().substring(0, 10);
    let standardDate = new Date(date).toISOString().substring(0, 10)

    const handleEdit = () => {
        axios.post(`${baseUrl}/rateEdit`,
            {
                idtblbanquetRate_details: `${rateID}`,
                RateName: editValues.RateName,
                RateAmount: editValues.RateAmount,
                NoOfPax: editValues.NoOfPax,
                hall: editValues.hall,
                token: `${token}`
            })
            .then((res) => {
                handleCloseEdit()
            })
            .catch((error) => {
                // console.log(error)
            })

        setTimeout(() => {
            axios.post(`${baseUrl}/getStarted`, {
                token: `${token}`
            })
                .then((response) => {
                    setDetailList(response.data)
                })
                .catch((error) => {
                    console.log(error.response.data, "error")
                    setDetailList([])
                })

            axios.post(`${baseUrl}/rateDetails`,
                {
                    banquetReservationID: `${reservtionID}`,
                    token: `${token}`
                })
                .then((response) => {
                    setRateDetailList(response.data)
                    setRateDetailAmt(response.data[0].RateAmount)
                    setRateDetailPax(response.data[0].NoOfPax)
                })
                .catch((error) => {
                    // console.log(error)
                })

            axios.post(`${baseUrl}/paymentHistory`,
                {
                    banquetReservationID: `${reservtionID}`,
                    token: `${token}`
                })
                .then((res) => {
                    setPaymentList(res.data)
                })
                .catch((error) => {
                    // console.log(error)
                })
        }, 1000);
    }
    return (
        <Modal show={show} onHide={handleCloseEdit} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className='edit-table'>
                    <PaymentTableHeader header={headerEdit} />
                    <tbody>
                        <tr>
                            <td><input type={"text"} value={editValues.hall} id="hall" placeholder={""} className="edit-input" onChange={handleInputChange} /></td>
                            <td><input type={"text"} value={editValues.RateName} id="RateName" placeholder={""} className="edit-input" onChange={handleInputChange} /></td>
                            <td><input type={"text"} value={editValues.RateAmount} id="RateAmount" placeholder={""} className="edit-input" onChange={handleInputChange} /></td>
                            <td><input type={"text"} value={editValues.NoOfPax} id="NoOfPax" placeholder={pax} className="edit-input" onChange={handleInputChange} /></td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseEdit}>
                    Close
                </Button>
                <Button onClick={handleEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal