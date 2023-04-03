import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentTableHeader from "../Table/PaymentTableHeader";
import axios from 'axios';

const EditModal = ({id, date,setRateDetailList, setRateDetailAmt, setRateDetailPax, setPaymentList,  customerID, reservationDate, handleCloseEdit, show, rateID, pax, rateName, rateAmt }) => {
    
const baseUrl= process.env.REACT_APP_BASE_URL;
const headerEdit=["Rate Name", "Rate Amount", "No. Of Pax"];

const [editValues, setEditValues]=useState({
    RateName: rateName,
    RateAmount: rateAmt,
    NoOfPax: pax
})
const handleInputChange = (event) => {
    const {id, value}=event.target;
    setEditValues({...editValues, [id]:value})
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
                token: "test"
            })
            .then((res) => {
                handleCloseEdit()
            })
            .catch((error) => {
                // console.log(error)
            })

            axios.post(`${baseUrl}/rateDetails`,
            {
                customerID: `${id}`,
                reservationDate: `${standardDate}`,
                token: `test`
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
                customerID: `${customerID}`,
                reservationDate: `${selectedPaymentDate}`,
                token: "test"
            })
            .then((res) => {
                setPaymentList(res.data)
            })
            .catch((error) => {
                // console.log(error)
            })
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
                            <td><input type={"text"} value={editValues.RateName} id="RateName" placeholder={""} className="edit-input"  onChange={handleInputChange}/></td>
                            <td><input type={"text"} value={editValues.RateAmount} id="RateAmount" placeholder={""} className="edit-input" onChange={handleInputChange}/></td>
                            <td><input type={"text"} value={editValues.NoOfPax} id="NoOfPax" placeholder={pax} className="edit-input" onChange={handleInputChange}/></td>
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